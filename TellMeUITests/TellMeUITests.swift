//
//  TellMeUITests.swift
//  TellMeUITests
//
//  Created by Sophia on 19.02.18.
//  Copyright © 2018 Sophia Kalanovska. All rights reserved.
//

import XCTest
import UIKit
@testable import TellMe

class TellMeUITests: XCTestCase {
        
    override func setUp() {
        super.setUp()
        
        // Put setup code here. This method is called before the invocation of each test method in the class.
        
        // In UI tests it is usually best to stop immediately when a failure occurs.
        continueAfterFailure = false
        // UI tests must launch the application that they test. Doing this in setup will make sure it happens for each test method.
        XCUIApplication().launch()
//        MSGraphClient.setAuthenticationProvider(testAuthProvider())
//        graphClient = MSGraphClient.defaultClient()

        // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
    }
    
    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }
    
    func testExample() {
        //testing announcment UI
        let app = XCUIApplication()
        let tablesQuery = app.tables
        
        //testing scrolling
        tablesQuery.children(matching: .cell).element(boundBy: 2).staticTexts["WOW THIS IS LIKE TOTALLY AN ANNOUNCEMENT! HOW DID WE GET HERE?"].swipeUp()
        tablesQuery.children(matching: .cell).element(boundBy: 5).staticTexts["Loagsbvas adf af adf afadf afa fad fa afafafad adfadfad adfadf af fad adf fadafdadf a faads suscipit nec."].swipeUp()
        tablesQuery.children(matching: .cell).element(boundBy: 10).staticTexts["Loagsbvas adf af adf afadf afa fad fa afafafad adfadfad adfadf af fad adf fadafdadf a faads suscipit nec."].swipeUp()
        tablesQuery.children(matching: .cell).element(boundBy: 14).staticTexts["Loagsbvas adf af adf afadf afa fad fa afafafad adfadfad adfadf af fad adf fadafdadf a faads suscipit nec."].swipeUp()
        tablesQuery.children(matching: .cell).element(boundBy: 13).staticTexts["Loagsbvas adf af adf afadf afa fad fa afafafad adfadfad adfadf af fad adf fadafdadf a faads suscipit nec."].swipeUp()
        
        //testing side menu
       let menuButton = app.buttons["Menu"]
       menuButton.tap()
        //testing module selection
        tablesQuery/*@START_MENU_TOKEN@*/.staticTexts["5CCS2OSD"]/*[[".cells.staticTexts[\"5CCS2OSD\"]",".staticTexts[\"5CCS2OSD\"]"],[[[-1,1],[-1,0]]],[0]]@END_MENU_TOKEN@*/.tap()
        
        let element = app.children(matching: .window).element(boundBy: 0).children(matching: .other).element
        element.children(matching: .other).element(boundBy: 3).tap()
        menuButton.tap()
        //testing logout
        app.buttons["Log Out"].tap()
        //tsting redirection to kcl domain
        element.children(matching: .other).element.children(matching: .other).element.children(matching: .other).element.tap()

    }
    
    
    
    func testLogin(){
        
        
    }
}
