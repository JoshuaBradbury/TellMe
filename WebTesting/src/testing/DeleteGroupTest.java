package testing;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class DeleteGroupTest {

    public static void main(String[] args) throws InterruptedException{
        // declaration and instantiation of objects/variables
    	System.setProperty("webdriver.chrome.driver", "/chromedriver/chromedriver");
		WebDriver driver = new ChromeDriver();
		driver.get("https://tellmesite.newagedev.co.uk/");
		
		//browser waits so kings login can be manually input
		Thread.sleep(10000);		
		
		//click on new group button
		driver.findElement(By.xpath("//*[@id=\"newGroupBtn\"]")).click();
		System.out.println("Creating new group...");
		Thread.sleep(1000);
		
		//clicks on group name
		String testGroup = "Test Delete Group";
		WebElement groupNameField = driver.findElement(By.xpath("//*[@id=\"newGroupName\"]"));
		groupNameField.sendKeys(testGroup);
		System.out.println("Adding name to new group...");
		Thread.sleep(1000);
		
		//uploads test student csv file
	    WebElement chooseFile = driver.findElement(By.id("newGroupFile"));
	    chooseFile.sendKeys("/home/k1631285/git/tellMe/WebTesting/src/testing/TestStudentlist.csv");
		System.out.println("Uploading student list...");
		Thread.sleep(1000);
		
		//clicks on create group button
		driver.findElement(By.xpath("//*[@id=\"newGroup\"]/div/center/input")).click();
		System.out.println("Creating Group...");
		Thread.sleep(1000);
		
		//click on module, go to its settings
		driver.findElement(By.xpath("//*[@id=\"groupList\"]/li[1]")).click();
		System.out.println("Selecting first group...");
		Thread.sleep(1000);
		
		//Clicks on settings
		driver.findElement(By.xpath("//*[@id=\"settingsBtn\"]")).click();
		System.out.println("Going into settings...");
		Thread.sleep(1000);
		
		//clicks on delete button and OK on the popup alert
		driver.findElement(By.xpath("//*[@id=\"settings\"]/div/center/input[2]")).click();
		driver.switchTo().alert().accept();
		System.out.println("Deleting group...");
		Thread.sleep(1000);
		
		//grabs list of groups on sidebar
		String listOfGroups = driver.findElement(By.xpath("//*[@id=\"right\"]")).getText();
		
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
