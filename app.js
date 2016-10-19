// app.js

// ��� ����

var socketio = require('socket.io');
var express = require('express');
var http = require('http');
var ejs = require('ejs');
var fs = require('fs');
var path = require('path');
var url = require('url');
var querystring = require('querystring');
var nodemailer = require('nodemailer');

// �� ���� ����
var app = express();
app.use(app.router);
app.use(express.static('public'));

 

// �� ���� ����
var server = http.createServer(app);
server.listen(8210, function() {
    console.log('Server Running at http://127.0.0.1:8210');
});

 
// ���� ���� ����
var io = socketio.listen(server);
io.set('log level', 2);


//.js������ app.js�� include��Ű�� ���� �Լ� 
function include(file_) {
	with (global) {
		eval(fs.readFileSync(file_) + ''); // fs ��ü�� �̿��ؼ� ������ ���� include 
	};
};



//post����
var getid;
var getcanvas;
//var participant = new Array();
var url;
var getTempid;
var clients = {};
// ���Ʈ ����
//server.on('request'...)�� ���� �ǹ��ϵ�. ó���� �� ������ fs.readfile�� ���� 
// �ƹ��͵� ���� '/' �϶� �� �̺�Ʈ �߻���Ű�� �����ѵ�?

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




//post������� ���̸��� ���̵� ������ �ޱ� ���� /temp������ �̵���Ų��.
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
		
		console.log('getid�޾ƿ��°���');
		console.log(getid);
        res.send(ejs.render(data.toString(), {getid: getid}));
    });
	
});


function roomcanvas(){
	var roomname=''; //���̸�
	var canvaslist=[]; //canvas �������� ����Ʈ
	var tablelist=[];// @���� tablelist ,tb���ú��� �� �߰�..
	var cl_size=0; //��ü class ����Ʈ
	var participant=[];
	var p_size=0;
	var db=new db_element(); //�߰��߰�.. db����
}


//�߰��߰�..db����ü
function db_element(){
	var dbid='';
	var dbpw='';
	var dbport='';
	var dbsid='';
}


var cl=[];
var tb=[];

var creator=false; //���� ������ ���� ����������� �ƴ���  
var db=db=new db_element(); //���� ������ ���� ������� **�߰��߰�

var rc=[]; //roomcanvas���� �迭 (�渶�� canvaslist�� �����ϱ� ����
rc_size=0; //rc�迭�� ������.




