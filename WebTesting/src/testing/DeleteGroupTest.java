package webTesting;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class DeleteGroupTest {

    public static void main(String[] args) {
        // declaration and instantiation of objects/variables
    		System.setProperty("webdriver.chrome.driver","/Applications/chromedriver");
		WebDriver driver = new ChromeDriver();
		TellMe tellMe = new TellMe(driver);
		String testGroup = "5sAAH2002";
        
		System.out.println(driver.findElement(By.xpath("//*[@id=\"right\"]")).getText());
	//	System.out.println(driver.findElement(By.xpath("//*[@id=\"module-name\"]")).getText());
		//[contains(text(), \""+ testGroup +"\")]
		
		
		
		//click on module, go to its settings
		driver.findElement(By.xpath("//*[@id=\"module-name\"][contains(text(), \""+ testGroup +"\")]")).click();
        System.out.println("Selecting Group...");
		driver.findElement(By.id("settingscontainer")).click();
		System.out.println("Going into settings...");
		
		driver.findElement(By.className("deleteBtn")).click();
		System.out.println("Deleting group...");
		
        //checks if the list of group contains the group just deleted and prints the result of the test
		
	//	if (!driver.findElements(By.className("menu-box-tab")).contains(testGroup)){
   //         System.out.println("Test Passed! The test group was deleted."); 
   //     } else {
   //         System.out.println("Test Failed! The group was not deleted.");
   //     }
		
    }
}
