//
//  ViewController.swift
//  TellMe
//x
//  Created by Sophia on 19.02.18.
//  Copyright © 2018 Sophia Kalanovska. All rights reserved.
//

import UIKit

class ViewController: UIViewController , UITableViewDelegate, UITableViewDataSource {

    @IBOutlet var announcementTableView: UITableView!
    let msalHandler = MSALHandler()
    
    
    override func viewDidLoad() {
        super.viewDidLoad()
        announcementTableView.delegate = self
        announcementTableView.dataSource = self
        
        announcementTableView.register(UINib(nibName: "MessageCell", bundle: nil), forCellReuseIdentifier: "customMessageCell")
        
//        configureTableView()
        
    }
    
    override func viewDidAppear(_ animated: Bool) {
        msalHandler.login()
        
    }
    
    func tableView(_ tableView: UITableView, numberOfRowsInSection section: Int) -> Int {
        return 3
    }

    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        
        let cell = tableView.dequeueReusableCell(withIdentifier: "customMessageCell", for: indexPath) as! CustomMessageCell
        
        let messageArray = ["""
            
                Tavalodet mobarak fereshteye fingiliye man.
                ❤️❤️❤️🙈🙈🙈😘😘😘

                25 sale pish hamin moghe khoda toro be man dad, albate man unmoghe hanuz tu shimake mamanim budam, dashtam warje wurje mikardam ke toam bade chand mah Sabret saru umado umadi zadi zire kase kuzamo gofti, jam boton tase tuzato, pasho biya biyun bibinaaaam.
                🙊🙊🙊🙊

                20 sal tu in donya tanha budimo charkhidim bara khodemun, ta belakhare khoda maro dobare sare rahe hame Gharar dad.

                Khodaya shokret ke hamchin nemati be man dadi, to kheyli jaha sange sabure man budi, kheyli jaha tu naomidi behem omid dadi, wa agar emrooz baraye khodam mardi shodam, hamash bekhatere dashtane to poshtam bude.
                🤘🏽🤘🏽🤘🏽💪🏼💪🏼💪🏼

                Kalamat vaghean nemitunan hese mano enteghal bedan be to, nemitunan andazeye ghadr danie mano nesbat be to bayan konan, pas hamin kalamate sadaro az mane savad dar hade 2vom rahnamai bepazir waghti migam behet, kheyli nokaretam, kheyli mokhlesetam, vaghean asheghetamo khake patam.
                🙏🏼🙏🏼🙏🏼🙏🏼🙏🏼

                MerC abate 4sal….
                🙏🏼🙏🏼🙏🏼🙏🏼🙏🏼

                pish be suye abad.

                💋💄💍❤️😘👅💦💦💦
            ""","Second Message asdasdasdasd asdasdasdasdas asdasdasdasdasd asdasdasdasdasd asdasdasdasdasda","Third Message"]
        
        cell.messageBody.text = messageArray[indexPath.row]
        
        return cell
    }
    
    func configureTableView() {
        announcementTableView.rowHeight = UITableViewAutomaticDimension
        announcementTableView.estimatedRowHeight = 120.0
        
        print("YES")
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    override func viewWillAppear(_ animated: Bool) {

        
    }
}
