package testing;

import java.util.Set;

import javax.swing.text.html.HTMLDocument.Iterator;

import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;

public class TestDeletion {

public static void main(String[] args) throws InterruptedException {
    // declaration and instantiation of objects/variables
	System.setProperty("webdriver.chrome.driver", "/chromedriver/chromedriver");
	WebDriver driver = new ChromeDriver();
	driver.get("https://tellmesite.newagedev.co.uk/");

	String testContent = "Test announcement content.";

	WebElement newPost = driver.findElement(By.id("postBtn"));
	WebElement content = driver.findElement(By.id("text"));
	WebElement title = driver.findElement(By.id("titleBtn"));
	WebElement submit = driver.findElement(By.id("submitBtn"));


	driver.findElement(By.id("postBtn")).click();
	title.sendKeys("Test Title");
	content.sendKeys(testContent);
	submit.click();
	System.out.println("Posting test annoucement...");
	System.out.println("Finding announcement...");

	WebElement announcement = driver.findElement(By.xpath("//*[@id=\"announcements\"][contains(text(), \""+ testContent +"\")]"));
	System.out.println("Selecting Annoucement...");
	Thread.sleep(1000);

	announcement.findElement(By.className("close")).click();
	System.out.println("Deleted announcement");
	Thread.sleep(1000);

	if(driver.findElement(driver.findElement(By.xpath("//*[@id=\"announcements\"][contains(text(), \""+ testContent +"\")]")))) {
		System.out.println("Test Failed");
	} else {
		System.out.println("Test Success");
	}

	driver.switchTo().alert().accept();

	//closes chrome
	driver.close();

	}
}
