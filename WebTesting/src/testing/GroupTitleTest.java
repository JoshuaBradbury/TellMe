package webTesting;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
//import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class GroupTitleTest {

    public static void main(String[] args) {
        // declaration and instantiation of objects/variables
		System.setProperty("webdriver.chrome.driver","/Applications/chromedriver");
		WebDriver driver = new ChromeDriver();
		driver.manage().timeouts().implicitlyWait(20, TimeUnit.SECONDS);
		TellMe tellMe = new TellMe(driver);
    	
        String expectedGroupTitle = "sd5AAH2001";
        String actualGroupTitle = "";

	//	driver.findElement(By.xpath("//*[@id=\"module-name\"]")).click();	 
    //    System.out.println("Selecting Group...");
		
        WebElement groupTitle = driver.findElement(By.id("title-text"));
        actualGroupTitle = groupTitle.getText();
        System.out.println("Retrieving title...");
        
        //compares the group title with the expected title and passes the result of the test
        if (actualGroupTitle.contentEquals(expectedGroupTitle)){
            System.out.println("Test Passed! The group title matches the expected title: \"" + expectedGroupTitle + "\"."); 
        } else {
            System.out.println("Test Failed! The group title: \"" + actualGroupTitle + "\" does not match the expected title: \"" + expectedGroupTitle + "\".");
        }
        
        //close chrome
        driver.close();  
    }

}