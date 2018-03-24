//
//  Announcements.swift
//  TellMe
//
//  Created by DevUse on 23/03/2018.
//  Copyright © 2018 Sophia Kalanovska. All rights reserved.
//

import Foundation

struct Announcements: Codable {
    
    let module_id: Int
    let subject: String
    let message: String
    let time_sent: String
}
