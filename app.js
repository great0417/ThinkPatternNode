// app.js

// 모듈 추출

var socketio = require('socket.io');
var express = require('express');
var http = require('http');
var ejs = require('ejs');
var fs = require('fs');
var path = require('path');
var url = require('url');
var querystring = require('querystring');
var nodemailer = require('nodemailer');

// 웹 서버 생성
var app = express();
app.use(app.router);
app.use(express.static('public'));

 

// 웹 서버 실행
var server = http.createServer(app);
server.listen(8210, function() {
    console.log('Server Running at http://127.0.0.1:8210');
});

 
// 소켓 서버 생성
var io = socketio.listen(server);
io.set('log level', 2);


//.js파일을 app.js에 include시키기 위한 함수 
function include(file_) {
	with (global) {
		eval(fs.readFileSync(file_) + ''); // fs 객체를 이용해서 동기방식 파일 include 
	};
};






//post영역
var getid;
var getcanvas;
//var participant = new Array();
var url;
var getTempid;
var clients = {};
// 라우트 수행
//server.on('request'...)과 같은 의미일듯. 처음에 웹 서버시 fs.readfile과 같이 
// 아무것도 없는 '/' 일때 이 이벤트 발생시키게 설정한듯?

app.get('/', function (req, res) {
	fs.readFile('usingPost.html', function (err, data) {
		getid=req.param('id');
        res.send(data.toString());
    });
});


//post방식으로 룸이름과 아이디 정보를 받기 위해 /temp쪽으로 이동시킨다.
app.get('/temp', function(req, res) {
	fs.readFile('tempcanvas.html', function (err, data) {
		getcanvas=req.param('room');
		getid=req.param('id');
		
        res.send(data.toString());
    });
	
})

app.get('/lobby', function(req, res) {
	url = req.url;
	fs.readFile('Lobby.html', function (err, data) {
		
		console.log('getid받아오는것은');
		console.log(getid);
        res.send(ejs.render(data.toString(), {getid: getid}));
    });
	
});


function roomcanvas(){
	var roomname=''; //방이름
	var canvaslist=[]; //canvas 정보들의 리스트
	var cl_size=0; //전체 class 리스트
	var participant=[];
	var p_size=0;
}
var cl=[];

var rc=[]; //roomcanvas들의 배열 (방마다 canvaslist를 구분하기 위해
rc_size=0; //rc배열의 사이즈.


//requestMapping? web.xml? 같은 느낌. Lobby.html에서 받아주는 값을 지정해 주었다. 
app.get('/canvas', function (req, res) {      //http://localhost:8210/canvas/21  21번 방에 사용자 접속
	
	
	url = req.url;
	var istrue=false;
	roomname=getcanvas;
	console.log('roomname:'+roomname);
	for(var i=0;i<rc.length;i++){
		if(rc[i].roomname==roomname){
			if(rc[i].p_size == 0)
			{
				rc[i].participant[rc[i].p_size]=getid;
				rc[i].p_size++;
			}
			for(var j = 0; j < rc[i].p_size; j++)
			{
				if(rc[i].participant[j] == getid)
				{
					break;
					
				}
				else
				{
					rc[i].participant[rc[i].p_size]=getid;
					rc[i].p_size++;
					break;
				}
			}
			
			console.log('p_size = ' + rc[i].p_size);
			cl=rc[i].canvaslist;
			istrue=true;
			console.log('p_size = ' + rc[i].p_size + 'participant[' + rc[i].p_size + '] = ' + rc[i].participant[rc[i].p_size]);
		}
		
	}
	if(!istrue){
			cl=[];
			rc[rc_size]=new roomcanvas();
			rc[rc_size].roomname=roomname;
			rc[rc_size].canvaslist=[];
			rc[rc_size].cl_size=0;
			rc[rc_size].participant=[];
			rc[rc_size].p_size=0;
			console.log('is ture가 true임');
			console.log('p_size = ' + rc[rc_size].p_size);
			console.log('getid = ' + getid);
			//rc[rc_size].participant[] = getid;
			//rc[rc_size].participant[rc[rc_size].p_size] = '';
			rc[rc_size].participant[rc[rc_size].p_size]=getid;
			
			
			console.log('받아온 값은 ' + rc[rc_size].participant[rc[rc_size].p_size]);
			console.log('p_size = ' + rc[rc_size].p_size + 'participant[' + rc[rc_size].p_size + '] = ' + rc[rc_size].participant[rc[rc_size].p_size]);
			rc[rc_size].p_size++;
			
			console.log('p_size = ' + rc[rc_size].p_size);
			
		
			
	console.log('322222222!!!!!!!!!!!!!!!!!!!!!!????!!'+rc[rc_size].roomname);

		rc_size++;
	}

	
	
	
	
	
	
	
	fs.readFile('canvas.html', 'utf8', function (err, data) {
		
    	 res.send(ejs.render(data, {room: getcanvas, userid: getid,canvaslist:cl }));
    });
});

 

