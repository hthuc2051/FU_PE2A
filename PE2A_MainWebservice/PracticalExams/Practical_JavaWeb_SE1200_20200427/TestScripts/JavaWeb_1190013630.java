package server;

import com.practicalexam.student.TemplateQuestion;
import org.junit.Assert;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;


import java.util.concurrent.TimeUnit;

import static org.junit.Assert.*;
import static org.junit.jupiter.api.Assertions.assertEquals;


@SpringBootTest(classes = {SpringbootWithWebxmlApplication.class}, webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
@ActiveProfiles("test")
@ExtendWith(TestResultLoggerExtension.class)
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class TestwebApplicationTests {
    public static String questionPointStr = "checkConnection:1-checkLoginDAO:1-showAllDAO:1-deleteDAO:1-checkLogin:1-checkWelcome:1-showAllUI:1-deleteUI:1-logOut:1";
    private TemplateQuestion templateQuestion = new TemplateQuestion();
    public static WebDriver driver;
    //public static InternetExplorerOptions options;
    public static ChromeOptions options;
    static boolean isLogin  = false;


    public TestwebApplicationTests() {
        //  System.setProperty("webdriver.ie.driver", "src/main/resources/static/IEDriverServer.exe");
        System.setProperty("webdriver.chrome.driver", "src/main/resources/static/chromedriver2.exe");
        if (options == null) {
            options = new ChromeOptions();
            if (driver == null) {
                options.addArguments("--headless");
                driver = new ChromeDriver(options);
                driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
            }
        }
    }
    //start
@Test 
@Order(1) 
public void checkConnection(){boolean check = DBUtils.checkMakeConnection();Assert.assertEquals( true , check );if( check ){  DBUtils.executeUpdate("Insert into tbl_Weapon(amourId, description, classification, defense, timeOfCreate, status) Values ('AM01','AM01','AM01','AM01','2020-03-12','true'),('AM02','AM02','AM02','AM02','2020-03-12','true'), ('AM03','AM03','AM03','AM03','2020-03-12','true')"); }}@Test 
@Order(2) 
public void checkLoginDAO(){boolean checkLoginSuccess = TemplateQuestion.checkLogin("LoginSuccess", "1");boolean checkLoginFailed = TemplateQuestion.checkLogin("LoginFailed", "1");boolean checkLoginIsBoss = TemplateQuestion.checkLogin("LoginNotBoss", "1");Assert.assertEquals( true , checkLoginSuccess && !checkLoginFailed && !checkLoginIsBoss );}@Test 
@Order(3) 
public void showAllDAO(){if( !isLogin ){assertTrue( false );}else{Assert.assertEquals( Integer.valueOf("3") , TemplateQuestion.showAll());}}@Test 
@Order(4) 
public void deleteDAO(){if( !isLogin ){assertTrue( false );}else{boolean checkDAO = TemplateQuestion.delete("AM02");boolean checkExisted= DBUtils.executeQuery("SELECT amourId FROM tbl_Weapon Where amourId = 'A02'");Assert.assertEquals( true , checkDAO && !checkExisted );}}@Test 
@Order(5) 
public void checkLogin(){if( driver != null ){if( !isLogin ){assertTrue( false );}else{driver.get( "http://localhost:8080/login.html" );driver.findElement(By.name( "txtUsername")).clear();driver.findElement(By.name( "txtUsername" )).sendKeys( "LoginSuccess" );driver.findElement(By.name( "txtPassword")).clear();driver.findElement(By.name( "txtPassword" )).sendKeys( "1" );driver.findElement(By.name( "btAction" )).click();try{String html = driver.findElement(By.tagName("body")).getText();Assert.assertEquals( true , html.toLowerCase().contains("search page") && html.toLowerCase().contains("am01") );}catch( Exception e ){assertTrue( false );}}}else{assertTrue( false );}}@Test 
@Order(6) 
public void checkWelcome(){if( driver != null ){if( !isLogin ){assertTrue( false );}else{driver.get( "http://localhost:8080/login.html" );driver.findElement(By.name( "txtUsername")).clear();driver.findElement(By.name( "txtUsername" )).sendKeys( "LoginSuccess" );driver.findElement(By.name( "txtPassword")).clear();driver.findElement(By.name( "txtPassword" )).sendKeys( "1" );driver.findElement(By.name( "btAction" )).click();try{String html = driver.findElement(By.tagName("body")).getText();Assert.assertEquals( true , html.toLowerCase().contains("loginsuccess") && html.toLowerCase().contains("1") );}catch( Exception e ){assertTrue( false );}}}else{assertTrue( false );}}@Test 
@Order(7) 
public void showAllUI(){if( driver != null ){if( !isLogin ){assertTrue( false );}else{driver.get( "http://localhost:8080/login.html" );driver.findElement(By.name( "txtUsername")).clear();driver.findElement(By.name( "txtUsername" )).sendKeys( "LoginSuccess" );driver.findElement(By.name( "txtPassword")).clear();driver.findElement(By.name( "txtPassword" )).sendKeys( "1" );driver.findElement(By.name( "btAction" )).click();try{String html = driver.findElement(By.tagName("body")).getText();Assert.assertEquals( true , html.toLowerCase().contains("search page") && html.toLowerCase().contains("am01") );}catch( Exception e ){assertTrue( false );}}}else{assertTrue( false );}}@Test 
@Order(8) 
public void deleteUI(){if( driver != null ){if( !isLogin ){assertTrue( false );}else{driver.get( "http://localhost:8080/delete?idDelete=AM03&btAction=Delete" );boolean checkDB= DBUtils.executeQuery("SELECT amourId FROM tbl_Weapon Where amourId = 'AM03'");if( !checkDB ){try{String html = driver.findElement(By.tagName("body")).getText();Assert.assertEquals( true , html.contains("search page") && !html.contains("am03") );}catch( Exception e ){assertTrue( false );}}else{assertTrue( false );}}}else{assertTrue( false );}}@Test 
@Order(9) 
public void logOut() {if (driver != null) {if (!isLogin) {assertFalse(true);} else {driver.get("http://localhost:8080/logout");try {String html = driver.findElement(By.tagName("body")).getText();Assert.assertEquals(true, html.toLowerCase().contains("login page"));} catch (Exception e) {assertFalse(true);}}} else {assertFalse(true);}DBUtils.executeUpdate("Delete From tbl_Weapon");}
//end
}
