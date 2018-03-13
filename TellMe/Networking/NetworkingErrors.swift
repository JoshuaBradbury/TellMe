//
//  NetworkingErrors.swift
//  TellMe
//
//  Created by Sophia Kalanovska on 13/03/2018.
//  Copyright © 2018 Sophia Kalanovska. All rights reserved.
//

import Foundation

enum NetworkingErrors: Error {
    case PublicClientApplicationCreation(NSError)
    case UserNotFound(NSError)
    case NoUserSignedIn
    case ServerInvalidResponse
    case ImageCacheError(Error)
    case FailedToMakeUIImageError
}
