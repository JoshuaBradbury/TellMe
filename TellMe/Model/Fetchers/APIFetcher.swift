//
//  APIFetcher.swift
//  TellMe
//
//  Created by DevUse on 23/03/2018.
//  Copyright © 2018 Sophia Kalanovska. All rights reserved.
//

import Foundation

class APIFetcher: NSObject {
    
    typealias APIFetcherGroupsHandler = ([Group]) -> ()
    typealias APIFetcherAnnouncementsHandler = ([Announcements]) -> ()
    
    class func fetchGroups(handler: APIFetcherGroupsHandler? = nil) {
        
        
        let groupEndpoint: NetworkRequestEndpointBuilder = {
            return "\(NetworkRequestKeys.server.rawValue)\(NetworkRequestKeys.groupEndpoint.rawValue)"
        }
        
        let parameters: [NetworkRequestParameterBuilder] = []
        
        let networkRequest = NetworkRequest(endpointBuilder: groupEndpoint, typeBuilder: NetworkRequest.getTypeBuilder(), headerBuilder: NetworkRequest.defaultHeaderBuilder(username: MSALHandler.getUsername()), parameterBuilder: parameters)
        let executor = NetworkRequestExecutor(with: networkRequest)

        executor.execute { (responseJSON) in
            

            guard let response = responseJSON as? Dictionary<String,Any> else {return}
            guard let groups = response["groups"] as? Array<Any> else { return }
            
            var parsedGroups = [Group]()
            for group in groups {
                if let groupData = try? JSONSerialization.data(withJSONObject: group, options: []), let groupObj = try? JSONDecoder().decode(Group.self, from: groupData) {
                    parsedGroups.append(groupObj)
                }
            }
            print(parsedGroups)
            DispatchQueue.main.async {
                handler?(parsedGroups)
            }
        }
    }
}

