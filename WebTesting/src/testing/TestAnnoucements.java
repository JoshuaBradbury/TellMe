package testing;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class TestAnnoucements {

	public static void main(String[] args) throws InterruptedException {
		
		System.setProperty("webdriver.chrome.driver", "/home/k1631233/Documents/chromedriver");
		WebDriver driver = new ChromeDriver();
		driver.get("https://tellmesite.newagedev.co.uk/");
		
		String realContent = "Test announcement content."; 
		
		WebElement newPost = driver.findElement(By.id("postBtn"));
		WebElement content = driver.findElement(By.id("text"));
		WebElement title = driver.findElement(By.id("titleBtn"));
		WebElement submit = driver.findElement(By.id("submitBtn"));
		
		driver.findElement(By.id("postBtn")).click();
		title.sendKeys("Test Title");
		content.sendKeys("Test announcement content.");
		submit.click();
		
		if(driver.findElement(By.xpath("//*[@id='announcement-module']/div[3]")).getText().equals(realContent)) {
			System.out.println("Successfully posted!");
		}
		
		
		Thread.sleep(1000);
		
		newPost.click();
		content.clear();
		title.sendKeys("Test Title");
		content.click();
		driver.findElement(By.id("boldBtn")).click();
		content.click();
		content.sendKeys("Test announcement content in BOLD.");
		submit.click();
		
		System.out.println("FONT WEIGHT" + driver.findElement(By.xpath("//*[@id='announcement-module']/div[3]")).getCssValue("font-weight"));
		
		if(driver.findElement(By.xpath("//*[@id='announcement-module']/div[3]")).getCssValue("font-weight").equals("bold")) {
			System.out.println("Successfully posted in bold!");
		}
		
		Thread.sleep(1000);
		
		newPost.click();
		content.clear();
		title.sendKeys("Test Title");
		content.click();
		driver.findElement(By.id("italicBtn")).click();
		content.click();
		content.sendKeys("Test announcement content in ITALIC");
		submit.click();
		
		System.out.println("FONT WEIGHT" + driver.findElement(By.xpath("//*[@id='announcement-module']/div[3]")).getCssValue("font-weight"));
		
		if(driver.findElement(By.xpath("//*[@id='announcement-module']/div[3]")).getText().equals(realContent)) {
			System.out.println("Successfully posted in italics!");
		}
		
		Thread.sleep(1000);
		
		newPost.click();
		content.clear();
		
		title.sendKeys("Test Title");
		content.click();
		driver.findElement(By.id("ulineBtn")).click();
		content.click();
		content.sendKeys("Test announcement content in UNDERLINE.");
		submit.click();
		
		if(driver.findElement(By.xpath("//*[@id='announcement-module']/div[3]")).getText().equals(realContent)) {
			System.out.println("Successfully posted in italics!");
		}
		
		Thread.sleep(1000);
		
		driver.quit();
	}
}
