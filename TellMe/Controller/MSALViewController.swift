//
//  MSALViewController.swift
//  TellMe
//
//  Created by DevUse on 18/03/2018.
//  Copyright © 2018 Sophia Kalanovska. All rights reserved.
//

import UIKit

class MSALViewController: UIViewController {
    
    let msalHandler = MSALHandler()
    
    override func viewDidLoad() {
        super.viewDidLoad()
        msalHandler.login()

        // Do any additional setup after loading the view.
    }

}