//roomArray 변수를 JSON 파일로 제공하기 위한 페이지.
app.get('/room', function (req, res) {
	/* 현재 저장되어 있는 모든 룸의 목록을 리턴한다.  */

    res.send(io.sockets.manager.rooms);
});

 

// 소켓 서버의 이벤트를 연결


//'connection' -> 클라이언트가 연결 될 때 함수 실행
io.sockets.on('connection', function(socket) {
	
	if(clients[socket.id] == null)
	{
		clients[socket.id] = getid;
		console.log('받아옴!!');
	}
	
	
	//'join' 이벤트 발생 join은 사용자가 이름을 정의한 사용자 정의 이벤트 socket.on -> 소켓 이벤트를 연결
	//내가 사용하는 html문에  (우리의 경우에는 Canvas.html) join과 관련된 무언가가 있을 거임. 
	socket.on('join', function(data) {
        //클라이언트가 전송한 데이터를 socket.join시킴 -> 클라이언트를 방에 집어넣음.
		socket.join(data);
		//클라이언트에서 'room'으로 보낸 데이터를 서버에 저장. 이 경우에는 클라이언트에게 자신의 방 번호를 부여.
        socket.set('room', data);
    });
	
	
	
	
	
	
	
	
	
	
	
	
	//채팅과 관련된 메소드
	socket.on('chatMessage', function(data) {
		socket.get('room', function(err, room) {
			io.sockets.in(room).emit('chatMessage', data);						
		});
		
	});
	
	//메일요청시
	socket.on('sendEmail', function(data) {
		console.log('sendmail로 옴~~~~~~');
		console.log(data.mail.toString());	
			
			//메일 보내는 영역
			var smtpTransport = nodemailer.createTransport("SMTP", {
				service:'Gmail',
				auth: {
					user: 'great0417',
					pass: 'Rhdtodwk1!'
				}
			});
			
			var mailOptions = {
					from: 'great0417@gmail.com',
					to:data.mail.toString(),
					subject:'디자인패턴 초대 링크입니다.',
					html: '<a href="http://localhost:8080/invite?room=' + data.room + '">페이지 이동</a>',
			}
			
			smtpTransport.sendMail(mailOptions, function(error, response) {
				if(error)
				{
					console.log(error);
				}
				else
				{
					console.log("Messege send: " + response.message);
				}
				smtpTransport.close();
				//res.send('ok');
			});
	});
	
	
	//참여리스트와 관련된 메소드
	socket.on('participant', function() {
		socket.get('room', function(err, room) {
			//participant.push(getid);
			for(var i=0;i<rc.length;i++){
				if(rc[i].roomname==roomname){					
					//이 부분 하고 있는 중.....
					io.sockets.in(room).emit('participant', rc[i].participant);
					console.log(rc[i].participant.toString());
				}
			}
		});
	});
	

	

	//방에 생성된 클래스리스트 보내주기
	socket.on('sendClasslist',function(){
		socket.get('room', function(err, room){
		var clist=[]; //각 파일에 입력할 정보를 받기위한 변수
		

		//rc리스트에 현재 방이름이 존재하면 canvaslist들의 str_c를 clist에 넣는다
		for(var i=0;i<rc.length;i++){
			if(rc[i].roomname==room){	
				var s=rc[i].cl_size-1;
				clist=rc[i].canvaslist[s].str_c;
				console.log('ddddddddddddddd  '+clist[0]);
				io.sockets.in(room).emit('clist', clist);
		
			}	
		}

		});
	});

	var fcrea=false;
	function filedata(gb, fc){
		fcrea=false;
		var data='';//파일에 입력할 데이터
		var file='';//생성될파일경로파일이름

		var mvc='';
		if(gb==1) mvc='controller';
		else if(gb==2) mvc='service';
		else if(gb==3) mvc='dao';
		else if(gb==0) mvc='basic'

		data='package '+mvc+';\npublic class '+fc.classname+'{\n';
		//변수리스트 돌면서 넣기
		for(var j=0; j<fc.valuename.length;j++){
			data+='\t'+fc.valuename[j]+';\n';
		}
		data+='\n\n';
		//메소드리스트 돌면서 넣기
		for(var j=0; j<fc.methodname.length;j++){
			data+='\tpublic '+fc.methodname[j]+'(){\n\n\t}\n\n';
		}

		data+='}';
	 
		file='./mvc/'+mvc+'/'+fc.classname+'.java';
		
		//file에 data쓰기
		var writer = fs.createWriteStream(file);
		writer.write(data);

		writer.end('');
		writer.on('finish', function() {
			console.log('file create..');
		});

		fcrea=true;


	}

	//프로젝트 파일생성 
	socket.on('createpj',function(){
		socket.get('room', function(err, froom) {

		var flist=[]; //각 파일에 입력할 정보를 받기위한 변수
		

		//rc리스트에 현재 방이름이 존재하면 canvaslist를 flist에 넣는다
		for(var i=0;i<rc.length;i++){
			if(rc[i].roomname==froom){
			
				flist=rc[i].canvaslist;
		
			}	
		}
		
		
	var dir='';

	//디렉토리생성

	dir='./mvc';

	if(!fs.existsSync(dir)){
	    fs.mkdirSync(dir);
	}


	dir='./mvc/controller';

	if(!fs.existsSync(dir)){
	    fs.mkdirSync(dir);
	}

	dir='./mvc/service';

	if(!fs.existsSync(dir)){
	    fs.mkdirSync(dir);
	}

	dir='./mvc/dao';

	if(!fs.existsSync(dir)){
	    fs.mkdirSync(dir);
	}


	dir='./mvc/basic';

	if(!fs.existsSync(dir)){
	    fs.mkdirSync(dir);
	}




	//javalist돌면서 코드화
	for(var i=0; i<flist.length;i++){
	fcrea=false;
	if(flist[i].gb==1) filedata(1, flist[i].class);
	else if(flist[i].gb==2) filedata(2, flist[i].class);
	else if(flist[i].gb==3) filedata(3, flist[i].class);
	else if(flist[i].gb==0) filedata(0, flist[i].class);




	}



	while(true){

		if(fcrea){
				//zip파일로 압축

	var zipFolder = require('zip-folder');
	 
	zipFolder('./mvc', './mvc.zip', function(err) {
	    if(err) {
	        console.log('oh no!', err);
	    } else {
	        console.log('EXCELLENT');
	    }
	});

	break;
		}

	}




		});
	});







	
	
	
	
	
    socket.on('draw', function(data) {
    	
    	
    	//rc리스트를 돌면서 roomname에 현재접속한 룸이 있으면 canvaslist 다음 인덱스에 //canvas에 그려진 정보들을 받아서 저장한다.	
        socket.get('room', function(err, room) {
        	for(var i=0;i<rc.length;i++){
        		if(rc[i].roomname==room){
        			var cl_size=rc[i].cl_size;
        			rc[i].canvaslist[cl_size]=data;
        			rc[i].cl_size=rc[i].cl_size+1;        			
        		}
        	}
            io.sockets.in(room).emit('line', data);               
        });
    });
    


    socket.on('create_room', function(data) {
    	
        io.sockets.emit('create_room', data.room.toString());
        console.log(data.room);
      //  console.log('여기서 꺼짐');

        
    });
    

   if(url == '/canvas')
   {
	   //canvas에 오고 나서 disconnect될 시에
	   socket.on('disconnect', function() {
		   //var intonum = req.param('index');
		   for(var i=0;i<rc.length;i++){
				if(rc[i].roomname==roomname){
					
					//socket.id에 해당하는 고유 정보를 받아 와서 나가진 사람의 정보를 띄움
					for(var j = 0; j < rc[i].p_size; j++)
					{
						if(rc[i].participant[j] == clients[socket.id])
						{
							console.log(j);
							console.log('나가졌음');
							console.log(rc[i].participant[j]);
							console.log(clients[socket.id]);
							
							rc[i].participant.splice(j,1);
							clients[socket.id] = null;
							if(rc[i].p_size != 0)
							{
								rc[i].p_size--;
							}
							
							break;
							
						}
					}
					
					socket.get('room', function(err, room) {
						io.sockets.in(room).emit('exitclient', rc[i].participant);						
					});	
					
					
					console.log('p_size = ' + rc[i].p_size);
					cl=rc[i].canvaslist;
					console.log('p_size = ' + rc[i].p_size + 'participant[' + rc[i].p_size + '] = ' + rc[i].participant[rc[i].p_size]);
				}
					
		   }    
	    });
   }
});



	

