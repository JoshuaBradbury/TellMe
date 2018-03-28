//
//  ViewController.swift
//  TellMe
//x
//  Created by Sophia on 19.02.18.
//  Copyright © 2018 Sophia Kalanovska. All rights reserved.
//

import UIKit
import SideMenu



class AnnouncementController: UIViewController , UITableViewDelegate, UITableViewDataSource{
    
    

    func update() {
         announcementTableView.reloadData()
    }
    

    @IBOutlet weak var announcementTableView: UITableView!

    static var messageArray:Array<Announcements>?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        print("I am in announcementController")
        
        navigationController?.setNavigationBarHidden(true, animated: true)
        announcementTableView.delegate = self
        announcementTableView.dataSource = self
        
        
        announcementTableView.register(UINib(nibName: "MessageCell", bundle: nil), forCellReuseIdentifier: "customMessageCell")
        
        configureTableView()
        announcementTableView.separatorStyle = .none
        announcementTableView.allowsSelection = false
        setupSideMenu()
    }

    fileprivate func setupSideMenu() {
        // Define the menus
        SideMenuManager.default.menuLeftNavigationController = storyboard!.instantiateViewController(withIdentifier: "LeftMenuNavigationController") as? UISideMenuNavigationController
        
        // Enable gestures. The left and/or right menus must be set up above for these to work.
        // Note that these continue to work on the Navigation Controller independent of the View Controller it displays!
        SideMenuManager.default.menuAddPanGestureToPresent(toView: self.navigationController!.navigationBar)
        SideMenuManager.default.menuAddScreenEdgePanGesturesToPresent(toView: self.navigationController!.view, forMenu: UIRectEdge.left)
        
    }

    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        
        if let response = AnnouncementController.messageArray {
            
            return response.count
        }
        
        return 1
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "customMessageCell", for: indexPath) as! CustomMessageCell
        
        if let response = AnnouncementController.messageArray {
            cell.messageBody.text = response[indexPath.row].message
        } else {
            cell.messageBody.text = "No Announcements"
        }
        
        return cell
    }
    
    func configureTableView() {
        
        announcementTableView.rowHeight = UITableViewAutomaticDimension
        announcementTableView.estimatedRowHeight = 120.0
    }
}
