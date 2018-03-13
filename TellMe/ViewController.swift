//
//  ViewController.swift
//  TellMe
//x
//  Created by Sophia on 19.02.18.
//  Copyright © 2018 Sophia Kalanovska. All rights reserved.
//

import UIKit

class ViewController: UIViewController , UITableViewDelegate, UITableViewDataSource {

    let msalHandler = MSALHandler()
    @IBOutlet weak var announcementTableView: UITableView!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        announcementTableView.delegate = self
        announcementTableView.dataSource = self
        
    }
    
    override func viewDidAppear(_ animated: Bool) {
        msalHandler.login()
        
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        <#code#>
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        <#code#>
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewWillAppear(_ animated: Bool) {

        
    }
}
