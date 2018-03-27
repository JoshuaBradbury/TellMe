package testing;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class GroupTitleTest {

    public static void main(String[] args) throws InterruptedException{
        // declaration and instantiation of objects/variables
    	System.setProperty("webdriver.chrome.driver", "/home/k1631285/git/tellMe/WebTesting/src/testing/chromedriver/chromedriver");
		WebDriver driver = new ChromeDriver();
		driver.get("https://tellmesite.newagedev.co.uk/");
    	
        String expectedGroupTitle = "n5AAH2003";
        String actualGroupTitle = "";
		Thread.sleep(1000);
		System.setProperty("webdriver.chrome.driver", "/home/k1631285/git/tellMe/WebTesting/src/testing/chromedriver/chromedriver");
		
        //Selects group from sidebar
		driver.findElement(By.xpath("//*[@id=\"module-name\"][contains(text(), \""+ expectedGroupTitle +"\")]")).click();
		System.out.println("Going into module n5AAH2003...");
		Thread.sleep(1000);
		
        WebElement groupTitle = driver.findElement(By.id("title-text"));
        actualGroupTitle = groupTitle.getText();
        System.out.println("Retrieving title...");
		Thread.sleep(1000);
        
        //compares the group title with the expected title and passes the result of the test
        if (actualGroupTitle.contentEquals(expectedGroupTitle)){
            System.out.println("Test Passed! The group title matches the expected title: \"" + expectedGroupTitle + "\"."); 
        } else {
            System.out.println("Test Failed! The group title: \"" + actualGroupTitle + "\" does not match the expected title: \"" + expectedGroupTitle + "\".");
        }
		Thread.sleep(1000);
		
        //close chrome
        driver.close();  
    }

}