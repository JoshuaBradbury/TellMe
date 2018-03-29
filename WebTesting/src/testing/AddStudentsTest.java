package testing;

import java.io.IOException;
import java.util.ArrayList;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class AddStudentsTest {

    public static void main(String[] args) throws InterruptedException, IOException{
        // declaration and instantiation of objects/variables
    	System.setProperty("webdriver.chrome.driver", "/chromedriver/chromedriver");
		WebDriver driver = new ChromeDriver();
		driver.get("https://tellmesite.newagedev.co.uk/");

		//browser waits so kings login can be manually input
		Thread.sleep(10000);
		
		//refreshes page once logged in
		driver.navigate().refresh();
		
		//clicks on settings of first module
		Thread.sleep(1000);
		driver.findElement(By.xpath("//*[@id=\"settingsBtn\"]")).click();
		System.out.println("Going into settings...");		
		Thread.sleep(1000);
				
		//Clicks on choose file and adds more students to group
	    WebElement chooseFile = driver.findElement(By.id("settingsFile"));
	    chooseFile.sendKeys("/TestStudentlist.csv");
		System.out.println("Uploading student list...");
		Thread.sleep(1000);
		
		//clicks on save settings
		driver.findElement(By.xpath("//*[@id=\"settings\"]/div/center/input[1]")).click();
		System.out.println("Saving settings...");
		Thread.sleep(1000);
		
		//list of students in the csv file and list of students in the group
		ArrayList<String> studentList = new ArrayList<String>();
		studentList.add("k1631485");
		studentList.add("k1631289");
		studentList.add("k1631288");
		studentList.add("k1734855");
		String listOfStudents = driver.findElement(By.xpath("//*[@id=\"left\"]")).getText();
	
		//check for new group within group list
		
		if (listOfStudents.contains(studentList.get(0)) && listOfStudents.contains(studentList.get(1)) && listOfStudents.contains(studentList.get(2)) && listOfStudents.contains(studentList.get(3))){
            System.out.println("Test Passed! The test students were added to the group."); 
		} else {
			System.out.println("Test Failed! The test students were not added.");
        }

        //close chrome
        driver.close();  
    }
}

