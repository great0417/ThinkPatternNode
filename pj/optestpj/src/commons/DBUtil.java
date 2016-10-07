package commons;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;


public class DBUtil {

	private static Connection conn = null;
	private static PreparedStatement pstmt = null;
	private static IDBConnection DBMSConnector = null;
	
	public static void setDBMSConnector(IDBConnection conn){
		DBMSConnector = conn;
	}
	
	/**
	 * DataBase Connection try Method
	 * */
	private static void tryConnection(){
		conn = DBMSConnector.getDBConnection();
	}
	
	/**
	 * Initialize PreparedStatement by Connection and SQL
	 * */
	public static PreparedStatement startSQL(String sql) throws SQLException{
		tryConnection();
		pstmt = conn.prepareStatement(sql);
		return pstmt;
	}
	
	/**
	 * Close PreparedStatement and Connection
	 * */
	public static void endSQL() throws SQLException{
		pstmt.close();
		conn.close();
	}
	
	public static ResultSet executeQuery() throws SQLException{
		return pstmt.executeQuery();
	}
	
	public static int executeUpdate() throws SQLException{
		return pstmt.executeUpdate();
	}
	
}
