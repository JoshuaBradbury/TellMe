//
//  Networking.swift
//  TellMe
//
//  Created by DevUse on 07/03/2018.
//  Copyright © 2018 Sophia Kalanovska. All rights reserved.
//

import Foundation
import MSAL

class MSALHandler {
    
    let kClientID = "e1d4c8a0-0063-44ea-baaf-496d6843fed2"
    let kAuthority = "https://login.microsoftonline.com/organizations/v2.0"
    
    let kGraphURI = "https://graph.microsoft.com/v1.0/me/"
    let kScopes: [String] = ["https://graph.microsoft.com/user.read"]
    
    var accessToken = String()
    var applicationContext = MSALPublicClientApplication.init()
    
    init() {
        
        do {
            // Initialize a MSALPublicClientApplication with a given clientID and authority
            self.applicationContext = try MSALPublicClientApplication.init(clientId: kClientID, authority: kAuthority)
            
        } catch {
            //            self.loggingText.text = "Unable to create Application Context. Error: \(error)"
        }
    }
    
    func login() {
        
        do {
            
            // We check to see if we have a current logged in user. If we don't, then we need to sign someone in.
            // We throw an interactionRequired so that we trigger the interactive signin.
            
            if  try self.applicationContext.users().isEmpty {
                throw NSError.init(domain: "MSALErrorDomain", code: MSALErrorCode.interactionRequired.rawValue, userInfo: nil)
            } else {
                
                // Acquire a token for an existing user silently
                
                try self.applicationContext.acquireTokenSilent(forScopes: self.kScopes, user: applicationContext.users().first) { (result, error) in
                    if error == nil {
                        self.accessToken = (result?.accessToken)!
                        DispatchQueue.main.async { // Correct
                            
                        }
                        
                        
                        self.getContentWithToken()
                        
                    } else {
                        DispatchQueue.main.async { //Correct
                            
                        }
                    }
                }
            }
        }  catch let error as NSError {
            
            // interactionRequired means we need to ask the user to sign-in. This usually happens
            // when the user's Refresh Token is expired or if the user has changed their password
            // among other possible reasons.
            
            if error.code == MSALErrorCode.interactionRequired.rawValue {
                
                do {
                    try self.applicationContext.acquireToken(forScopes: self.kScopes, user: applicationContext.users().first, uiBehavior: .MSALForceLogin, extraQueryParameters: ["domain_hint":"kcl.ac.uk"], completionBlock:{
                        (result: MSALResult?, error: Error?) in
                        if let result = result {
                            self.accessToken = (result.accessToken)!
                            self.getContentWithToken()
                            
                        }
                        else {
                            //
                        }
                    })
                } catch let error {

                }
                
            }
            
        } catch {
            
            // This is the catch all error.
            
        }
    }
    
    func getContentWithToken() {
        
        let sessionConfig = URLSessionConfiguration.default
        
        // Specify the Graph API endpoint
        let url = URL(string: kGraphURI)
        var request = URLRequest(url: url!)
        
        // Set the Authorization header for the request. We use Bearer tokens, so we specify Bearer + the token we got from the result
        request.setValue("Bearer \(self.accessToken)", forHTTPHeaderField: "Authorization")
        let urlSession = URLSession(configuration: sessionConfig, delegate: self as? URLSessionDelegate, delegateQueue: OperationQueue.main)
        
        urlSession.dataTask(with: request) { data, response, error in
            let result = try? JSONSerialization.jsonObject(with: data!, options: [])
            if result != nil {

            }
        }.resume()
    }
}
