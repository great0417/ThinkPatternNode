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


var roominfo;
app.get('/download/', function(req, res) 
{
		var filepath = roominfo + '.zip';
		
		console.log(filepath);
		res.download(filepath);
		
});

//test5 : sql 다운로드 구현
app.get('/downloadsql', function (req, res) {
	   var filepath = './table/'+ roominfo + '.sql';
	   console.log(filepath);
	   res.download(filepath)
});

//test6 : 라이브러리 다운로드 구현
app.get('/downloadlibrary', function (req, res){
		var filepath = './pj/ojdbc6.jar';
		console.log(filepath);
		res.download(filepath);
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
	var tablelist=[];// @수정 tablelist ,tb관련변수 다 추가..
	var cl_size=0; //전체 class 리스트
	var participant=[];
	var p_size=0;
	var db=new db_element(); //추가추가.. db정보
}


//추가추가..db구조체
function db_element(){
	var dbid='';
	var dbpw='';
	var dbport='';
	var dbsid='';
}


var cl=[];
var tb=[];

var creator=false; //현재 접속한 방의 방생성자인지 아닌지  
var db=db=new db_element(); //현재 접속한 방의 디비정보 **추가추가

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
			tb=rc[i].tablelist;
			creator=false;
			db=rc[i].db;
			istrue=true;
			
			console.log('p_size = ' + rc[i].p_size + 'participant[' + rc[i].p_size + '] = ' + rc[i].participant[rc[i].p_size]);
		}
		
	}
	if(!istrue){
			cl=[];
			tb=[];
			rc[rc_size]=new roomcanvas();
			rc[rc_size].roomname=roomname;
			rc[rc_size].canvaslist=[];
			rc[rc_size].tablelist=[];
			rc[rc_size].cl_size=0;
			
			rc[rc_size].db=new db_element();
			rc[rc_size].db.dbid='';
			rc[rc_size].db.dbpw='';
			rc[rc_size].db.dbport='';
			rc[rc_size].db.dbsid='';
			db=rc[rc_size].db;
			
			creator=true;
			
			
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
		
    	 res.send(ejs.render(data, {room: getcanvas, userid: getid,canvaslist:cl,creator:creator,db:db, tablelist:tb }));
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
	
//	test5 : 희엽's 수정
	socket.on('deletefile', function() {
	      //삭제 영역
	      for(var i=0; i<flist.length;i++){
	         console.log('삭제영역으로 옴');
	         //filedata 함수에 사용 정보들 있는거 그..클래스네임..메소드... 그거그리고 변수 이름 등등 있는거.....
	         if(flist[i].gb==1) delfile(1, flist[i].class);
	         else if(flist[i].gb==2) delfile(2, flist[i].class);
	         else if(flist[i].gb==3) delfile(3, flist[i].class);
	         else if(flist[i].gb==4) delfile(4, flist[i].class);
	         
	         
	         
	         
	      }
	      
	      console.log(tlist.length + 'tlist 렝쓰다!!!!')
	      for(var i =0; i < tlist.length;i++)
	      {
	         delVOfile(tlist[i].tablename + "VO");
	      }
	      
	      delfolder();

	   });
	   
	   
	   
	   
	   
	   function delfolder()
	   {
	      var folder='';//생성될파일경로파일이름
	      
	      
	      var mvc='';
	      for(var i = 1; i < 7; i++)
	      {
	         if(i==1) mvc='controller';
	         else if(i==2) mvc='service';
	         else if(i==3) mvc='dao';
	         else if(i==4) mvc='vo';
	         else if(i==5) mvc='good';
	         else if(i==6) mvc='src'
	         
	         if(i < 5)
	         {
	            console.log('mvc는!!!');
	            console.log(mvc);
	            folder='./mvc/' + roominfo + "/src/"  +mvc;   
	            console.log('삭제할 폴더는');
	            console.log(folder);
	            
	            fs.rmdir(folder, function(err) {
	               if(err) throw err;
	               console.log('successfully deleted folder');
	            });   
	         }
	         else
	         {
	            if(i == 5)
	            {
	               folder='./mvc/' + roominfo + '/src';
	            }
	            else
	            {
	               folder='./mvc/' + roominfo;
	            }
	            console.log('i는 4다!!!')
	            console.log(i);
	            console.log('삭제할 폴더는');
	            
	            console.log(folder);
	            fs.rmdir(folder, function(err) {
	               if(err) throw err;
	               console.log('successfully deleted folder');
	            });   
	         }
	         
	      }
	      
	      
	      
	   }
	   
	   
	   function delVOfile(fc) {
	      var file='';//생성될파일경로파일이름
	   
	         
	      file='./mvc/' + roominfo + "/src/vo"  +'/'+fc +'.java';   
	      console.log('삭제영역 삭제할 파일은');
	      console.log(file);
	      
	      
	      fs.unlink(file, function(err) {
	         if(err) throw err;
	         console.log('successfully deleted file');
	      });      
	      
	   
	   }
	   
	   
	   function delfile(gb, fc) {
	      var file='';//생성될파일경로파일이름
	      
	      
	      var mvc='';
	      if(gb==1) mvc='controller';
	      else if(gb==2) mvc='service';
	      else if(gb==3) mvc='dao';
	      else if(gb==4) mvc='vo'
	         
	         
	      file='./mvc/' + roominfo + "/src/"  +mvc+'/'+fc.classname+'.java';   
	      console.log('삭제영역 삭제할 파일은');
	      console.log(file);
	      
	      
	      fs.unlink(file, function(err) {
	         if(err) throw err;
	         console.log('successfully deleted file');
	      });      
	      
	   
	   }
	
/*	socket.on('deletefile', function() {
		//삭제 영역
		for(var i=0; i<flist.length;i++){
			console.log('삭제영역으로 옴');
			//filedata 함수에 사용 정보들 있는거 그..클래스네임..메소드... 그거그리고 변수 이름 등등 있는거.....
			if(flist[i].gb==1) delfile(1, flist[i].class);
			else if(flist[i].gb==2) delfile(2, flist[i].class);
			else if(flist[i].gb==3) delfile(3, flist[i].class);
			else if(flist[i].gb==0) delfile(0, flist[i].class);
		}
		
		delfolder();

	});*/
	
	/*function delfolder()
	{
		var folder='';//생성될파일경로파일이름
		
		
		var mvc='';
		for(var i = 0; i < 5; i++)
		{
			if(i==1) mvc='controller';
			else if(i==2) mvc='service';
			else if(i==3) mvc='dao';
			else if(i==0) mvc='basic';
			else if(i==4) mvc='good';
			
			if(i!=4)
			{
				console.log('mvc는!!!');
				console.log(mvc);
				folder='./mvc/' + roominfo + "/"  +mvc;	
				console.log('삭제할 폴더는');
				console.log(folder);
				
				fs.rmdir(folder, function(err) {
					if(err) throw err;
					console.log('successfully deleted folder');
				});	
			}
			else
			{
				console.log('i는 4다!!!')
				console.log(i);
				console.log('삭제할 폴더는');
				folder='./mvc/' + roominfo;
				console.log(folder);
				fs.rmdir(folder, function(err) {
					if(err) throw err;
					console.log('successfully deleted folder');
				});	
			}
			
		}
		
		
		
	}
	*/
	
	
/*	function delfile(gb, fc) {
		var file='';//생성될파일경로파일이름
		
		
		var mvc='';
		if(gb==1) mvc='controller';
		else if(gb==2) mvc='service';
		else if(gb==3) mvc='dao';
		else if(gb==0) mvc='basic'
			
			
		file='./mvc/' + roominfo + "/"  +mvc+'/'+fc.classname+'.java';	
		console.log('삭제영역 삭제할 파일은');
		console.log(file);
		
		
		fs.unlink(file, function(err) {
			if(err) throw err;
			console.log('successfully deleted file');
		});		
		
	
	}
	*/
	
	//첫글자 대문자로 바꿔주는 함수
	function initCap(str) {
		  var str = str.substring(0, 1).toUpperCase() + str.substring(1);
		  return str;
    }

	//첫글자 소문자로 바꿔주는 함수
	function initLow(str) {
		  var str = str.substring(0, 1).toLowerCase() + str.substring(1);
		  return str;
    }
	
	//gb = canvas.html에서 받아오는 컨트롤러 서비스 등등 구분
	var room='';//현재방이름 ***추가
	var fcrea=false;
	var isExam=false; //ExamController 존재여부
	var conList=[]; //controller클래스네임 리스트
	var conSize=0;
	var isDB=false; //db정보 존재여부
	var ismvc=false;
	var connTb=null; //dao와 연결된 table
	var splitName=''; //ex)ExamController라면 Exam
	var splitName2='';
	var template='';//선택한 template
	//class file에 데이터 입력하는 작업
	function filedata(gb, fc, conn){
		
		fcrea=false;
		ismvc=false; //mvc 자동생성기로 만들어졌고 테이블연결되있는지 check하는 변수
		var data='';//파일에 입력할 데이터
		var file='';//생성될파일경로파일이름
		splitName=''; 
		splitName2='';
		
		ismvc=isMvc(gb, fc);
		

		var mvc='';
		if(gb==1) mvc='controller';
		else if(gb==2) mvc='service';
		else if(gb==3) mvc='dao';
		else if(gb==0) mvc='basic'


			data='package '+mvc+';\n\n';
		//연결된클래스들 import시키기
		if(conn.length!=0){
			for(var d=0;d<conn.length;d++){
				data+='import ';
				if(conn[d].gb==1) data+='controller.';
				else if(conn[d].gb==2) data+='service.';
				else if(conn[d].gb==3) data+='dao.';
				
				data+=conn[d].class.classname+';\n';
			}
		}

		if(gb==1){ 
			data+='import java.io.IOException;\nimport javax.servlet.RequestDispatcher;\nimport javax.servlet.ServletException;\nimport javax.servlet.http.HttpServlet;\nimport javax.servlet.http.HttpServletRequest;\nimport javax.servlet.http.HttpServletResponse;\n'
			if(fc.classname=='ExamController'){ //***추가
				data+='import vo.ExamVO;\nimport java.util.ArrayList;\n'
			}
		}

		if(ismvc&&connTb!=null&&isDB){
			data+='import vo.'+connTb.tablename+'VO;\nimport java.util.ArrayList;\nimport java.sql.SQLException;\n'
			if(gb==1){
				data+='import commons.DBUtil;\nimport commons.OracleDBConnection;\n';
			}else if(gb==3){
				data+='import commons.DBUtil;\nimport java.sql.ResultSet;\n';
			}
		}
		
		data+='\npublic class '+fc.classname;
		if(gb==1){
			data+=' extends HttpServlet';
		}

		data+='{\n';

		//연결클래스 넣기
		
		//***추가
		function makeReturnVal(val){
			if(val=='String') return 'return "";';
			else if(val=='int') return 'return 1;';
			else return '';
		}
		if(conn.length!=0){
			for(var d=0;d<conn.length;d++){
				data+='\t'+conn[d].class.classname+' '+conn[d].class.classname.substring(0,1).toLowerCase() +conn[d].class.classname.substring(1)+'=new '+conn[d].class.classname+'();\n';
			}
		}

		//변수리스트 돌면서 넣기
		//test5 : if문 추가
		if(fc.valuename.length!=0){
			for(var j=0; j<fc.valuename.length;j++){
				if(fc.directvalue[j]==""&&fc.valuename[j]!=""){
					data+='\t'+fc.selectvalue[j]+" "+fc.valuename[j]+';\n';
				}else if(fc.directvalue[j]!=""&&fc.valuename[j]!=""){
					data+='\t'+fc.directvalue[j]+" "+fc.valuename[j]+';\n';
				}
			}
		}
		data+='\n\n';
		//메소드리스트 돌면서 넣기
		//test5 : if문 추가
		if(fc.methodname.length!=0){
			for(var j=0; j<fc.methodname.length;j++){
				if(fc.directmethod[j]==""&&fc.methodname[j]!=""){
					data+='\tpublic '+fc.selectmethod[j]+" "+fc.methodname[j]+'(){\n\t\t'+makeReturnVal(fc.selectmethod[j])+'\n\t}\n\n';
				}else if(fc.directmethod[j]!=""&&fc.methodname[j]!=""){
					data+='\tpublic '+fc.directmethod[j]+" "+fc.methodname[j]+'(){\n\t\t'+makeReturnVal(fc.directmethod[j])+'\n\t}\n\n';
				}
			}
		}
		//service일때 selectall메소드 추가
		if(gb==2){
			if(ismvc&&connTb!=null&&isDB){
				data+='\n\n';
				data+='\tpublic ArrayList<'+connTb.tablename+'VO> selectAll() throws SQLException {\n\t\t// TODO Auto-generated method stub\n\t\ttry {\n\t\t\tArrayList<'+connTb.tablename+'VO> list = '+splitName2+'DAO.selectAll();\n\t\t\treturn list;\n\t\t} catch (SQLException e){\n\n\t\t\tArrayList<'+connTb.tablename+'VO> error=new ArrayList<'+connTb.tablename+'VO>();\n\t\t\terror=null;\n\t\t\te.printStackTrace();\n\t\t\tSystem.out.println("select fail");\n\t\t\treturn error;\n\t\t}\n\t}\n\n';

			}
		}

		//dao일때 selectall메소드 추가 (나중에 VARCHAR2,NUMBER말고도 타입추가하기)
		if(gb==3){
			if(ismvc&&connTb!=null&&isDB){
				data+='\n\n';
				data+='\tpublic ArrayList<'+connTb.tablename+'VO> selectAll() throws SQLException {\n\t\t// TODO Auto-generated method stub\n\t\tArrayList<'+connTb.tablename+'VO> list = new ArrayList<'+connTb.tablename+'VO>();\n\n\t\tString sql = "SELECT * FROM '+connTb.tablename+'";\n\t\tDBUtil.startSQL(sql);\n\t\tResultSet rs = DBUtil.executeQuery();\n\n\t\twhile (rs.next()) {\n\t\t\t'+connTb.tablename+'VO vo = new '+connTb.tablename+'VO();\n\n';

		var col=''
			for(var d=0;d<connTb.datatype.length;d++){
					
				if(connTb.datatype[d]=='NUMBER'){
					col=connTb.columnname[d].toLowerCase();
					data+='\t\t\tint '+col+'=rs.getInt("'+connTb.columnname[d]+'");\n';
				}else if(connTb.datatype[d]=='VARCHAR2'){
					col=connTb.columnname[d].toLowerCase();
					data+='\t\t\tString '+col+'=rs.getString("'+connTb.columnname[d]+'");\n';
				}
				data+='\t\t\tvo.set'+initCap(col)+'('+col+');\n\n';	
			}
			
			
				data+='\t\t\tlist.add(vo);\n\t\t}\n\n\t\trs.close();\n\t\tDBUtil.endSQL();\n\n\t\treturn list;\n\t}\n\n';
			}
		}

		//컨트롤러면 doGet,doPost메소드 넣기 ***추가
		if(gb==1){
			data+='\tprotected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {\n';
			if(fc.classname=='ExamController'){
				data+='\t\trequest.setCharacterEncoding("UTF-8");\n\n\t\tArrayList<ExamVO> list = new ArrayList<ExamVO>();\n\t\tExamVO exam=new ExamVO();\n\t\texam.setName("유재용");\n\t\texam.setPhone("010-1111-1111");\n\t\texam.setEmail("aaa@naver.com");\n\t\tlist.add(exam);\n\n\t\tExamVO exam1=new ExamVO();\n\t\texam1.setName("송희엽");\n\t\texam1.setPhone("010-2222-2222");\n\t\texam1.setEmail("bbb@naver.com");\n\t\tlist.add(exam1);\n\n\t\tExamVO exam2=new ExamVO();\n\t\texam2.setName("방민섭");\n\t\texam2.setPhone("010-3333-3333");\n\t\texam2.setEmail("ccc@naver.com");\n\t\tlist.add(exam2);\n\n\t\tExamVO exam3=new ExamVO();\n\t\texam3.setName("김소희");\n\t\texam3.setPhone("010-4444-4444");\n\t\texam3.setEmail("ddd@naver.com");\n\t\tlist.add(exam3);\n\n\t\tExamVO exam4=new ExamVO();\n\t\texam4.setName("홍민재");\n\t\texam4.setPhone("010-5555-5555");\n\t\texam4.setEmail("eee@naver.com");\n\t\tlist.add(exam4);\n\n\t\tRequestDispatcher rd = request.getRequestDispatcher("exam.jsp"); \n\t\trequest.setAttribute("USERLIST", list);\n\t\trd.forward(request, response);';
			}else if(ismvc&&connTb!=null&&isDB){
				data+='\t\trequest.setCharacterEncoding("UTF-8");\n\n\t\ttry{\n\n\t\t\tOracleDBConnection odb = new OracleDBConnection();\n\t\t\tDBUtil.setDBMSConnector(odb);\n\n\t\t\tArrayList<'+connTb.tablename+'VO> list = new ArrayList<'+connTb.tablename+'VO>();\n\t\t\tlist='+splitName2+'Service.selectAll();\n\n\t\t\tRequestDispatcher rd = request.getRequestDispatcher("/views/'+connTb.tablename.toLowerCase()+'.jsp");\n\n\t\t\trequest.setAttribute("list", list);\n\t\t\trd.forward(request, response);\n\n\t\t}catch(SQLException e){\n\t\t//TODO Auto-generated catch block\n\t\t\te.printStackTrace();\n\t\t}\n\n'
			}
			data+='\n\t}\n\tprotected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {\n\t\tdoGet(request, response);\n\t}\n\n';

		}

		data+='}';
	 
		file='./mvc/'+room+'/src/'+mvc+'/'+fc.classname+'.java';
		
		//file에 data쓰기
		var writer = fs.createWriteStream(file);
		writer.write(data);

		

		writer.end('');
		writer.on('finish', function() {
			console.log('file create..');
		});

		fcrea=true;


	}
	
	
	//vo class file에 데이터 입력하는 작업
	function vofiledata(fc){
		fcrea=false;
		var data='';//파일에 입력할 데이터
		var file='';//생성될파일경로파일이름

		var mvc='vo';
		
		data='package '+mvc+';\n\n';
		
		data+='public class '+fc.classname;
		
		data+='{\n';


		//변수리스트 돌면서 넣기
		for(var j=0; j<fc.valuename.length;j++){
			data+='\tprivate '+fc.selectvalue[j]+" "+fc.valuename[j]+';\n';
		}
		data+='\n\n';
		//메소드리스트 돌면서 넣기
		for(var j=0; j<fc.valuename.length;j++){
			data+='\tpublic '+fc.selectvalue[j]+" get"+fc.valuename[j].substring(0,1).toUpperCase()+fc.valuename[j].substring(1)+'(){\n\t\treturn '+fc.valuename[j]+';\n\t}\n';
			data+='\tpublic void set'+fc.valuename[j].substring(0,1).toUpperCase()+fc.valuename[j].substring(1)+'('+fc.selectvalue[j]+' '+fc.valuename[j]+'){\n\t\tthis.'+fc.valuename[j]+' = '+fc.valuename[j]+';\n\t}\n';

		}

		
		data+='}';
	 
		file='./mvc/'+room+'/src/'+mvc+'/'+fc.classname+'.java';
		
		//file에 data쓰기
		var writer = fs.createWriteStream(file);
		writer.write(data);

		

		writer.end('');
		writer.on('finish', function() {
			console.log('file create..');
		});

		fcrea=true;


	}


	//table 연결할 vo자동생성!-vo class file에 데이터 입력하는 작업
	function tvofiledata(tb){
		fcrea=false;
		var data='';//파일에 입력할 데이터
		var file='';//생성될파일경로파일이름

		var mvc='vo';
		
		data='package '+mvc+';\n\n';
		
		data+='public class '+tb.tablename+'VO';
		
		data+='{\n';

		var col=''
		//변수리스트 돌면서 넣기(나중에 VARCHAR2,NUMBER말고도 타입추가하기)
		for(var j=0; j<tb.datatype.length;j++){
			if(tb.datatype[j]=='NUMBER'){
				data+='\tprivate int'+" "+tb.columnname[j].toLowerCase()+';\n';
			}else if(tb.datatype[j]=='VARCHAR2'){
				data+='\tprivate String'+" "+tb.columnname[j].toLowerCase()+';\n';
			}
		}
		data+='\n\n';
		//메소드리스트 돌면서 넣기
		for(var j=0; j<tb.datatype.length;j++){
			col=tb.columnname[j].toLowerCase();
			if(tb.datatype[j]=='NUMBER'){
				data+='\tpublic int get'+initCap(col)+'(){\n\t\treturn '+col+';\n\t}\n';
				data+='\tpublic void set'+initCap(col)+'(int '+col+'){\n\t\tthis.'+col+' = '+col+';\n\t}\n';
			}else if(tb.datatype[j]=='VARCHAR2'){
				data+='\tpublic String get'+initCap(col)+'(){\n\t\treturn '+col+';\n\t}\n';
				data+='\tpublic void set'+initCap(col)+'(String '+col+'){\n\t\tthis.'+col+' = '+col+';\n\t}\n';
			}
			

		}

		
		data+='}';
	 
		file='./mvc/'+room+'/src/'+mvc+'/'+tb.tablename+'VO.java';
		
		//file에 data쓰기
		var writer = fs.createWriteStream(file);
		writer.write(data);

		

		writer.end('');
		writer.on('finish', function() {
			console.log('file create..');
		});

		fcrea=true;


	}
		
	//test5 : tlist => tlist3으로	
	//sql파일 생성
	socket.on('createtb', function() {
      socket.get('room', function(err, froom) {
		 

         room = froom;
         var tlist3 =[];
         
         
         for(var i = 0; i < rc.length; i++)
         {
            if(rc[i].roomname==froom){
               roominfo = froom
               tlist3=rc[i].tablelist;
            }   
         }
         
		


         var dir='';

         //디렉토리생성

         dir='./table';

         if(!fs.existsSync(dir)){
             fs.mkdirSync(dir);
         }
         
         
    
         sqldata(tlist3);
         socket.emit('downloadsql');

	



      });
   });
   
   // ☆  .sql 작성하는 것
   function sqldata(tlist) {
     var data='';
      var file = '';
      
      
      
     file='./table/'+roominfo+'.sql';

      if(tlist.length!=0){
         for(var d=0;d<tlist.length;d++){
            data+='CREATE TABLE '+tlist[d].tablename+'(\n';
            for(var i = 0; i < tlist[d].datatype.length; i++ )
            {
               //test5 : if문 수정
            	if(tlist[d].datatype.length == 1)
                {
                   data += tlist[d].columnname[i] +' '+ tlist[d].datatype[i] +  '(1000) PRIMARY KEY \n';
                   
                }
                else
                {
                    if(i == 0)
                      {
                         if(tlist[d].directtype[i] =="")
                         {
                            data += tlist[d].columnname[i] +' '+ tlist[d].datatype[i] +  '(1000) PRIMARY KEY, \n';
                            
                         }
                         else
                         {
                            data += tlist[d].columnname[i] +' '+  tlist[d].directtype[i] +  '(1000) PRIMARY KEY, \n';
                         }
                      }
                      else if(i == tlist[d].datatype.length -1 )
                      {
                         if(tlist[d].directtype[i] =="")
                         {
                            data += tlist[d].columnname[i]+' '+  tlist[d].datatype[i] +  '(1000)\n';
                            
                         }
                         else
                         {
                            data += tlist[d].columnname[i] +' '+  tlist[d].directtype[i] +  '(1000)\n';
                         }
                      }
                      else
                      {
                         if(tlist[d].directtype[i] =="")
                         {
                            data += tlist[d].columnname[i]+' '+  tlist[d].datatype[i] +  '(1000),\n';
                            
                         }
                         else
                         {
                            data += tlist[d].columnname[i] +' '+  tlist[d].directtype[i] +  '(1000),\n';
                         }
                      }
                }
            
            }
            data += ');\n\n';
         }
		 
		 //file에 data쓰기
		  var writer = fs.createWriteStream(file);
		  writer.write(data);

		  

		  writer.end('');
		  writer.on('finish', function() {
			 console.log('file create..');
		  });
      }


      
      
      
      
      
   }

//list안에 해당 클래스 있는지 찾기
var isInList=false;
function inList(cname){
		var flist1=[];
		isInList=false;
		for(var i=0;i<rc.length;i++){
			if(rc[i].roomname==room){
				flist1=rc[i].canvaslist;	
			}	
		}
		for(var j=0;j<flist1.length;j++){
			if(flist1[j].class.classname==cname){
				isInList=true;
			}
		}
		return isInList;
}



function isTb(c){
	var tlist1=[];
	
	var isConnTb=false;
	for(var i = 0; i < rc.length; i++)
         {
            if(rc[i].roomname==room){
               tlist1=rc[i].tablelist;
            }   
         }
	for(var j=0;j<tlist1.length;j++){
			if(tlist1[j].conn_dao==c){
				connTb=tlist1[j];
				isConnTb=true;
			}
		}
	return isConnTb;
         
}

//mvc자동생성기로 만들어졌으며 테이블 dao와 연결되어있는지 check
var mvc=false;
function isMvc(gb, fc){
	mvc=false;
	var c1='';
	var c2='';
	var con=false;
	var ser=false;
	var dao=false;
	var tb=false;
	if(gb==1){
		
		var c1=fc.classname.split('Controller');
		splitName=c1[0];
		splitName2=splitName.substring(0,1).toLowerCase()+splitName.substring(1);
		c2=c1[0]+'Service';
		

		
		if(inList(c2)) {
			ser=true;
			c2=c1[0]+'DAO';
			
			if(inList(c2)){
				dao=true;
				if(isTb(c2)){
					tb=true;
				}
			}
		}
		if(ser&&dao&&tb){
			mvc=true;
		
		}
		
		return mvc;


	}else if(gb==2){
		var c1=fc.classname.split('Service');
		splitName=c1[0];
		splitName2=splitName.substring(0,1).toLowerCase()+splitName.substring(1);
		c2=c1[0]+'Controller';
		
		if(inList(c2)) {
			con=true;
			c2=c1[0]+'DAO';
			
			if(inList(c2)){
				dao=true;
				if(isTb(c2)){
					tb=true;
				}
			}
		}
		if(con&&dao&&tb){
			mvc=true;
			
		}
		return mvc;
	}else if(gb==3){
		if(isTb(fc.classname)){
			tb=true;
		}
		var c1=fc.classname.split('DAO');
		splitName=c1[0];
		splitName2=splitName.substring(0,1).toLowerCase()+splitName.substring(1);
		c2=c1[0]+'Controller';
		
		if(inList(c2)) {
			con=true;
			c2=c1[0]+'Service';
			
			if(inList(c2)){
				ser=true;
			}
		}
		if(ser&&con&&tb){
			mvc=true;
		}
		
		return mvc;
	}
	 
}
	//test5 : 수정
	var flist=[]; //각 파일에 입력할 정보를 받기위한 변수
	var tlist=[];//table리스트
	
	//var flist=[]; //각 파일에 입력할 정보를 받기위한 변수
	//프로젝트 파일생성 
	//프로젝트 파일생성 
	socket.on('createpj',function(data){
		socket.get('room', function(err, froom) {
		room=froom; //***추가
		
		template='';
		isDB=false; //db정보 있는지
		var dbInfor=new db_element();
		
		

		//rc리스트에 현재 방이름이 존재하면 canvaslist를 flist에 넣는다
		for(var i=0;i<rc.length;i++){
			if(rc[i].roomname==froom){
				roominfo = froom
				flist=rc[i].canvaslist;
				tlist=rc[i].tablelist;
				if(rc[i].db.dbid!=''&&rc[i].db.dbpw!=''&&rc[i].db.dbport!=''&&rc[i].db.dbsid!=''){
					isDB=true;
					dbInfor=rc[i].db;
				}

		
			}	
		}

		
		
		template=data.template; //사용자가 선택한 template값 넣기
		
		var dir='';

		//디렉토리생성

		dir='./mvc';

		if(!fs.existsSync(dir)){
			fs.mkdirSync(dir);
		}

		//추가- 프로젝트기본 폴더카피하기위해.(java project로생성할때)
		var copydir = require('copy-dir');

		fcrea=false;
		dir='./mvc/'+froom;

		if(!fs.existsSync(dir)){
		  fs.mkdirSync(dir);
		}
		fcrea=false;
		dir=dir+'/src';

		if(!fs.existsSync(dir)){
		  fs.mkdirSync(dir);
		}

		fcrea=false;
		//copydir.sync('./pj/test/src', './mvc/src');
		fcrea=true;
		
		dir1=dir+'/controller';

		if(!fs.existsSync(dir1)){
		  fs.mkdirSync(dir1);
		}

		dir1=dir+'/service';

		if(!fs.existsSync(dir1)){
		  fs.mkdirSync(dir1);
		}

		dir1=dir+'/dao';

		if(!fs.existsSync(dir1)){
		  fs.mkdirSync(dir1);
		}


		dir1=dir+'/vo';

		if(!fs.existsSync(dir1)){
		  fs.mkdirSync(dir1);
		}

		if(isDB){
			dir1=dir+'/commons';

			if(!fs.existsSync(dir1)){
			fs.mkdirSync(dir1);
			}
		}
		
		dir1='./pj/'+froom;
		if(!fs.existsSync(dir1)){
			fs.mkdirSync(dir1);
		}

		
		var temp2=false;
		copydir('./pj/optestpj', './pj/'+froom, function(err){
		  if(err){
			console.log(err);
		  } else {
			console.log('ok');
			temp2=true;
		  }
		});
		
		while(temp2){
		if(template!=null&&template!=''){
			dir1='./pj/'+froom+'/WebContent/resources';
			if(!fs.existsSync(dir1)){
					fs.mkdirSync(dir1);
			}
			if(template=='1'){
				
				dir1='./pj/'+froom+'/WebContent/resources/template1_css';
				if(!fs.existsSync(dir1)){
						fs.mkdirSync(dir1);
				}
				copydir.sync('./pj/WebContent/resources/template1_css', './pj/'+froom+'/WebContent/resources/template1_css');
				console.log("test2");
			}else if(template=='2'){
				dir1='./pj/'+froom+'/WebContent/resources/template2_css';
				if(!fs.existsSync(dir1)){
						fs.mkdirSync(dir1);
				}
				copydir.sync('./pj/WebContent/resources/template2_css', './pj/'+froom+'/WebContent/resources/template2_css');
			}else if(template=='3'){
				dir1='./pj/'+froom+'/WebContent/resources/template3_css';
				if(!fs.existsSync(dir1)){
						fs.mkdirSync(dir1);
				}
				copydir.sync('./pj/WebContent/resources/template3_css', './pj/'+froom+'/WebContent/resources/template3_css');
			}else if(template=='4'){
				dir1='./pj/'+froom+'/WebContent/resources/template4_css';
				if(!fs.existsSync(dir1)){
						fs.mkdirSync(dir1);
				}
				copydir.sync('./pj/WebContent/resources/template4_css', './pj/'+froom+'/WebContent/resources/template4_css');
			}

		}
		temp2=false;
		break;

	
		}

		
		isExam=false;
		//javalist돌면서 코드화
		for(var i=0; i<flist.length;i++){
		fcrea=false;
			//연결된클래스들 리스트만들기
			var conn_list = []; //연결리스트
			var conn_idx = 0; //연결인덱스

			for(var c=0;c<flist.length;c++){
				if(flist[i].class.classname == flist[c].class.connclassname){
					conn_list[conn_idx] = flist[c];
					conn_idx++;
				}
			}

		
		if(flist[i].gb==1){ 
			filedata(1, flist[i].class, conn_list);
			var cn=flist[i].class.classname;
			if(cn=='ExamController') isExam=true;
			conList[conSize]=cn;
			conSize++;
		}else if(flist[i].gb==2) filedata(2, flist[i].class, conn_list);
		else if(flist[i].gb==3) filedata(3, flist[i].class, conn_list);
		else if(flist[i].gb==4) vofiledata(flist[i].class);




		}

		//테이블마다 vo만들기
		if(tlist.length!=0){
			for(var i=0;i<tlist.length;i++){
				tvofiledata(tlist[i]);
			}
		}

		var dirname='./'+froom+'.zip';

		while(true){

			if(fcrea){
					//zip파일로 압축

		var EasyZip = require('easy-zip').EasyZip;

		var zip1 = new EasyZip();


		zip1.zipFolder('./pj/'+froom+'/.settings',function(){
			  zip1.writeToFile(dirname);

		});

		zip1.zipFolder('./pj/'+froom+'/WebContent',function(){
			  zip1.writeToFile(dirname);

		});




		zip1.zipFolder('./mvc/'+froom+'/src',function(){
				zip1.writeToFile(dirname);
		});

		var jsFolder = zip1.folder('build/classes');
		zip1.writeToFile(dirname);


		//.setting폴더에 org.eclipse.wst.common프로젝트이름 수정후 추가
		var data1='<?xml version="1.0" encoding="UTF-8"?><project-modules id="moduleCoreId" project-version="1.5.0">\n\t<wb-module deploy-name="'+froom+'">\n\t\t<wb-resource deploy-path="/" source-path="/WebContent" tag="defaultRootSource"/>\n\t\t<wb-resource deploy-path="/WEB-INF/classes" source-path="/src"/>\n\t\t<property name="context-root" value="'+froom+'"/>\n\t\t<property name="java-output-path" value="/'+froom+'/build/classes"/>\n\t</wb-module>\n</project-modules>';
		zip1.file('.settings/org.eclipse.wst.common.component',data1);	


		//.classpath 파일추가
		var data1='<?xml version="1.0" encoding="UTF-8"?>\n<classpath>\n\t<classpathentry kind="src" path="src"/>\n\t<classpathentry kind="con" path="org.eclipse.jdt.launching.JRE_CONTAINER/org.eclipse.jdt.internal.debug.ui.launcher.StandardVMType/jre1.8.0_73">\n\t\t<attributes>\n\t\t\t<attribute name="owner.project.facets" value="java"/>\n\t\t</attributes>\n\t</classpathentry>\n\t<classpathentry kind="con" path="org.eclipse.jst.server.core.container/org.eclipse.jst.server.tomcat.runtimeTarget/Apache Tomcat v8.0">\n\t\t<attributes>\n\t\t\t<attribute name="owner.project.facets" value="jst.web"/>\n\t\t</attributes>\n\t</classpathentry>\n\t<classpathentry kind="con" path="org.eclipse.jst.j2ee.internal.web.container"/>\n\t<classpathentry kind="con" path="org.eclipse.jst.j2ee.internal.module.container"/>\n\t<classpathentry kind="output" path="build/classes"/>\n</classpath>\n';
		zip1.file('.classpath',data1);




		//.project 파일 프로젝트이름 수정후 추가
		var data1='<?xml version="1.0" encoding="UTF-8"?>\n<projectDescription>\n\t<name>'+froom+'</name>\n\t<comment></comment>\n\t<projects>\n\t</projects>\n\t<buildSpec>\n\t\t<buildCommand>\n\t\t\t<name>org.eclipse.jdt.core.javabuilder</name>\n\t\t\t<arguments>\n\t\t\t</arguments>\n\t\t</buildCommand>\n\t\t<buildCommand>\n\t\t\t<name>org.eclipse.wst.common.project.facet.core.builder</name>\n\t\t\t<arguments>\n\t\t\t</arguments>\n\t\t</buildCommand>\n\t\t<buildCommand>\n\t\t\t<name>org.eclipse.wst.validation.validationbuilder</name>\n\t\t\t<arguments>\n\t\t\t</arguments>\n\t\t</buildCommand>\n\t</buildSpec>\n\t<natures>\n\t\t<nature>org.eclipse.jem.workbench.JavaEMFNature</nature>\n\t\t<nature>org.eclipse.wst.common.modulecore.ModuleCoreNature</nature>\n\t\t<nature>org.eclipse.wst.common.project.facet.core.nature</nature>\n\t\t<nature>org.eclipse.jdt.core.javanature</nature>\n\t\t<nature>org.eclipse.wst.jsdt.core.jsNature</nature>\n\t</natures>\n</projectDescription>\n';
		zip1.file('.project',data1);
		zip1.writeToFile(dirname);//write zip data to disk

		//isExam이 true이면 exam.jsp추가해주기
		if(isExam){
			zip1.addFile('WebContent/exam.jsp','./pj/exam.jsp',function(){
					zip1.writeToFile(dirname);
			});
			zip1.addFile('src/vo/ExamVO.java','./pj/ExamVO.java',function(){
					zip1.writeToFile(dirname);
			});
			
		}
		
		if(tlist.length!=0){
			for(var j=0;j<tlist.length;j++){
				console.log('test: '+tlist[j].conn_dao);
				if(tlist[j].conn_dao!=""&&tlist[j].conn_dao!="init"&&tlist[j].conn_dao!=null){
					data1="";
					data1='<%@ page language="java" contentType="text/html; charset=UTF-8"\n pageEncoding="UTF-8"%>\n<%@page import="java.util.ArrayList"%>\n<%@page import="vo.'+tlist[j].tablename+'VO"%>\n\n<!DOCTYPE html>\n<html>\n\n<%@ include file="/WEB-INF/views/template'+template+'/test_header.jsp"%>\n\n<% \n\tArrayList<'+tlist[j].tablename+'VO> list = (ArrayList<'+tlist[j].tablename+'VO>) request.getAttribute("list");\n\tint idx=1;\n%>\n\n\t<div class="container">\n\n\t\t<div class="N_name">Test Table</div>\n\t\t<hr />\n\t\t<form method="get">\n\t\t\t<div class="pull-right">\n\t\t\t\t<a class="btn btn-write"> <i class="icon-pencil icon-white">\n\t\t\t\t\t</i>\n\t\t\t\t\twrite\n\t\t\t\t</a>\n\n\t\t\t</div>\n\n\t\t<table class="table table-bordered">\n\t\t\t<colgroup>\n\t\t\t\t<col width="13%">\n\t\t\t\t<col width="40%">\n\t\t\t\t<col width="17%">\n\t\t\t\t<col width="17%">\n\t\t\t\t<col width="13%" />\n\t\t\t</colgroup>\n\t\t\t<thead>\n\n\t\t\t\t<th class="datacol">idx</th>\n';
					for(var t=0;t<tlist[j].columnname.length;t++){
						data1+='\t\t\t\t<th class="datacol">'+tlist[j].columnname[t].toLowerCase()+'</th>\n';
					}

					data1+='\t\t\t</thead>\n\t\t\t<tbody>\n\t\t\t\t<% for('+tlist[j].tablename+'VO vo:list){ %>\n\t\t\t\t\t<tr>\n\t\t\t\t\t\t<td><%=idx++%></td>\n';
					for(var t=0;t<tlist[j].columnname.length;t++){
						data1+='\t\t\t\t\t\t<td>vo.get'+initCap(tlist[j].columnname[t].toLowerCase())+'</td>\n';
					}						
			
					data1+='\t\t\t\t\t</tr>\n\t\t\t\t<%} %>\n\n \t\t\t</tbody>\n\t\t</table>\n</div>\n\n<%@ include file="/WEB-INF/views/template'+template+'/test_footer.jsp"%>\n</html>\n';
					

					zip1.file('WebContent/WEB-INF/views/'+tlist[j].tablename.toLowerCase()+'.jsp',data1);	
					zip1.writeToFile(dirname);
					
				}
			}
		}

		//db정보있으면 db연결클래스추가
		if(isDB){
			zip1.addFile('src/commons/DBUtil.java','./pj/optestpj/src/commons/DBUtil.java',function(){
					zip1.writeToFile(dirname);
			});
			zip1.addFile('src/commons/IDBConnection.java','./pj/optestpj/src/commons/IDBConnection.java',function(){
					zip1.writeToFile(dirname);
			});
			var dbdata='package commons;\n\nimport java.sql.Connection;\nimport java.sql.DriverManager;\nimport java.sql.SQLException;\n\npublic class OracleDBConnection implements IDBConnection{\n\n\tprivate static final String CONNECT = "jdbc:oracle:thin:@localhost:'+dbInfor.dbport+':'+dbInfor.dbsid+'";\n\tprivate static final String USER = "'+dbInfor.dbid+'";\n\tprivate static final String PASSWD = "'+dbInfor.dbpw+'";\n\tprivate Connection conn;\n\n\tpublic Connection getDBConnection() {\n\n\t\ttry {\n\t\t\tClass.forName("oracle.jdbc.driver.OracleDriver");\n\t\t\tconn = DriverManager.getConnection(CONNECT, USER, PASSWD);\n\t\t} catch (SQLException e) {\n\t\t\te.printStackTrace();\n\t\t\tSystem.out.println("DB Connect Error!!!");\n\t\t} catch (ClassNotFoundException e) {\n\t\t\tSystem.out.println("Library Load Fail");\n\t\t}\n\n\t\treturn conn;\n\t}\n\n}\n';
			zip1.file('src/commons/OracleDBConnection.java',dbdata);	
			zip1.writeToFile(dirname);
		}
		
		//선택한 template에 필요한것들 추가
		if(template!=null&&template!=''){
			
			if(template=='1'){
			
				
				
				zip1.addFile('WebContent/WEB-INF/views/template1/test_footer.jsp','./pj/template/WebContent/WEB-INF/views/template1/test_footer.jsp',function(){
					zip1.writeToFile(dirname);
				});
				zip1.addFile('WebContent/WEB-INF/views/template1/test_header.jsp','./pj/template/WebContent/WEB-INF/views/template1/test_header.jsp',function(){
					zip1.writeToFile(dirname);
				});
				console.log("test");
			}else if(template=='2'){
				
				zip1.addFile('WebContent/WEB-INF/views/template2/test_footer.jsp','./pj/template/WebContent/WEB-INF/views/template2/test_footer.jsp',function(){
					zip1.writeToFile(dirname);
				});
				zip1.addFile('WebContent/WEB-INF/views/template2/test_header.jsp','./pj/template/WebContent/WEB-INF/views/template2/test_header.jsp',function(){
					zip1.writeToFile(dirname);
				});
			}else if(template=='3'){
				
				zip1.addFile('WebContent/WEB-INF/views/template3/test_footer.jsp','./pj/template/WebContent/WEB-INF/views/template3/test_footer.jsp',function(){
					zip1.writeToFile(dirname);
				});
				zip1.addFile('WebContent/WEB-INF/views/template3/test_header.jsp','./pj/template/WebContent/WEB-INF/views/template3/test_header.jsp',function(){
					zip1.writeToFile(dirname);
				});
			}else if(template=='4'){
				
				zip1.addFile('WebContent/WEB-INF/views/template4/test_footer.jsp','./pj/template/WebContent/WEB-INF/views/template4/test_footer.jsp',function(){
					zip1.writeToFile(dirname);
				});
				zip1.addFile('WebContent/WEB-INF/views/template4/test_header.jsp','./pj/template/WebContent/WEB-INF/views/template4/test_header.jsp',function(){
					zip1.writeToFile(dirname);
				});
			}
		}	

		


	//controller잘라주고 첫글자 소문자로 바꿔주는 메소드
	function urlmaker(string){
	  	var sp = string.split('Controller');
	      	var sp2=sp[0].substring(0,1).toLowerCase()+sp[0].substring(1,sp[0].length);
	         return  sp2;
	   
	}

	//web.xml에 각 컨트롤러마다 servlet mapping해주기 
	var data1='<?xml version="1.0" encoding="UTF-8"?>\n<web-app xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://xmlns.jcp.org/xml/ns/javaee" xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd" id="WebApp_ID" version="3.1">\n\t<display-name>'+froom+'</display-name>\n\t<welcome-file-list>\n\t\t<welcome-file>index.html</welcome-file>\n\t\t<welcome-file>index.htm</welcome-file>\n\t\t<welcome-file>index.jsp</welcome-file>\n\t\t<welcome-file>default.html</welcome-file>\n\t\t<welcome-file>default.htm</welcome-file>\n\t\t<welcome-file>default.jsp</welcome-file>\n\t</welcome-file-list>\n';
	for(var i=0; i<conSize; i++){
		data1+='\t<servlet>\n\t\t<servlet-name>'+conList[i]+'</servlet-name>\n\t\t<servlet-class>controller.'+conList[i]+'</servlet-class>\n\t</servlet>\n\t<servlet-mapping>\n\t\t<servlet-name>'+conList[i]+'</servlet-name>\n\t\t<url-pattern>/'+urlmaker(conList[i])+'</url-pattern>\n\t</servlet-mapping>\n';
	}
	data1+='</web-app>';
	zip1.file('WebContent/WEB-INF/web.xml',data1);	
	zip1.writeToFile(dirname);

	break;
		}

	}

	


		});
		
		socket.emit('completepj');
		
	});



	//추가추가..db정보 받기
	socket.on('db_infor', function(data) {

	//rc리스트를 돌면서 roomname에 현재접속한 룸이 있으면 canvaslist 다음 인덱스에 //디비 정보들을 받아서 저장한다.	
	socket.get('room', function(err, room) {
		for(var i=0;i<rc.length;i++){
			if(rc[i].roomname==room){
				rc[i].db=data.db;
				
			}
		}


	            io.sockets.in(room).emit('db', data);

		
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
    

    socket.on('draw_table', function(data) {
    	
    	
    	//rc리스트를 돌면서 roomname에 현재접속한 룸이 있으면 tablelist 다음 인덱스에 //table에 그려진 정보들을 받아서 저장한다.	
        socket.get('room', function(err, room) {
        	for(var i=0;i<rc.length;i++){
        		if(rc[i].roomname==room){
        			var tb_size=rc[i].tablelist.length;
        			rc[i].tablelist[tb_size]=data.table;
    			
        		}
        	}
            io.sockets.in(room).emit('tb_line', data);               
        });
    });



    
  //추가.. canvas 수정emit한거 받아서 처리
    socket.on('modifyCanvas', function(data) {

    //사용자가 수정한클래스이름과 같은걸찾아서 canvaslist수정해준다.
    socket.get('room', function(err, room) {
    	for(var i=0;i<rc.length;i++){
    		if(rc[i].roomname==room){
    			var cl_size=rc[i].cl_size;
    			for(var j=0;j<cl_size;j++){
    							if(rc[i].canvaslist[j].class.classname==data.m_class){
    					rc[i].canvaslist[j].class=data.class;
    				}
    			}
    			if(data.gb!=4){
    				for(var a=0;a<data.m_conn_list.length;a++){
    					for(var j=0;j<cl_size;j++){
    									if(rc[i].canvaslist[j].class.classname==data.m_conn_list[a].m_conn_cl){
    							rc[i].canvaslist[j].class.connclassname=data.class.classname;
    						}
    					}
    				}
    			}

    						

    		}
    	}


                io.sockets.in(room).emit('mod_line', data);

    	
            });

        });
    
 
  // table 수정emit한거 받아서 처리
    socket.on('modifyTable', function(data) {

    //사용자가 수정한클래스이름과 같은걸찾아서 canvaslist수정해준다.
    socket.get('room', function(err, room) {
    	for(var i=0;i<rc.length;i++){
    		if(rc[i].roomname==room){
    			var tb_size=rc[i].tablelist.length;
    			for(var j=0;j<tb_size;j++){
    							if(rc[i].tablelist[j].tablename==data.m_class){
    					rc[i].tablelist[j] =data.table;
    				}
    			}
    			

    						

    		}
    	}


                io.sockets.in(room).emit('mod_tb_line', data);

    	
            });

        });
    	


  //canvas 삭제emit한거 받아서 처리
    socket.on('deleteCanvas', function(data) {

    //사용자가 수정한클래스이름과 같은걸찾아서 canvaslist수정해준다.
    socket.get('room', function(err, room) {
    	for(var i=0;i<rc.length;i++){
    		if(rc[i].roomname==room){
    			var cl_size=rc[i].cl_size;
    			
    			if(data.gb!=4){
    				for(var a=0;a<data.d_conn_list.length;a++){
    					for(var j=0;j<cl_size;j++){
    									if(rc[i].canvaslist[j].class.classname==data.d_conn_list[a].d_conn_cl){
    							rc[i].canvaslist[j].class.connclassname="init";
    						}
    					}
    				}
    			}
    			for(var j=0;j<cl_size;j++){
    							if(rc[i].canvaslist[j].class.classname==data.d_class){
    					rc[i].canvaslist.splice(j,1);
    					if(rc[i].cl_size>0){
    						rc[i].cl_size--;
    					}
    					break;
    				}
    			}

    						

    		}
    	}


                io.sockets.in(room).emit('del_line', data);

    	
            });

        });
    
    //table 삭제emit한거 받아서 처리
    socket.on('deleteTable', function(data) {

    //사용자가 수정한클래스이름과 같은걸찾아서 canvaslist수정해준다.
    socket.get('room', function(err, room) {
    	for(var i=0;i<rc.length;i++){
    		if(rc[i].roomname==room){
    			var tb_size=rc[i].tablelist.length;
    			
    			
    			for(var j=0;j<tb_size;j++){
    				if(rc[i].tablelist[j].tablename==data.d_class){
    					rc[i].tablelist.splice(j,1);
    					
    					break;
    				}
    			}

    						

    		}
    	}


                io.sockets.in(room).emit('del_tb_line', data);

    	
            });

        });
      
	
  // canvas move emit한거 받아서 처리
    socket.on('moveCanvas', function(data) {

    //사용자가 수정한클래스이름과 같은걸찾아서 canvaslist수정해준다.
    socket.get('room', function(err, room) {
    	for(var i=0;i<rc.length;i++){
    		if(rc[i].roomname==room){
    			var cl_size=rc[i].cl_size;
    			for(var j=0;j<cl_size;j++){
    							if(rc[i].canvaslist[j].class.classname==data.mv_class.classname){
    					var r=rc[i].canvaslist[j].class;
    					r.start_point_x = data.start_x;
    					r.start_point_y = data.start_y;
    					r.end_point_x =data.end_x;
    					r.end_point_y =data.end_y;
    				}
    			}
    		
    						

    		}
    	}


                io.sockets.in(room).emit('move_line', data);

    	
            });

        });

  // table move emit한거 받아서 처리
    socket.on('moveTable', function(data) {

    //사용자가 수정한클래스이름과 같은걸찾아서 canvaslist수정해준다.
    socket.get('room', function(err, room) {
    	for(var i=0;i<rc.length;i++){
    		if(rc[i].roomname==room){
    			var tb_size=rc[i].tablelist.length;
    			for(var j=0;j<tb_size;j++){
    							if(rc[i].tablelist[j].tablename==data.mv_table.tablename){
    					var r=rc[i].tablelist[j];
    					r.start_point_dbx = data.start_x;
    					r.start_point_dby = data.start_y;
    					r.end_point_dbx =data.end_x;
    					r.end_point_dby =data.end_y;
    				}
    			}
    		
    						

    		}
    	}


                io.sockets.in(room).emit('move_tb_line', data);

    	
            });

        });


    
    
  //canvas 연결바꾼정보 emit한거 받아서 처리
    socket.on('connCanvas', function(data) {

    //사용자가 수정한클래스이름과 같은걸찾아서 canvaslist수정해준다.
    socket.get('room', function(err, room) {
    	for(var i=0;i<rc.length;i++){
    		if(rc[i].roomname==room){
    			var cl_size=rc[i].cl_size;
    			var start='';
			var end='';
    			
    			for(var j=0;j<cl_size;j++){
    							if(rc[i].canvaslist[j].class.classname==data.start_cn){
    					start=rc[i].canvaslist[j].class;
    				}
    			}

    			
    			for(var j=0;j<cl_size;j++){
    							if(rc[i].canvaslist[j].class.classname==data.end_cn){
    					end=rc[i].canvaslist[j].class;
    				}
    			}

    						

    		}
    	}

		 start.connclassname = end.classname;
                io.sockets.in(room).emit('conn_line', data);

    	
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



	

