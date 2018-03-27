package testing;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class AddStudentsTest {
	
	//NOTE !!! need to do cases such as invalid names or things

    public static void main(String[] args) throws InterruptedException{
        // declaration and instantiation of objects/variables
		System.setProperty("webdriver.chrome.driver", "/chromedriver/chromedriver");
		WebDriver driver = new ChromeDriver();
		driver.get("https://tellmesite.newagedev.co.uk/");
		
		String testGroup = "sd5AAH2001";
		
		//click on module, go to its settings
		driver.findElement(By.xpath("//*[@id=\"module-name\"][contains(text(), \""+ testGroup +"\")]")).click();
		System.out.println("Selecting Group...");
		Thread.sleep(1000);
		
		//Clicks on settings
		driver.findElement(By.xpath("//*[@id=\"settings\"]")).click();
		System.out.println("Going into settings...");		
		Thread.sleep(1000);
		
		//Clicks on Choose File
		System.out.println(driver.findElement(By.xpath("//*[@id=\"settingsFile\"]")).getText());

		//.sendKeys("/home/k1631285/git/tellMe/WebTesting/src/testing/testStudentlist.csv");	
			Thread.sleep(1000);
	
		driver.findElement(By.className("btn")).click();
		System.out.println("Uploading student file...");
		Thread.sleep(1000);
		
		//.sendKeys("/home/k1631285/git/tellMe/WebTesting/src/testing/testStudentlist.csv")
		
		//refresh browser
		driver.navigate().refresh();
		
		//check for new group within group list
   //    if (driver.findElements(By.className("menu-box-tab")).contains(testGroup)){
   //         System.out.println("Test Passed! The test students were 		driver.findEleme.sendKeys("/home/k1631285/git/tellMe/WebTesting/src/testing/testStudentlist.csv")nt(By.name("btn")).click();		driver.findElement(By.name("btn")).click();added to the group."); 
   //     } else {
   //         System.out.println("Test Failed! The test students were not added.");
 //       }
	//	
        //close chrome
        driver.close();  
    }
}//ADDFILE TODO

