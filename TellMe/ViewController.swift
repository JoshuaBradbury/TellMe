//
//  ViewController.swift
//  TellMe
//x
//  Created by Sophia on 19.02.18.
//  Copyright © 2018 Sophia Kalanovska. All rights reserved.
//

import UIKit

class ViewController: UIViewController, UITextFieldDelegate {
    
    let msalHandler = MSALHandler()
    
    override func viewDidAppear(_ animated: Bool) {
        msalHandler.login()
        
    }
    
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
    }

    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewWillAppear(_ animated: Bool) {

        
    }
}
