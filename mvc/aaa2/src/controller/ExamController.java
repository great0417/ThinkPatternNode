package controller;

import service.ExamService;
import java.io.IOException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import vo.ExamVO;
import java.util.ArrayList;

public class ExamController extends HttpServlet{
	ExamService examService=new ExamService();


	protjcted void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setCharacterEncoding("UTF-8");

		ArrayList<ExamVO> list = new ArrayList<ExamVO>();
		ExamVO exam=new ExamVO();
		exam.setName("������");
		exam.setPhone("010-1111-1111");
		exam.setEmail("aaa@naver.com");
		list.add(exam);

		ExamVO exam1=new ExamVO();
		exam1.setName("������");
		exam1.setPhone("010-2222-2222");
		exam1.setEmail("bbb@naver.com");
		list.add(exam1);

		ExamVO exam2=new ExamVO();
		exam2.setName("���μ�");
		exam2.setPhone("010-3333-3333");
		exam2.setEmail("ccc@naver.com");
		list.add(exam2);

		ExamVO exam3=new ExamVO();
		exam3.setName("������");
		exam3.setPhone("010-4444-4444");
		exam3.setEmail("ddd@naver.com");
		list.add(exam3);

		ExamVO exam4=new ExamVO();
		exam4.setName("ȫ����");
		exam4.setPhone("010-5555-5555");
		exam4.setEmail("eee@naver.com");
		list.add(exam4);

		RequestDispatcher rd = request.getRequestDispatcher("exam.jsp"); 
		request.setAttribute("USERLIST", list);
		rd.forward(request, response);
	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}