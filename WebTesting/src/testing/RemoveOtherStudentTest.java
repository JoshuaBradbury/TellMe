package webTesting;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class RemoveOtherStudentTest {

    public static void main(String[] args) {
        // declaration and instantiation of objects/variables
    		System.setProperty("webdriver.chrome.driver","/Applications/chromedriver");
		WebDriver driver = new ChromeDriver();
		TellMe tellMe = new TellMe(driver);
		
		//grabs first student on list and list of current students 
		String studentToDelete = driver.findElement(By.xpath("//*[@id=\"student-name\"][contains(text(), \"Yano\")]")).getText();
		String listOfCurrentStudents = driver.findElement(By.xpath("//*[@id=\"left\"]")).getText();
		
		//clicks on first student
		driver.findElement(By.xpath("//*[@id=\"student-name\"][contains(text(), \"Yano\")]")).click();
		System.out.println("Selecting Student...");
		
		//clicks OK on the alert that pops up
		driver.switchTo().alert().accept();
		System.out.println("Removing Student...");
		
		//checks if the list of students contains the student just deleted and prints the result of the test
		if(listOfCurrentStudents.contains(studentToDelete)) {
				System.out.println("Test Passed! The student \"" + studentToDelete + "\" was deleted."); 
	        } else {
	        		System.out.println("Test Failed! The student \"" + studentToDelete + "\" was not deleted."); 
		    }
        //close chrome
        //driver.close();
    }
}

