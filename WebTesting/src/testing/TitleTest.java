package testing;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class TitleTest {

    public static void main(String[] args) throws InterruptedException{
        // declaration and instantiation of objects/variables
		System.setProperty("webdriver.chrome.driver", "/home/k1631285/git/tellMe/WebTesting/src/testing/chromedriver/chromedriver");
		WebDriver driver = new ChromeDriver();
		driver.get("https://tellmesite.newagedev.co.uk/");
    	
        String expectedTitle = "Tell Me";
        String actualTitle = "";
		Thread.sleep(1000);

		// retrieve the actual the title
		actualTitle = driver.getTitle();


		//compares the actual title with the expected title
		if (actualTitle.contentEquals(expectedTitle)){
			System.out.println("Test Passed! The website title matches the expected title: \"" + expectedTitle + "\"."); 
		} else {
			System.out.println("Test Failed! The website title: \"" + actualTitle + "\" does not match the expected title: \"" + expectedTitle + "\".");
		}
		       
		//close chrome
		driver.close();
	}

 }

