//
//  NetworkRequestKeys.swift
//  TellMe
//
//  Created by DevUse on 23/03/2018.
//  Copyright © 2018 Sophia Kalanovska. All rights reserved.
//

import Foundation

enum NetworkRequestKeys: String {
    case server = "https://tellme.newagedev.co.uk/api/v1.0"
    
    case groupEndpoint = "/group"
    case announcementEndpoint = "/announcement"
    
    case contentTypeKey = "Content-Type"
    case jsonContentType = "application/json"
    case authorizationKey = "Authorization"
}
