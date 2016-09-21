<!DOCTYPE html>

<html>
<head>
    <!-- Lobby.html -->
    <title>Lobby Page</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
	


	
<c:url value="/resources/" var="R" />
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<script src="http://code.jquery.com/jquery-latest.js"></script>

<link href="${R}res/site.css" rel="stylesheet" media="screen">
<script src="${R}res/common.js"></script>
<script src="${R}res/js/main.js"></script>
<script src="${R}res/js/jquery.min.js"></script>
<script src="${R}res/js/jquery.scrolly.min.js"></script>
<script src="${R}res/js/jquery.dropotron.min.js"></script>
<script src="${R}res/js/jquery.scrollex.min.js"></script>
<script src="${R}res/js/skel.min.js"></script>
<script src="${R}res/js/util.js"></script>
<!-- <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet"> -->
	
	
	
	
	<%@ include file="/include/menu.jsp"%>
    
    
    
    
    
    
    
    <script src="http://code.jquery.com/jquery-1.10.2.min.js"></script>
    <script src="/socket.io/socket.io.js"></script>
    <script>
    $(document).ready(function(){
    	 var query = $(location).attr('search');
         var param = query.split('?id=');
         var id = param[1];
        document.getElementById("id").value = id;
        //alert(id);
    	
		
    
        $.getJSON('/room', function(data){      // ajax 수행
            $.each(data, function(index, item){     // 반복 수행, item은 쓰지 않지만 걍 넣음. http://localhost/room 에 접속해 json을 읽기바람
                $('<button></button>').attr({ 'data-room': index }).text('Room Number2: ' + index).appendTo('#container');        // 문서 객체 추가
            });
            eventPack();
        });
        
        var socket = io.connect();
        socket.on('create_room', function(data){        // socket 처리 수행
            $('<button></button>').attr({ 'data-room': data.room }).text('Room Number1: ' + data.room).appendTo('#container');     // 문서 객체 추가
            eventPack();
        });
        
        
        var eventPack = function(){     // 이벤트를 등록. json(비동기), socket으로 만들어지는 button 태그는 이 이벤트 설정 후 뒤늦게 만들어 지기에 이벤트가 달라붙지 않는다.
            $('#container > button').unbind('click');       // 반복 실행으로 인한 중복 이벤트 방지 - 이벤트 삭제
            $('body > button').unbind('click');
            
            $('#container > button').click(function() {
                var room = $(this).attr('data-room');       // 변수 선언
                var param = room.split('/');
                var roomname = param[1];
                var data = {"room" : '?room=' + roomname, "id" : '&id=' + $("#id").val()};
              //  alert(data.room);
                window.location = '/canvas' + data.room + data.id;     // 페이지 이동. (window. 는 생략가능하지만 명시적으로 적어줌)
            });
            $('body > button').click(function (){
				var room = '?' + $('#room').val();        // 변수 선언
                
                var data = {"room" : '?room=' + $("#room").val(), "id" : '&id=' + $("#id").val()};
                
                
                
                socket.emit('create_room', {
                	room: room,
                });       // 소켓 이벤트 발생
                
                
                window.location = '/canvas' + data.room + data.id;      // 페이지 이동.
            });
        };
        
        
        eventPack();
    });
    </script>
</head>
<body>
<h1>Rint Real Time Canvas</h1>
<p>Connect Web Server With Socket.io</p>
<span>Room : </span> <input id="room" /> <button>Create ROOM</button>
<input type="hidden" id="id" value="">

<hr />
<div id="container">

</div>
</body>
<%@ include file="/include/footer.jsp"%>
</html>




