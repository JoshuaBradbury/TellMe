//
//  Networking.swift
//  TellMe
//
//  Created by DevUse on 07/03/2018.
//  Copyright © 2018 Sophia Kalanovska. All rights reserved.
//

import Foundation
import MSAL

protocol MSALHandlerDelegate: class {
    func update()
}

class MSALHandler {
    
    weak var delegate: MSALHandlerDelegate?
    static var userName:String?
    
    static func getUsername() -> String {
        
        if let username = userName {
            return username
        }
        
        return " "
    }
    
    private func notify(){
        
        delegate?.update()
    }

    let kClientID = "e1d4c8a0-0063-44ea-baaf-496d6843fed2"
    let kAuthority = "https://login.microsoftonline.com/organizations/v2.0"
    
    let kGraphURI = "https://graph.microsoft.com/v1.0/me/"
    let kScopes: [String] = ["https://graph.microsoft.com/user.read"]
    
    var accessToken = String()
    
    static var shared = MSALHandler()
    
    static var applicationContext = MSALPublicClientApplication.init()
    
    
    private init() {
        
        do {
            // Initialize a MSALPublicClientApplication with a given clientID and authority
            MSALHandler.applicationContext = try MSALPublicClientApplication.init(clientId: kClientID, authority: kAuthority)
            
        } catch {
            // self.loggingText.text = "Unable to create Application Context. Error: \(error)"
        }
    }
    
    
    func login() {
        print("I am in login ")
        do {
            
            if  try MSALHandler.applicationContext.users().isEmpty {
                throw NSError.init(domain: "MSALErrorDomain", code: MSALErrorCode.interactionRequired.rawValue, userInfo: nil)
            } else {
                // Acquire a token for an existing user silently
                getTokenFromExistingUser()
                
            }
        }  catch let error as NSError {
            // interactionRequired means we need to ask the user to sign-in.
            print("asktheusertosign")
            askUserToSignIn(errorCode: error.code)
            
        }
    }
    
   
    private func getTokenFromExistingUser(){
        do{
            
            try MSALHandler.applicationContext.acquireTokenSilent(forScopes: self.kScopes, user: MSALHandler.applicationContext.users().first) { (result, error) in
            if error == nil {
                self.accessToken = (result?.accessToken)!
                self.getContentWithToken()
                self.notify()
            }
        }
        }catch{
            print("I check if the applicationContext.users() is not empty, so this should not happen \(error)")
        }
    }
    
    
    private func askUserToSignIn(errorCode : Int){
        
        if errorCode == MSALErrorCode.interactionRequired.rawValue {
            
            do {
                try MSALHandler.applicationContext.acquireToken(forScopes: self.kScopes, user: MSALHandler.applicationContext.users().first, uiBehavior: .MSALForceLogin, extraQueryParameters: ["domain_hint":"kcl.ac.uk"], completionBlock:{
                    (result: MSALResult?, error: Error?) in
                    if let result = result {
                        self.accessToken = (result.accessToken)!
                        self.getContentWithToken()
                        self.notify()
                    }else{
                        self.getTokenFromExistingUser()
                    }
                })
            } catch _ {
               print("User not found")
            }
        }
    }
    
    
    private func getContentWithToken() {
        
        let sessionConfig = URLSessionConfiguration.default
        print("get the content with token")
        // Specify the Graph API endpoint
        let url = URL(string: kGraphURI)
        var request = URLRequest(url: url!)
        
        // Set the Authorization header for the request. We use Bearer tokens, so we specify Bearer + the token we got from the result
        request.setValue("Bearer \(self.accessToken)", forHTTPHeaderField: "Authorization")
        let urlSession = URLSession(configuration: sessionConfig, delegate: self as? URLSessionDelegate, delegateQueue: OperationQueue.main)
        
        urlSession.dataTask(with: request) { data, response, error in
            let result = try? JSONSerialization.jsonObject(with: data!, options: [])
            if result != nil {
                if let response = result as? Dictionary<String,Any> {
                    MSALHandler.userName = response["userPrincipalName"] as? String
                    print(MSALHandler.userName!)
                    
                    SideMenuController.fetchGroups()
                    
                }
            }
            }.resume()
        
        
    }
 
    
    func signoutButton(_ sender: UIButton) {
        
        do {
            
            // Removes all tokens from the cache for this application for the provided user
            // first parameter:   The user to remove from the cache
            try print (MSALHandler.applicationContext.users())
            try MSALHandler.applicationContext.remove(MSALHandler.applicationContext.users().first)
            sender.isEnabled = false;
            
        
            try print (MSALHandler.applicationContext.users())
            
        } catch _ {
            print("I am getting an error when I log out")
        }
    }
    
}
