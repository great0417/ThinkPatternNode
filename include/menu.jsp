<%@ page language="java" contentType="text/html; charset=UTF-8"
   pageEncoding="UTF-8"%>

 <!-- Bootstrap 3.3.4 -->
    <link href="/resources/bootstrap/css/bootstrap.min.css" rel="stylesheet" type="text/css" />
    <!-- Font Awesome Icons -->
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet" type="text/css" />
    <!-- Ionicons -->
    <link href="https://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css" rel="stylesheet" type="text/css" />
    <!-- Theme style -->
    <link href="/resources/dist/css/AdminLTE.min.css" rel="stylesheet" type="text/css" />
 <script src="/resources/plugins/jQuery/jQuery-2.1.4.min.js"></script>

<link rel="stylesheet"
   href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
   integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
   crossorigin="anonymous">


<script  src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
   integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa"
   crossorigin="anonymous"></script>


<script>
   $('#login').on('shown.bs.modal', function() {
      $('#myInput').focus();
   });
</script>

<div class="modal fade" id="login" tabindex="-1" role="dialog"
	aria-labelledby="myModalLabel">
	<div class="modal-dialog" role="document">
		<div class="modal-content">
			<div class="modal-header">
				<button type="button" class="close" data-dismiss="modal"
					aria-label="Close">
					<span aria-hidden="true">&times;</span>
				</button>
				<h3 class="modal-title" id="myModalLabel">로그인</h3>
			</div>
			<div class="modal-body">
				<form action="/user/loginPost" method="post" name="loginForm">
					<label>ID</label> <input id="myInput" class="form-control"
						type="text" name="uid" placeholder="아이디 입력해주세요" required /> <br />
					<label>Password</label> <input class="form-control" type="password"
						name="upw" placeholder="비밀번호 입력해주세요" required /> <br />
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
					<button type="submit" class="btn btn-primary">Submit</button>
					<br />
				</form>
			</div>
		</div>
	</div>

</div>




<!-- Header -->
<div id="page-wrapper">

	<header id="header">
		<h1 id="logo">
			<a href="../"><i class="fa fa-spinner" aria-hidden="true"></i>THINKPATTERN</a>
		</h1>
		<nav id="nav">
			<ul>
				<li><a href="../">MANUAL</a></li>
				<li><a href="#">DESIGN PATTERN</a>
					<ul>

						<li><a href="#">PATTERN 1</a></li>
						<li><a href="#">PATTERN 2</a></li>
						<li><a href="#">PATTERN 3</a></li>
						<li><a href="#">PATTERN 4</a></li>

					</ul></li>
				<li><a href="/notice/list">SERVICE CENTER</a></li>
			</ul>

		</nav>

		</nav>
		<sign id="sign">
		<ul>
			<c:if test="${vo.getId() eq null }">

				<li><a class="button small" data-toggle="modal"
					data-target="#login"> <i class="fa fa-sign-in"
						aria-hidden="true"></i> sign in
				</a> <a href="/user/join" class="button small"><i class="fa fa-user"
						aria-hidden="true"></i> join</a></li>
			</c:if>

			<c:if test="${vo.getId() ne null}">

				<li>${vo.getName() } 님 환영합니다. <a href="/user/modifyConfirm"
					class="button small"><i class="fa fa-user" aria-hidden="true"></i>
						modify</a> <a href="/user/logout" class="button small"><i
						class="fa fa-sign-out" aria-hidden="true"></i> logout</a>

				</li>
			</c:if>
		</ul>

		</sign>






	</header>
</div>