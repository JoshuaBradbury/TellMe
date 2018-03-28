//
//  LaunchViewController.swift
//  TellMe
//
//  Created by Sophia Kalanovska on 20/03/2018.
//  Copyright © 2018 Sophia Kalanovska. All rights reserved.
//

import UIKit

class LaunchViewController: UIViewController, MSALHandlerDelegate {
    
    override func viewDidLoad() {
        super.viewDidLoad()
        print("I am in myLaunch")
       
    }

    override func viewDidAppear(_ animated : Bool){
        super.viewDidAppear(false)

        MSALHandler.shared.delegate = self
        MSALHandler.shared.login()
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
        
        
    }
    
    func update() {
                self.performSegue(withIdentifier: "login", sender: self)
                // performSegue(withIdentifier: "login", sender: nil)
                self.dismiss(animated: false, completion: nil)
    }
    

    /*
    // MARK: - Navigation

    // In a storyboard-based application, you will often want to do a little preparation before navigation
    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
        // Get the new view controller using segue.destinationViewController.
        // Pass the selected object to the new view controller.
    }
    */

}
