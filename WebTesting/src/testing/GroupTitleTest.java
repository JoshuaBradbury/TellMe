package testing;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class GroupTitleTest {

    public static void main(String[] args) throws InterruptedException{
        // declaration and instantiation of objects/variables
    	System.setProperty("webdriver.chrome.driver", "/chromedriver/chromedriver");
		WebDriver driver = new ChromeDriver();
		driver.get("https://tellmesite.newagedev.co.uk/");
		
		//browser waits so kings login can be manually input
		Thread.sleep(10000);
		
		//refreshes page once logged in
		driver.navigate().refresh();
		Thread.sleep(1000);

		
		//grabs the first module in the list on the sidebar
        String expectedGroupTitle = driver.findElement(By.xpath("//*[@id=\"groupList\"]/li[2]")).getText();
        String actualGroupTitle = "";
		Thread.sleep(1000);
			
        //selects group from sidebar
		driver.findElement(By.xpath("//*[@id=\"groupList\"]/li[2]")).click();
		System.out.println("Going into module " + expectedGroupTitle + "...");
		Thread.sleep(1000);
		
		//retrieves title of module page
        actualGroupTitle = driver.findElement(By.id("title")).getText();
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