//
//  APIRequest.swift
//  TellMe
//
//  Created by DevUse on 23/03/2018.
//  Copyright © 2018 Sophia Kalanovska. All rights reserved.
//

import UIKit

enum NetworkRequestType: String {
    case get = "GET"
}

typealias NetworkRequestTypeBuilder = () -> (NetworkRequestType)
typealias NetworkRequestEndpointBuilder = () -> (String)
typealias NetworkRequestHeaderBuilder = () -> (field: String, value: String)
typealias NetworkRequestParameterBuilder = () -> (key: String, value: String)

extension String {
    
    func fromBase64() -> String? {
        guard let data = Data(base64Encoded: self, options: Data.Base64DecodingOptions(rawValue: 0)) else {
            return nil
        }
        
        return String(data: data as Data, encoding: String.Encoding.utf8)
    }
    
    func toBase64() -> String? {
        guard let data = self.data(using: String.Encoding.utf8) else {
            return nil
        }
        
        return data.base64EncodedString(options: Data.Base64EncodingOptions(rawValue: 0))
    }
}

struct NetworkRequest {
    
    var endpointBuilder: NetworkRequestEndpointBuilder
    var typeBuilder: NetworkRequestTypeBuilder
    var headerBuilder: [NetworkRequestHeaderBuilder]
    var parameterBuilder: [NetworkRequestParameterBuilder]
    
    static func defaultHeaderBuilder(username: String) -> [NetworkRequestHeaderBuilder] {
        
        let contentTypeHeader: NetworkRequestHeaderBuilder = {
            
            
            return (NetworkRequestKeys.contentTypeKey.rawValue, NetworkRequestKeys.jsonContentType.rawValue)
        }
        
        let authorizationHeader: NetworkRequestHeaderBuilder = {
            
            //convert username to base 64
            return (NetworkRequestKeys.authorizationKey.rawValue, "Basic \(String(describing: username.toBase64()!)))")
        }
        
        return [contentTypeHeader,authorizationHeader]
    }
    
    static func getTypeBuilder() -> NetworkRequestTypeBuilder {
        
        return {
            return NetworkRequestType.get
        }
    }
    
    // https://api.tfl.gov.uk/StopPoint?key=value&key=value&
    
    func buildEndpoint() -> String {
        
        var finalEndpoint = "\(endpointBuilder())?"
        
        for param in parameterBuilder {
            finalEndpoint.append("\(param().key)=\(param().value)&")
        }
        finalEndpoint.removeLast()
        
        return finalEndpoint
    }
}