//requestMapping? web.xml? ���� ����. Lobby.html���� �޾��ִ� ���� ������ �־���. 
app.get('/canvas', function (req, res) {      //http://localhost:8210/canvas/21  21�� �濡 ����� ����
	
	
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
			console.log('is ture�� true��');
			console.log('p_size = ' + rc[rc_size].p_size);
			console.log('getid = ' + getid);
			//rc[rc_size].participant[] = getid;
			//rc[rc_size].participant[rc[rc_size].p_size] = '';
			rc[rc_size].participant[rc[rc_size].p_size]=getid;
			
			
			console.log('�޾ƿ� ���� ' + rc[rc_size].participant[rc[rc_size].p_size]);
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

 

//roomArray ������ JSON ���Ϸ� �����ϱ� ���� ������.
app.get('/room', function (req, res) {
	/* ���� ����Ǿ� �ִ� ��� ���� ����� �����Ѵ�.  */

    res.send(io.sockets.manager.rooms);
});

 

// ���� ������ �̺�Ʈ�� ����


//'connection' -> Ŭ���̾�Ʈ�� ���� �� �� �Լ� ����
io.sockets.on('connection', function(socket) {
	
	if(clients[socket.id] == null)
	{
		clients[socket.id] = getid;
		console.log('�޾ƿ�!!');
	}
	
	
	//'join' �̺�Ʈ �߻� join�� ����ڰ� �̸��� ������ ����� ���� �̺�Ʈ socket.on -> ���� �̺�Ʈ�� ����
	//���� ����ϴ� html����  (�츮�� ��쿡�� Canvas.html) join�� ���õ� ���𰡰� ���� ����. 
	socket.on('join', function(data) {
        //Ŭ���̾�Ʈ�� ������ �����͸� socket.join��Ŵ -> Ŭ���̾�Ʈ�� �濡 �������.
		socket.join(data);
		//Ŭ���̾�Ʈ���� 'room'���� ���� �����͸� ������ ����. �� ��쿡�� Ŭ���̾�Ʈ���� �ڽ��� �� ��ȣ�� �ο�.
        socket.set('room', data);
    });
	
	
	
	
	
	
	
	
	
	
	
	
	//ä�ð� ���õ� �޼ҵ�
	socket.on('chatMessage', function(data) {
		socket.get('room', function(err, room) {
			io.sockets.in(room).emit('chatMessage', data);						
		});
		
	});
	
	//���Ͽ�û��
	socket.on('sendEmail', function(data) {
		console.log('sendmail�� ��~~~~~~');
		console.log(data.mail.toString());	
			
			//���� ������ ����
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
					subject:'���������� �ʴ� ��ũ�Դϴ�.',
					html: '<a href="http://localhost:8080/invite?room=' + data.room + '">������ �̵�</a>',
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
	
	
	//��������Ʈ�� ���õ� �޼ҵ�
	socket.on('participant', function() {
		socket.get('room', function(err, room) {
			//participant.push(getid);
			for(var i=0;i<rc.length;i++){
				if(rc[i].roomname==roomname){					
					//�� �κ� �ϰ� �ִ� ��.....
					io.sockets.in(room).emit('participant', rc[i].participant);
					console.log(rc[i].participant.toString());
				}
			}
		});
	});
	
	
	
/*	socket.on('deletefile', function() {
		//���� ����
		for(var i=0; i<flist.length;i++){
			console.log('������������ ��');
			//filedata �Լ��� ��� ������ �ִ°� ��..Ŭ��������..�޼ҵ�... �װű׸��� ���� �̸� ��� �ִ°�.....
			if(flist[i].gb==1) delfile(1, flist[i].class);
			else if(flist[i].gb==2) delfile(2, flist[i].class);
			else if(flist[i].gb==3) delfile(3, flist[i].class);
			else if(flist[i].gb==0) delfile(0, flist[i].class);
		}
		
		delfolder();

	});*/
	
	/*function delfolder()
	{
		var folder='';//���������ϰ�������̸�
		
		
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
				console.log('mvc��!!!');
				console.log(mvc);
				folder='./mvc/' + roominfo + "/"  +mvc;	
				console.log('������ ������');
				console.log(folder);
				
				fs.rmdir(folder, function(err) {
					if(err) throw err;
					console.log('successfully deleted folder');
				});	
			}
			else
			{
				console.log('i�� 4��!!!')
				console.log(i);
				console.log('������ ������');
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
		var file='';//���������ϰ�������̸�
		
		
		var mvc='';
		if(gb==1) mvc='controller';
		else if(gb==2) mvc='service';
		else if(gb==3) mvc='dao';
		else if(gb==0) mvc='basic'
			
			
		file='./mvc/' + roominfo + "/"  +mvc+'/'+fc.classname+'.java';	
		console.log('�������� ������ ������');
		console.log(file);
		
		
		fs.unlink(file, function(err) {
			if(err) throw err;
			console.log('successfully deleted file');
		});		
		
	
	}
	*/
	
	
	
	//gb = canvas.html���� �޾ƿ��� ��Ʈ�ѷ� ���� ��� ����
	var room='';//������̸� ***�߰�
	var fcrea=false;
	var isExam=false; //ExamController ���翩��
	var conList=[]; //controllerŬ�������� ����Ʈ
	var conSize=0;
	var ismvc=false;
	var connTb=null; //dao�� ����� table
	var splitName=''; //ex)ExamController��� Exam
	var splitName2='';
	//class file�� ������ �Է��ϴ� �۾�
	function filedata(gb, fc, conn){
		
		fcrea=false;
		ismvc=false; //mvc �ڵ�������� ��������� ���̺�����ִ��� check�ϴ� ����
		var data='';//���Ͽ� �Է��� ������
		var file='';//���������ϰ�������̸�
		splitName=''; 
		splitName2='';
		
		ismvc=isMvc(gb, fc);
		
		

		var mvc='';
		if(gb==1) mvc='controller';
		else if(gb==2) mvc='service';
		else if(gb==3) mvc='dao';
		else if(gb==0) mvc='basic'

			data='package '+mvc+';\n\n';
		//�����Ŭ������ import��Ű��
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
			if(fc.classname=='ExamController'){ //***�߰�
				data+='import vo.ExamVO;\nimport java.util.ArrayList;\n'
			}
		}
//������!!!!!!!!!!!!
		if(ismvc&&connTb!=null&&isDB){
			data+='import vo.'+connTb.tablename+'VO;\nimport java.util.ArrayList;\nimport java.sql.SQLException;\n'
			if(gb==1){
				data+='import commons.DBUtil;\nimport commons.OracleDBConnection;\n';
			}else if(gb==3){
				data+='';
			}
		}
		
		data+='\npublic class '+fc.classname;
		if(gb==1){
			data+=' extends HttpServlet';
		}

		data+='{\n';

		//����Ŭ���� �ֱ�
		
		//***�߰�
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

		//��������Ʈ ���鼭 �ֱ�
		for(var j=0; j<fc.valuename.length;j++){
			if(fc.directvalue[j]==""&&fc.valuename[j]!=""){
				data+='\t'+fc.selectvalue[j]+" "+fc.valuename[j]+';\n';
			}else if(fc.directvalue[j]!=""&&fc.valuename[j]!=""){
				data+='\t'+fc.directvalue[j]+" "+fc.valuename[j]+';\n';
			}
		}
		data+='\n\n';
		//�޼ҵ帮��Ʈ ���鼭 �ֱ�
		for(var j=0; j<fc.methodname.length;j++){
			if(fc.directmethod[j]==""&&fc.methodname[j]!=""){
				data+='\tpublic '+fc.selectmethod[j]+" "+fc.methodname[j]+'(){\n\t\t'+makeReturnVal(fc.selectmethod[j])+'\n\t}\n\n';
			}else if(fc.directmethod[j]!=""&&fc.methodname[j]!=""){
				data+='\tpublic '+fc.directmethod[j]+" "+fc.methodname[j]+'(){\n\t\t'+makeReturnVal(fc.directmethod[j])+'\n\t}\n\n';
			}
		}

		if(gb==2){
			if(ismvc&&connTb!=null&&isDB){
				data+='\n\n';
				data+='\t@Override\n\tpublic ArrayList<'+connTb.tablename+'VO> select'+connTb.tablename+'() throws SQLException {\n\t\t// TODO Auto-generated method stub\n\t\ttry {\n\t\t\tArrayList<'+connTb.tablename+'VO> list = '+splitName2+'DAO.select'+connTb.tablename+'();\n\t\t\treturn list;\n\t\t} catch (SQLException e){\n\n\t\t\tArrayList<'+connTb.tablename+'VO> error=new ArrayList<'+connTb.tablename+'VO>();\n\t\t\terror=null;\n\t\t\te.printStackTrace();\n\t\t\tSystem.out.println("select fail");\n\t\t\treturn error;\n\t\t}\n\t}\n\n';

			}
		}

		if(gb==3){
			if(ismvc&&connTb!=null&&isDB){
				data+='\n\n';
				data+='';
			}
		}

		//��Ʈ�ѷ��� doGet,doPost�޼ҵ� �ֱ� ***�߰�
		if(gb==1){
			data+='\tprotjcted void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {\n';
			if(fc.classname=='ExamController'){
				data+='\t\trequest.setCharacterEncoding("UTF-8");\n\n\t\tArrayList<ExamVO> list = new ArrayList<ExamVO>();\n\t\tExamVO exam=new ExamVO();\n\t\texam.setName("�����");\n\t\texam.setPhone("010-1111-1111");\n\t\texam.setEmail("aaa@naver.com");\n\t\tlist.add(exam);\n\n\t\tExamVO exam1=new ExamVO();\n\t\texam1.setName("����");\n\t\texam1.setPhone("010-2222-2222");\n\t\texam1.setEmail("bbb@naver.com");\n\t\tlist.add(exam1);\n\n\t\tExamVO exam2=new ExamVO();\n\t\texam2.setName("��μ�");\n\t\texam2.setPhone("010-3333-3333");\n\t\texam2.setEmail("ccc@naver.com");\n\t\tlist.add(exam2);\n\n\t\tExamVO exam3=new ExamVO();\n\t\texam3.setName("�����");\n\t\texam3.setPhone("010-4444-4444");\n\t\texam3.setEmail("ddd@naver.com");\n\t\tlist.add(exam3);\n\n\t\tExamVO exam4=new ExamVO();\n\t\texam4.setName("ȫ����");\n\t\texam4.setPhone("010-5555-5555");\n\t\texam4.setEmail("eee@naver.com");\n\t\tlist.add(exam4);\n\n\t\tRequestDispatcher rd = request.getRequestDispatcher("exam.jsp"); \n\t\trequest.setAttribute("USERLIST", list);\n\t\trd.forward(request, response);';
			}else if(ismvc&&connTb!=null&&isDB){
				data+='\t\trequest.setCharacterEncoding("UTF-8");\n\n\t\ttry{\n\n\t\t\tOracleDBConnection odb = new OracleDBConnection();\n\t\t\tDBUtil.setDBMSConnector(odb);\n\n\t\t\tArrayList<'+connTb.tablename+'VO> list = new ArrayList<'+connTb.tablename+'VO>();\n\t\t\tlist='+splitName2+'Service.select'+connTb.tablename+'();\n\n\t\t\tRequestDispatcher rd = request.getRequestDispatcher("/views/list.jsp");\n\n\t\t\trequest.setAttribute("list", list);\n\t\t\trd.forward(request, response);\n\n\t\t}catch(SQLException e){\n\t\t//TODO Auto-generated catch block\n\t\t\te.printStackTrace();\n\t\t}\n\n'
			}
			data+='\n\t}\n\tprotected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {\n\t\tdoGet(request, response);\n\t}\n\n';

		}

		data+='}';
	 
		file='./mvc/'+room+'/src/'+mvc+'/'+fc.classname+'.java';
		
		//file�� data����
		var writer = fs.createWriteStream(file);
		writer.write(data);

		

		writer.end('');
		writer.on('finish', function() {
			console.log('file create..');
		});

		fcrea=true;


	}
	
	
	//vo class file�� ������ �Է��ϴ� �۾�
	function vofiledata(fc){
		fcrea=false;
		var data='';//���Ͽ� �Է��� ������
		var file='';//���������ϰ�������̸�

		var mvc='vo';
		
		data='package '+mvc+';\n\n';
		
		data+='public class '+fc.classname;
		
		data+='{\n';


		//��������Ʈ ���鼭 �ֱ�
		for(var j=0; j<fc.valuename.length;j++){
			data+='\tprivate '+fc.selectvalue[j]+" "+fc.valuename[j]+';\n';
		}
		data+='\n\n';
		//�޼ҵ帮��Ʈ ���鼭 �ֱ�
		for(var j=0; j<fc.valuename.length;j++){
			data+='\tpublic '+fc.selectvalue[j]+" get"+fc.valuename[j].substring(0,1).toUpperCase()+fc.valuename[j].substring(1)+'(){\n\t\treturn '+fc.valuename[j]+';\n\t}\n';
			data+='\tpublic void set'+fc.valuename[j].substring(0,1).toUpperCase()+fc.valuename[j].substring(1)+'('+fc.selectvalue[j]+' '+fc.valuename[j]+'){\n\t\tthis.'+fc.valuename[j]+' = '+fc.valuename[j]+';\n\t}\n';

		}

		
		data+='}';
	 
		file='./mvc/'+room+'/src/'+mvc+'/'+fc.classname+'.java';
		
		//file�� data����
		var writer = fs.createWriteStream(file);
		writer.write(data);

		

		writer.end('');
		writer.on('finish', function() {
			console.log('file create..');
		});

		fcrea=true;


	}
	
	
	
	
	//sql���� ����
	socket.on('createtb', function() {
      socket.get('room', function(err, froom) {
		 

         room = froom;
         var tlist =[];
         
         
         for(var i = 0; i < rc.length; i++)
         {
            if(rc[i].roomname==froom){
               roominfo = froom
               tlist=rc[i].tablelist;
            }   
         }
         
         var dir='';

         //���丮����

         dir='./table';

         if(!fs.existsSync(dir)){
             fs.mkdirSync(dir);
         }
         
         
    
         sqldata(tlist);
         

	



      });
   });
   
   // ��  .sql �ۼ��ϴ� ��
   function sqldata(tlist) {
     var data='';
      var file = '';
      
      
      
     file='./table/'+roominfo+'.sql';

      if(tlist.length!=0){
         for(var d=0;d<tlist.length;d++){
            data+='CREATE '+tlist[d].tablename+'{\n';
            for(var i = 0; i < tlist[d].datatype.length; i++ )
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
            data += '};\n\n';
         }
		 
		 //file�� data����
		  var writer = fs.createWriteStream(file);
		  writer.write(data);

		  

		  writer.end('');
		  writer.on('finish', function() {
			 console.log('file create..');
		  });
      }


      
      
      
      
      
   }

//list�ȿ� �ش� Ŭ���� �ִ��� ã��
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

//mvc�ڵ�������� ����������� ���̺� dao�� ����Ǿ��ִ��� check
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

	
	
	//var flist=[]; //�� ���Ͽ� �Է��� ������ �ޱ����� ����
	//������Ʈ ���ϻ��� 
	//������Ʈ ���ϻ��� 
	socket.on('createpj',function(){
		socket.get('room', function(err, froom) {
		room=froom; //***�߰�
		var flist=[]; //�� ���Ͽ� �Է��� ������ �ޱ����� ����
		var isDB=false; //db���� �ִ���
		var dbInfor=new db_element();

		//rc����Ʈ�� ���� ���̸��� �����ϸ� canvaslist�� flist�� �ִ´�
		for(var i=0;i<rc.length;i++){
			if(rc[i].roomname==froom){
				roominfo = froom
				flist=rc[i].canvaslist;
				if(rc[i].db.dbid!=''&&rc[i].db.dbpw!=''&&rc[i].db.dbport!=''&&rc[i].db.dbsid!=''){
					isDB=true;
					dbInfor=rc[i].db;
				}

		
			}	
		}
		
		
	var dir='';

	//���丮����

	dir='./mvc';

	if(!fs.existsSync(dir)){
	    fs.mkdirSync(dir);
	}

	//�߰�- ������Ʈ�⺻ ����ī���ϱ�����.(java project�λ����Ҷ�)
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




	isExam=false;
	//javalist���鼭 �ڵ�ȭ
	for(var i=0; i<flist.length;i++){
	fcrea=false;
		//�����Ŭ������ ����Ʈ�����
		var conn_list = []; //���Ḯ��Ʈ
		var conn_idx = 0; //�����ε���

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



	var dirname='./'+froom+'.zip';

	while(true){

		if(fcrea){
				//zip���Ϸ� ����

	var EasyZip = require('easy-zip').EasyZip;

	var zip1 = new EasyZip();


	zip1.zipFolder('./pj/optestpj/.settings',function(){
		  zip1.writeToFile(dirname);

	});

	zip1.zipFolder('./pj/optestpj/WebContent',function(){
		  zip1.writeToFile(dirname);

	});


	zip1.zipFolder('./mvc/'+froom+'/src',function(){
    		zip1.writeToFile(dirname);
	});

	var jsFolder = zip1.folder('build/classes');
	zip1.writeToFile(dirname);


	//.setting������ org.eclipse.wst.common������Ʈ�̸� ������ �߰�
	var data1='<?xml version="1.0" encoding="UTF-8"?><project-modules id="moduleCoreId" project-version="1.5.0">\n\t<wb-module deploy-name="'+froom+'">\n\t\t<wb-resource deploy-path="/" source-path="/WebContent" tag="defaultRootSource"/>\n\t\t<wb-resource deploy-path="/WEB-INF/classes" source-path="/src"/>\n\t\t<property name="context-root" value="'+froom+'"/>\n\t\t<property name="java-output-path" value="/'+froom+'/build/classes"/>\n\t</wb-module>\n</project-modules>';
	zip1.file('.settings/org.eclipse.wst.common.component',data1);	


	//.classpath �����߰�
	var data1='<?xml version="1.0" encoding="UTF-8"?>\n<classpath>\n\t<classpathentry kind="src" path="src"/>\n\t<classpathentry kind="con" path="org.eclipse.jdt.launching.JRE_CONTAINER/org.eclipse.jdt.internal.debug.ui.launcher.StandardVMType/jre1.8.0_73">\n\t\t<attributes>\n\t\t\t<attribute name="owner.project.facets" value="java"/>\n\t\t</attributes>\n\t</classpathentry>\n\t<classpathentry kind="con" path="org.eclipse.jst.server.core.container/org.eclipse.jst.server.tomcat.runtimeTarget/Apache Tomcat v8.0">\n\t\t<attributes>\n\t\t\t<attribute name="owner.project.facets" value="jst.web"/>\n\t\t</attributes>\n\t</classpathentry>\n\t<classpathentry kind="con" path="org.eclipse.jst.j2ee.internal.web.container"/>\n\t<classpathentry kind="con" path="org.eclipse.jst.j2ee.internal.module.container"/>\n\t<classpathentry kind="output" path="build/classes"/>\n</classpath>\n';
	zip1.file('.classpath',data1);




	//.project ���� ������Ʈ�̸� ������ �߰�
	var data1='<?xml version="1.0" encoding="UTF-8"?>\n<projectDescription>\n\t<name>'+froom+'</name>\n\t<comment></comment>\n\t<projects>\n\t</projects>\n\t<buildSpec>\n\t\t<buildCommand>\n\t\t\t<name>org.eclipse.jdt.core.javabuilder</name>\n\t\t\t<arguments>\n\t\t\t</arguments>\n\t\t</buildCommand>\n\t\t<buildCommand>\n\t\t\t<name>org.eclipse.wst.common.project.facet.core.builder</name>\n\t\t\t<arguments>\n\t\t\t</arguments>\n\t\t</buildCommand>\n\t\t<buildCommand>\n\t\t\t<name>org.eclipse.wst.validation.validationbuilder</name>\n\t\t\t<arguments>\n\t\t\t</arguments>\n\t\t</buildCommand>\n\t</buildSpec>\n\t<natures>\n\t\t<nature>org.eclipse.jem.workbench.JavaEMFNature</nature>\n\t\t<nature>org.eclipse.wst.common.modulecore.ModuleCoreNature</nature>\n\t\t<nature>org.eclipse.wst.common.project.facet.core.nature</nature>\n\t\t<nature>org.eclipse.jdt.core.javanature</nature>\n\t\t<nature>org.eclipse.wst.jsdt.core.jsNature</nature>\n\t</natures>\n</projectDescription>\n';
	zip1.file('.project',data1);
	zip1.writeToFile(dirname);//write zip data to disk

	//isExam�� true�̸� exam.jsp�߰����ֱ�
	if(isExam){
		zip1.addFile('WebContent/exam.jsp','./pj/exam.jsp',function(){
	    		zip1.writeToFile(dirname);
		});
		zip1.addFile('src/vo/ExamVO.java','./pj/ExamVO.java',function(){
    			zip1.writeToFile(dirname);
		});
	 	
	}

	//db���������� db����Ŭ�����߰�
	if(isDB){
		zip1.addFile('src/commons/DBUtil.java','./pj/optestpj/src/commons/DBUtil.java',function(){
	    		zip1.writeToFile(dirname);
		});
		zip1.addFile('src/commons/IDBConnection.java','./pj/optestpj/src/commons/IDBConnection.java',function(){
	    		zip1.writeToFile(dirname);
		});
		var dbdata='package commons;\n\nimport java.sql.Connection;\nimport java.sql.DriverManager;\nimport java.sql.SQLException;\n\npublic class OracleDBConnection implements IDBConnection{\n\n\tprivate static final String CONNECT = "jdbc:oracle:thin:@localhost:'+dbInfor.dbport+':'+dbInfor.dbsid+'";\n\tprivate static final String USER = "'+dbInfor.dbid+'";\n\tprivate static final String PASSWD = "'+dbInfor.dbpw+'";\n\tprivate Connection conn;\n\n\t@Override\n\tpublic Connection getDBConnection() {\n\n\t\ttry {\n\t\t\tClass.forName("oracle.jdbc.driver.OracleDriver");\n\t\t\tconn = DriverManager.getConnection(CONNECT, USER, PASSWD);\n\t\t} catch (SQLException e) {\n\t\t\te.printStackTrace();\n\t\t\tSystem.out.println("DB Connect Error!!!");\n\t\t} catch (ClassNotFoundException e) {\n\t\t\tSystem.out.println("Library Load Fail");\n\t\t}\n\n\t\treturn conn;\n\t}\n\n}\n';
		zip1.file('src/commons/OracleDBConnection.java',dbdata);	
		zip1.writeToFile(dirname);

		

		

		


	}

	//controller�߶��ְ� ù���� �ҹ��ڷ� �ٲ��ִ� �޼ҵ�
	function urlmaker(string){
	  	var sp = string.split('Controller');
	      	var sp2=sp[0].substring(0,1).toLowerCase()+sp[0].substring(1,sp[0].length);
	         return  sp2;
	   
	}

	//web.xml�� �� ��Ʈ�ѷ����� servlet mapping���ֱ� 
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



	//�߰��߰�..db���� �ޱ�
	socket.on('db_infor', function(data) {

	//rc����Ʈ�� ���鼭 roomname�� ���������� ���� ������ canvaslist ���� �ε����� //��� �������� �޾Ƽ� �����Ѵ�.	
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
    	
    	
    	//rc����Ʈ�� ���鼭 roomname�� ���������� ���� ������ canvaslist ���� �ε����� //canvas�� �׷��� �������� �޾Ƽ� �����Ѵ�.	
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
    	
    	
    	//rc����Ʈ�� ���鼭 roomname�� ���������� ���� ������ tablelist ���� �ε����� //table�� �׷��� �������� �޾Ƽ� �����Ѵ�.	
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



    
  //�߰�.. canvas ����emit�Ѱ� �޾Ƽ� ó��
    socket.on('modifyCanvas', function(data) {

    //����ڰ� ������Ŭ�����̸��� ������ã�Ƽ� canvaslist�������ش�.
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
    
 
  // table ����emit�Ѱ� �޾Ƽ� ó��
    socket.on('modifyTable', function(data) {

    //����ڰ� ������Ŭ�����̸��� ������ã�Ƽ� canvaslist�������ش�.
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
    	


  //canvas ����emit�Ѱ� �޾Ƽ� ó��
    socket.on('deleteCanvas', function(data) {

    //����ڰ� ������Ŭ�����̸��� ������ã�Ƽ� canvaslist�������ش�.
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
    
    //table ����emit�Ѱ� �޾Ƽ� ó��
    socket.on('deleteTable', function(data) {

    //����ڰ� ������Ŭ�����̸��� ������ã�Ƽ� canvaslist�������ش�.
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
      
	
  // canvas move emit�Ѱ� �޾Ƽ� ó��
    socket.on('moveCanvas', function(data) {

    //����ڰ� ������Ŭ�����̸��� ������ã�Ƽ� canvaslist�������ش�.
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

  // table move emit�Ѱ� �޾Ƽ� ó��
    socket.on('moveTable', function(data) {

    //����ڰ� ������Ŭ�����̸��� ������ã�Ƽ� canvaslist�������ش�.
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


    
    
  //canvas ����ٲ����� emit�Ѱ� �޾Ƽ� ó��
    socket.on('connCanvas', function(data) {

    //����ڰ� ������Ŭ�����̸��� ������ã�Ƽ� canvaslist�������ش�.
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
      //  console.log('���⼭ ����');

        
    });
    

   if(url == '/canvas')
   {
	   //canvas�� ���� ���� disconnect�� �ÿ�
	   socket.on('disconnect', function() {
		   //var intonum = req.param('index');
		   for(var i=0;i<rc.length;i++){
				if(rc[i].roomname==roomname){
					
					//socket.id�� �ش��ϴ� ���� ������ �޾� �ͼ� ������ ����� ������ ���
					for(var j = 0; j < rc[i].p_size; j++)
					{
						if(rc[i].participant[j] == clients[socket.id])
						{
							console.log(j);
							console.log('��������');
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



	

