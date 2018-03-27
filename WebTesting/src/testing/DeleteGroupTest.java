package testing;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class DeleteGroupTest {

    public static void main(String[] args) throws InterruptedException{
        // declaration and instantiation of objects/variables
		System.setProperty("webdriver.chrome.driver", "/home/k1631285/git/tellMe/WebTesting/chromedriver/chromedriver");
		WebDriver driver = new ChromeDriver();
		driver.get("https://tellmesite.newagedev.co.uk/");
		
		String testGroup = "5AAHf2008";
		String listOfGroups = driver.findElement(By.xpath("//*[@id=\"right\"]")).getText();
		Thread.sleep(1000);
		
		//click on module, go to its settings
		driver.findElement(By.xpath("//*[@id=\"module-name\"][contains(text(), \""+ testGroup +"\")]")).click();
		System.out.println("Selecting Group...");
		Thread.sleep(1000);
		
		//Clicks on settings
		driver.findElement(By.xpath("//*[@id=\"settings\"]")).click();
		System.out.println("Going into settings...");
		Thread.sleep(1000);
		
		driver.findElement(By.xpath("//*[@id=\"settingscontainer\"]/div/center/input[2]")).click();
		System.out.println("Deleting group...");
		Thread.sleep(1000);
		
		//checks if the list of group contains the group just deleted and prints the result of the test	
		if (!listOfGroups.contains(testGroup)){
            System.out.println("Test Passed! The test group was deleted."); 
        } else {
            System.out.println("Test Failed! The group was not deleted.");
        }
        //close chrome
        driver.close(); 
		
    }
}
