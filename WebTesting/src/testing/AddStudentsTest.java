package webTesting;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
//import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class AddStudentsTest {
	
	//NOTE !!! need to do cases such as invalid names or things

    public static void main(String[] args) {
        // declaration and instantiation of objects/variables
    		System.setProperty("webdriver.chrome.driver","/Applications/chromedriver");
		WebDriver driver = new ChromeDriver();
		TellMe tellMe = new TellMe(driver);
		
		//click on module, go to its settings
		driver.findElement(By.linkText("5sAAH2002")).click();	 
        System.out.println("Selecting Group...");
		driver.findElement(By.id("settingscontainer")).click();
		
		driver.findElement(By.id("filename")).sendKeys("<absolutePathToMyFile>");	//ADDFILE TODO
		driver.findElement(By.name("btn")).click();
		
		//refresh browser
		driver.navigate().refresh();
		
		//check for new group within group list
   //    if (driver.findElements(By.className("menu-box-tab")).contains(testGroup)){
   //         System.out.println("Test Passed! The test students were added to the group."); 
   //     } else {
   //         System.out.println("Test Failed! The test students were not added.");
 //       }
	//	
        //close chrome
        driver.close();  
    }
}

