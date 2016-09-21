<!DOCTYPE HTML>
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<html>
<head>
<title>Elements - Landed by HTML5 UP</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1" />
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<%@ include file="/WEB-INF/views/include/menu.jsp"%>

</head>

<script>
      var result= '${result}';
      if(result == 'joinFail')
      {
         alert("회원가입에 실패하셨습니다 다시 하세요");   
      }
      if(result == 'loginFail')
      {
         alert("아이디가 다르거나 비밀번호를 잘못 입력하셨습니다 다시 시도하세요");   
      }
   
</script>





<script type="text/javascript">

$(document).ready(function(){
     $("#enterid").focus();
   $("#enterid").blur(function() {
      var enterid = $("#enterid").val();
      $.ajax({
         url: "http://localhost:8080/user/check",
         type:"POST",
         data:{"id" :enterid},
         success:function(data)
         {      
            if(data == 1)
            {
               $("#check").html("중복된아이디입니다.");
            }
            else if(data == 3)
            {
               $("#check").html("");
            }
            else
            {
               $("#check").html("사용가능한아이디입니다..");
            }
         },
         error:function(request, status, error){

         }   
      
      });
   }); 

   $("#checkpw").blur(function() 
   {
      var pw = $("#pw").val();
      var checkpw=$("#checkpw").val();
      if(pw === checkpw)
      {
         if(pw=="")
         {
            $("#resultpw").html("");
         }
         else
         {
            $("#resultpw").html("맞게 입력하셨습니다.");
         }
      }
      else
      {
         $("#resultpw").html("비밀번호가 다릅니다. 다시 입력하세요.");
      }
      
   }); 
   
   
});      $("#checkpw").blur(function() {
         var pw = $("#pw").val();
         var checkpw = $("#checkpw").val();
         if (pw === checkpw) {
            $("#resultpw").html("맞게 입력하셨습니다.");
         } else {
            $("#resultpw").html("비밀번호가 다릅니다. 다시 입력하세요.");
         }

      });
</script>


<body>

	<div class="join_css">

		<form role="form" method="post">
			<div>
				<div class="join_logo">
					<i class="fa fa-spinner" aria-hidden="true"></i>THINKPATTERN &nbsp;
					회원가입

				</div>
				<div>
					id <input type="text" id="enterid" name="id"
						placeholder="아이디를 입력해주세요">
				</div>

				<div id="check"></div>
				<div>
					password <input type="password" name="password" id="pw"
						placeholder="비밀번호를 입력해주세요">
				</div>

				<div>
					confirmPW <input type="password" id="checkpw" name="pw2"
						placeholder="비밀번호를 다시 입력해주세요">
				</div>

				<div id="resultpw"></div>

				<div>
					name <input type="text" name="name" placeholder="이름을 입력해주세요">
				</div>

				<div>
					email <input type="text" name="email" placeholder="Email을 입력해주세요">
				</div>

				<div class="buttoncss">

					<button type="submit" class="button special small ">Submit</button>
					<a class="button small " href="/">Cancel</a>

				</div>


				<div>
					<!--로그인 실패 성공 뿌려주기  -->
				</div>


			</div>
		</form>


	</div>


</body>
<%@ include file="/WEB-INF/views/include/footer.jsp"%>


</html>