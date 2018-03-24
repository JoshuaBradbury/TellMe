//
//  SideMenueController.swift
//  TellMe
//
//  Created by DevUse on 18/03/2018.
//  Copyright © 2018 Sophia Kalanovska. All rights reserved.
//

import UIKit
import SideMenu

class SideMenuController: UIViewController,  UITableViewDelegate, UITableViewDataSource {

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
        return groupNames.count
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "sideMenuCell", for: indexPath) as! SideMenuCell
        
        cell.messageBody.text = groupNames[indexPath.row]
        
        return cell
        
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        //TODO: finish the contents of the announcementTableView
        
        tableView.deselectRow(at: indexPath, animated: false)
        APIFetcher.fetchGroups { [weak self] (groups) in
            
            for group in groups {
                print(group)
            }
        }
    }

    @IBAction func logOutPressed(_ sender: UIButton) {
        
        print ("the button was pressed")
       // MSALHandler.shared.signoutButton(sender)
        
        do {
            
            // Removes all tokens from the cache for this application for the provided user
            // first parameter:   The user to remove from the cache
           // try print (MSALHandler.applicationContext.users())
            try MSALHandler.applicationContext.remove(MSALHandler.applicationContext.users().first)
            sender.isEnabled = false;
            
            
           // try print (MSALHandler.applicationContext.users())
            
        } catch _ {
            print("I am getting an error when I log out")
        }
        self.performSegue(withIdentifier: "loginV", sender: self)
        self.dismiss(animated: false, completion: nil)
        
        
//        let storyboard = UIStoryboard(name: "LaunchScreen", bundle: nil)
//        let vc = storyboard.instantiateViewController(withIdentifier: "Launch") as UIViewController
//        present(vc, animated: true, completion: nil)
 
//        let rootController = UIStoryboard(name: "LaunchScreen", bundle: Bundle.main).instantiateViewController(withIdentifier: "WelcomeNavigation")
//        self.window?.rootViewController = rootController
        
    }

//    override func prepare(for segue: UIStoryboardSegue, sender: Any?) {
//        if let launchVC = segue.destination as? LaunchViewController {
//            launchVC.msalHandler = self.msalHandler
//        }
//    }
}
