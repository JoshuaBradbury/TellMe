//
//  ViewController.swift
//  TellMe
//x
//  Created by Sophia on 19.02.18.
//  Copyright © 2018 Sophia Kalanovska. All rights reserved.
//

import UIKit


class AnnouncementController: UIViewController , UITableViewDelegate, UITableViewDataSource {

    @IBOutlet weak var announcementTableView: UITableView!
    
    let messageArray = ["""
                Week 8 coursework - scaling
                by Andrew Coles - Friday, 16 March 2018, 8:50 PM
                     
                Hi all,

                I've been asked to pass on to you that the marks for the remaining coursework will be scaled to cover the week 8 coursework, in addition to being scaled to cover the week 7 coursework.

                If you have any questions about this, please follow-up with the assessment sub-board by emailing ug-informatics@kcl.ac.uk .

                All the best,

                Andrew
                ""","""
                Next advisory meetings
                by Jeroen Keppens - Friday, 16 March 2018, 4:02 PM
                     
                Dear all,

                As the end of the major project is approaching and most teams have developed effective approaches to manage the project and team, the advisory meetings in the next weeks are no longer mandatory.

                If you would find it helpful to have a meeting with your academic advisor to discuss any aspect of the project or team management, please send a brief agenda or some discussion points to your academic advisor or bring them with your to the meeting.  If you do not have any issues that you would like to discuss, it would be helpful if you could email your academic advisor asking for the meeting to be cancelled.

                Best wishes,

                Jeroen
                ""","""
                Change in office hours
                by Maria Isabel Fernandez - Friday, 16 March 2018, 5:08 PM
                     
                Dear PLD Students
                there will be no office hours on Wednesday 21 March.
                Instead, the office hours will be on Monday 26th 12.00-14.00
                (as well as Wednesday 28th 10.30-12.30).
                Best wishes
                Maribel
                """]
    
    
    override func viewDidLoad() {
        
        super.viewDidLoad()
        
        navigationController?.setNavigationBarHidden(true, animated: true)
        announcementTableView.delegate = self
        announcementTableView.dataSource = self
        
        announcementTableView.register(UINib(nibName: "MessageCell", bundle: nil), forCellReuseIdentifier: "customMessageCell")
        
        configureTableView()
        announcementTableView.separatorStyle = .none
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 3
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "customMessageCell", for: indexPath) as! CustomMessageCell
        
        cell.messageBody.text = messageArray[indexPath.row]
        
        return cell
    }
    
    func configureTableView() {
        
        announcementTableView.rowHeight = UITableViewAutomaticDimension
        announcementTableView.estimatedRowHeight = 120.0
    }
}
