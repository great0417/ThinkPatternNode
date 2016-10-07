package controller;

import service.NoticeBoardService;
import java.io.IOException;
import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class NoticeBoardController extends HttpServlet{
	NoticeBoardService noticeBoardService=new NoticeBoardService();
	init Title;
	String Contents;
	String Writer;
	int Counts;


	public init Insert(){

	}

	public String Select(){

	}

	public void Delete(){

	}

	public int Update(){

	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

	}
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}