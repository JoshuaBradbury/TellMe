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
    
//    class func fetchArrivalTubes(for stations: [Station], handler: TFLFetcherModelHandler? = nil) {
//        let group = DispatchGroup()
//        let model = DataModel(stations: stations)
//
//        for station in stations {
//
//            group.enter()
//
//            fetchArrivalTubes(for: station.stationNaptan , handler: { (tubes) in
//
//                model.addTubes(tubes, for: station.stationNaptan)
//                group.leave()
//            })
//        }
//
//        group.notify(queue: .main) {
//
//            handler?(model)
//        }
//    }
//
//    class func fetchArrivalTubes(for stationId: String, handler: TFLFetcherArrivalHandler? = nil) {
//
//        let arrivalEndpoint: NetworkRequestEndpointBuilder = {
//            return "\(NetworkRequestKeys.server.rawValue)\(NetworkRequestKeys.stationEndpoint.rawValue)/\(stationId)\(NetworkRequestKeys.arrivalEndpoint.rawValue)"
//        }
//
//        let parameters: [NetworkRequestParameterBuilder] = [
//        { (Keys.mode.rawValue, Keys.tube.rawValue) }
//        ]
//
//        let networkRequest = NetworkRequest(endpointBuilder: arrivalEndpoint, typeBuilder: NetworkRequest.getTypeBuilder(), headerBuilder: NetworkRequest.defaultHeaderBuilder(), parameterBuilder: parameters)
//        let executor = NetworkRequestExecutor(with: networkRequest)
//
//        executor.execute { (responseJSON) in
//            guard let tubes = responseJSON as? Array<Any> else { return }
//
//            var parsedTubes = [Tube]()
//            for tube in tubes {
//
//                if let tubeData = try? JSONSerialization.data(withJSONObject: tube, options: []), let arrivalTube = try? JSONDecoder().decode(Tube.self, from: tubeData) {
//                    parsedTubes.append(arrivalTube)
//                }
//            }
//
//            parsedTubes.sort(by: {$0.timeToStation < $1.timeToStation})
//
//            DispatchQueue.main.async {
//                handler?(parsedTubes)
//            }
//        }
//    }
}

