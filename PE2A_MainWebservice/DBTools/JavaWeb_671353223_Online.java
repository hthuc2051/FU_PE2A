/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.practicalexam.student.connection;

import java.io.Serializable;
import java.sql.Connection;
import java.sql.DriverManager;

/**
 * @author Kieu Trong Khanh
 */
public class DBUtilities implements Serializable {

    public static Connection makeConnection() {
        Connection con = null;
        // Add code get connection here
        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            String url = "jdbc:sqlserver://qualic.database.windows.net:1433;databaseName=PracticalTest;";
            con = DriverManager.getConnection(url, "Aqualic_admin@qualic", "thien@fpt1998");
        } catch (Exception e) {
            e.printStackTrace();
        }
        //
        System.out.println(con);
        return con;
    }

}
