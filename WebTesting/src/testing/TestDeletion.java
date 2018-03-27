package testing;

import java.util.Set;

import javax.swing.text.html.HTMLDocument.Iterator;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;

public class TestDeletion {

public static void main(String[] args) throws InterruptedException {
		
		System.setProperty("webdriver.chrome.driver", "/home/k1631233/Documents/chromedriver");
		WebDriver driver = new ChromeDriver();
		driver.get("https://tellmesite.newagedev.co.uk/");
		
		driver.findElement(By.className("close")).click();
		
		Thread.sleep(1000);
		
		driver.switchTo().alert().accept();
		
	}
}
