package commons;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

//오라클 연결 전용 클래스
public class OracleDBConnection implements IDBConnection{


	private static final String CONNECT = "jdbc:oracle:thin:@localhost:1521:orcl";
	private static final String USER = "HMJ";
	private static final String PASSWD = "HMJ";
	private Connection conn;
	
	@Override
	public Connection getDBConnection() {

		try {
			Class.forName("oracle.jdbc.driver.OracleDriver");
			conn = DriverManager.getConnection(CONNECT, USER, PASSWD);
		} catch (SQLException e) {
			e.printStackTrace();
			System.out.println("DB Connect Error!!!");
		} catch (ClassNotFoundException e) {
			System.out.println("Library Load Fail");			
			
		}
		
		return conn;
	}

}
