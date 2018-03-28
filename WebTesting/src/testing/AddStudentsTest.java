package testing;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

public class AddStudentsTest {

    public static void main(String[] args) throws InterruptedException{
        // declaration and instantiation of objects/variables
    	System.setProperty("webdriver.chrome.driver", "/home/k1631285/git/tellMe/WebTesting/src/testing/chromedriver/chromedriver");
		WebDriver driver = new ChromeDriver();
		driver.get("https://tellmesite.newagedev.co.uk/");
		
		String testGroup = "5sAAH2002";

		//click on module, go to its settings
		driver.findElement(By.xpath("//*[@id=\"module-name\"][contains(text(), \""+ testGroup +"\")]")).click();
		System.out.println("Selecting Group...");
		Thread.sleep(1000);
		
		//Clicks on settings
		driver.findElement(By.xpath("//*[@id=\"settingsBtn\"]")).click();
		System.out.println("Going into settings...");		
		Thread.sleep(1000);
		
		//Enters group name 
		driver.findElement(By.xpath("//*[@id=\"settingsName\"]")).sendKeys("fillerForTestToWorkAtm");
		Thread.sleep(1000);
		
		//Clicks on choose file
	    WebElement chooseFile = driver.findElement(By.id("settingsFile"));
	    chooseFile.sendKeys("/home/k1631285/git/tellMe/WebTesting/src/testing/TestStudentlist.csv");
		System.out.println("Uploading student list...");
		Thread.sleep(1000);
		
		//clicks on save settings
		driver.findElement(By.xpath("//*[@id=\"settings\"]/div/center/input[1]")).click();
		System.out.println("Saving settings...");
		Thread.sleep(1000);
		
        //TODO get list of students to compare !
		String studentList = "/home/k1631285/git/tellMe/WebTesting/src/testing/TestStudentlist.csv";
		
		System.out.println(studentList);
		String listOfStudents = driver.findElement(By.xpath("//*[@id=\"left\"]")).getText();
		
		//check for new group within group list
		if (listOfStudents.contains(studentList)){
            System.out.println("Test Passed! The test students were added to the group."); 
		} else {
			System.out.println("Test Failed! The test students were not added.");
        }

        //close chrome
        driver.close();  
    }
}

