package testing;

import java.util.Set;

import javax.swing.text.html.HTMLDocument.Iterator;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;

public class TestDeletion {

public static void main(String[] args) throws InterruptedException {
    // declaration and instantiation of objects/variables
	System.setProperty("webdriver.chrome.driver", "/home/k1631285/git/tellMe/WebTesting/chromedriver/chromedriver");
	WebDriver driver = new ChromeDriver();
	driver.get("https://tellmesite.newagedev.co.uk/");
		
	driver.findElement(By.className("close")).click();
		
	Thread.sleep(1000);
		
	driver.switchTo().alert().accept();
	
	//closes chrome
	driver.close();
		
	}
}
