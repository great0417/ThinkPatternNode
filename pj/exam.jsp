<%@page import="java.util.ArrayList"%>
<%@page import="vo.ExamVO"%>
<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>TEST</title>
</head>
<% 
	ArrayList<ExamVO> list = (ArrayList<ExamVO>) request.getAttribute("USERLIST");
	int idx=1;
%>
<body>
   <table width="100%" cellpadding="0" cellspacing="0" border="1">
      <tr style="background:url('img/table_mid.gif') repeat-x; text-align:center;">
            <td>번호</td>
            <td>이름</td>
            <td>전화번호</td>
            <td>E-mail</td>
        </tr>
        <% for(ExamVO vo:list){ %>
        <tr align="center">
           <td><%=idx++%></td>
            <td><%=vo.getName()%></td>
            <td><%=vo.getPhone()%></td>
            <td><%=vo.getEmail()%></td>
        </tr>
        <% } %>
   </table>
   
   <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
           <td colspan="4" height="5"></td>
        </tr>
       
</table>
</body>
</html>