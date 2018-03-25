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
    func update()
}

class SideMenuController: UIViewController,  UITableViewDelegate, UITableViewDataSource {
    
    static weak var delegate: SideMenuHandlerDelegate?
    
    private func notify(){
        
        SideMenuController.delegate?.change()
    }
   
    
    @IBOutlet weak var sideMenuTableView: UITableView!
    static var groupList:Array<Group>?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        print("I am in sideMenuController")
        
        navigationController?.setNavigationBarHidden(true, animated: true)
        
        sideMenuTableView.delegate = self
        sideMenuTableView.dataSource = self
        
        sideMenuTableView.register(UINib(nibName: "SideMenuCell", bundle: nil), forCellReuseIdentifier: "sideMenuCell")

        sideMenuTableView.separatorStyle = .none
//        print(SideMenuController.groupList)
        
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        if let group = SideMenuController.groupList {
            
            return group.count
        }
        return 1
    }
    
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "sideMenuCell", for: indexPath) as! SideMenuCell
        
        if let group = SideMenuController.groupList {
            cell.messageBody.text = group[indexPath.row].groupName
        } else {
            cell.messageBody.text = MSALHandler.userName!
        }
        
        return cell
        
    }
    
    func tableView(_ tableView: UITableView, didSelectRowAt indexPath: IndexPath) {
        
        //TODO: finish the contents of the announcementTableView
        
        tableView.deselectRow(at: indexPath, animated: false)

        APIFetcher.fetchAnnouncements(groupId: indexPath.row + 1) { (announcements) in
            
            DispatchQueue.main.async {
                AnnouncementController.messageArray = announcements
                SideMenuController.delegate?.update()
            }
            
        }
    }
    
    static func fetchGroups(selectedgroupId: Int) {
        
        APIFetcher.fetchGroups { (groups) in
            
            SideMenuController.groupList = groups
            APIFetcher.fetchAnnouncements(groupId: selectedgroupId) { (announcements) in
                
                DispatchQueue.main.async {
                    AnnouncementController.messageArray = announcements
                    SideMenuController.delegate?.update()
                }
                
            }
        }
    }

    @IBAction func logOutPressed(_ sender: UIButton) {
        
        print ("the button was pressed")
        MSALHandler.shared.signoutButton(sender)
        self.performSegue(withIdentifier: "loginV", sender: self)
        self.dismiss(animated: false, completion: nil)
    
    }
        
}
