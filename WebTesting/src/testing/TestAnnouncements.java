package testing;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class TestAnnouncements {

	public static void main(String[] args) throws InterruptedException {
    // declaration and instantiation of objects/variables
		System.setProperty("webdriver.chrome.driver", "/chromedriver/chromedriver");
		WebDriver driver = new ChromeDriver();
		driver.get("https://tellmesite.newagedev.co.uk/");

		//stores elements
		String testContent = "Test announcement content.";
		WebElement newPost = driver.findElement(By.id("postBtn"));
		WebElement content = driver.findElement(By.id("text"));
		WebElement title = driver.findElement(By.id("titleBtn"));
		WebElement submit = driver.findElement(By.id("submitBtn"));

		//fills in text for announcement and submits
		driver.findElement(By.id("postBtn")).click();
		title.sendKeys("Test Title");
		content.sendKeys("Test announcement content.");
		submit.click();

		//check the post shows
		if(driver.findElement(driver.findElement(By.xpath("//*[@id=\"announcements\"][contains(text(), \""+ testContent +"\")]")))) {
			System.out.println("Test Success");
		} else {
			System.out.println("Test Failed");
		}

		driver.close();
	}
}
