package testing;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class CreateGroupTest {
	
    public static void main(String[] args) throws InterruptedException{
        // declaration and instantiation of objects/variables
		System.setProperty("webdriver.chrome.driver", "/chromedriver/chromedriver");
		WebDriver driver = new ChromeDriver();
		driver.get("https://tellmesite.newagedev.co.uk/");
		
		//browser waits so kings login can be manually input
		Thread.sleep(10000);
		
		//refreshes page once logged in
		driver.navigate().refresh();
		
		//click on new group button
		driver.findElement(By.xpath("//*[@id=\"newGroupBtn\"]")).click();
		System.out.println("Creating new group...");
		Thread.sleep(1000);
		
		//clicks on group name
		String testGroup = "Test Create Group";
		WebElement groupNameField = driver.findElement(By.xpath("//*[@id=\"newGroupName\"]"));
		groupNameField.sendKeys(testGroup);
		System.out.println("Adding name to new group...");
		Thread.sleep(1000);
		
		//uploads test student csv file
	    WebElement chooseFile = driver.findElement(By.id("newGroupFile"));
	    chooseFile.sendKeys("TestStudentlist.csv");
		System.out.println("Uploading student list...");
		Thread.sleep(1000);
		
		//clicks on create group button
		driver.findElement(By.xpath("//*[@id=\"newGroup\"]/div/center/input")).click();
		System.out.println("Creating Group...");
		Thread.sleep(1000);
		
		//grabs list of existing groups
		String listOfGroups = driver.findElement(By.xpath("//*[@id=\"right\"]")).getText();
		
		
		//checks if the list of group contains the group just added and prints the result of the test	
		if (listOfGroups.contains(testGroup)){
            System.out.println("Test Passed! The test group: \"" + testGroup + "\" was added."); 
        } else {
            System.out.println("Test Failed! The test group: \"" + testGroup + "\" was not added.");
        }
		Thread.sleep(1000);
		
        //close chrome
        driver.close(); 
		
    }
	
	
	
	

}
