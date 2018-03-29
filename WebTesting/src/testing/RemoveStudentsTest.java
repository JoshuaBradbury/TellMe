package testing;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class RemoveStudentsTest {

    public static void main(String[] args) throws InterruptedException{
        // declaration and instantiation of objects/variables
    	System.setProperty("webdriver.chrome.driver", "/home/k1631285/git/tellMe/WebTesting/src/testing/chromedriver/chromedriver");
		WebDriver driver = new ChromeDriver();
		driver.get("https://tellmesite.newagedev.co.uk/");
		
		//browser waits so kings login can be manually input
		Thread.sleep(10000);
		
		//refreshes page once logged in
		driver.navigate().refresh();

		//grabs first student on list and list of current students 
	//	String studentToDelete = driver.findElement(By.xpath("//*[@id=\"student-name0\"]")).getText();
		String listOfCurrentStudents = driver.findElement(By.xpath("//*[@id=\"left\"]/div[1]")).getText();
	//	Thread.sleep(1000);
		System.out.println(listOfCurrentStudents);
		//clicks on first student
		//driver.findElement(By.xpath("//*[@id=\"student-name0\"]"))[contains(text(),'k16')].click();
		System.out.println("Selecting First Student...");
		Thread.sleep(1000);
		
		//clicks OK on the alert that pops up
		driver.switchTo().alert().accept();
		System.out.println("Removing First Student...");
		Thread.sleep(2000);
		
		//checks if the list of students contains the student just deleted and prints the result of the test
	//	if(listOfCurrentStudents.contains(studentToDelete)) {
		//		System.out.println("Test Passed! The first student \"" + studentToDelete + "\" was deleted."); 
	   //     } else {
	   ///     	System.out.println("Test Failed! The first student \"" + studentToDelete + "\" was not deleted."); 
		//    }
	
		
		//selects second group group
		String secondTestGroup = driver.findElement(By.xpath("//*[@id=\"groupList\"]/li[2]")).getText();
		driver.findElement(By.xpath("//*[@id=\"groupList\"]/li[2]")).click();
		System.out.println("Going into second group...");
		Thread.sleep(1000);
		
		//grabs third student on list and list of current students 
		String secondStudentToDelete = driver.findElement(By.xpath("//*[@id=\"student-name2\"]")).getText();
		String secondListOfCurrentStudents = driver.findElement(By.xpath("//*[@id=\"left\"]")).getText();
		Thread.sleep(1000);
		
		//clicks on third student to remove
		driver.findElement(By.xpath("//*[@id=\"student-name2\"]")).click();
		System.out.println("Selecting Student...");
		Thread.sleep(1000);
		
		//clicks OK on the alert that pops up
		driver.switchTo().alert().accept();
		System.out.println("Removing Student...");
		Thread.sleep(1000);
		
		//checks if the list of students contains the student just deleted and prints the result of the test
		if(secondListOfCurrentStudents.contains(secondStudentToDelete)) {
				System.out.println("Test Passed! The student \"" + secondStudentToDelete + "\" from group \"" + secondTestGroup + "\" was deleted."); 
	        } else {
	        	System.out.println("Test Failed! The student \"" + secondStudentToDelete + "\" from group \"" + secondTestGroup + "\" was not deleted."); 
		    }
		
        //close chrome
        driver.close();
    }
}

