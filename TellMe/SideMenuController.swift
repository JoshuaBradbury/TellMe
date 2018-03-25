//
//  SideMenueController.swift
//  TellMe
//
//  Created by DevUse on 18/03/2018.
//  Copyright © 2018 Sophia Kalanovska. All rights reserved.
//

import UIKit
import SideMenu

protocol SideMenuHandlerDelegate: class {
    func change()
}

class SideMenuController: UIViewController,  UITableViewDelegate, UITableViewDataSource {
    
    weak var delegate: SideMenuHandlerDelegate?
    
    private func notify(){
        
        delegate?.change()
    }
   
    
    @IBOutlet weak var sideMenuTableView: UITableView!
    let groupNames = ["5CCS2OSC", "5CCS2SEG", "5CCS2PLD"]
    
    override func viewDidLoad() {
        super.viewDidLoad()
        print("I am in sideMenuController")
        navigationController?.setNavigationBarHidden(true, animated: true)
        
        sideMenuTableView.delegate = self
        sideMenuTableView.dataSource = self
        
        sideMenuTableView.register(UINib(nibName: "SideMenuCell", bundle: nil), forCellReuseIdentifier: "sideMenuCell")

        sideMenuTableView.separatorStyle = .none
        
    }
    

    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 3
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "sideMenuCell", for: indexPath) as! SideMenuCell
        
        cell.messageBody.text = groupNames[indexPath.row]
        
        return cell
        
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        //TODO: finish the contents of the announcementTableView
        
        tableView.deselectRow(at: indexPath, animated: false)
        print(indexPath.row)
    }

    @IBAction func logOutPressed(_ sender: UIButton) {
        
        print ("the button was pressed")
        MSALHandler.shared.signoutButton(sender)
        self.performSegue(withIdentifier: "loginV", sender: self)
        self.dismiss(animated: false, completion: nil)
    
    }
        
}
