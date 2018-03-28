var applicationConfig = {
    clientID: "c4d8ad78-18b5-4bdd-afa2-50617a34e8cf"
};

var _user = ""

var graphApiEndpoint = "https://graph.microsoft.com/v1.0/me";
var graphAPIScopes = ["https://graph.microsoft.com/user.read"];
var userAgentApplication = new Msal.UserAgentApplication(applicationConfig.clientID, null, loginCallback, {});

window.onload = function () {
    if (!userAgentApplication.isCallback(window.location.hash) && window.parent === window && !window.opener) {
        var user = userAgentApplication.getUser();
        if (user) {
            loginOrOut(false);
            if (window.location.href.indexOf("app") === -1) {
                window.location.replace("https://tellmesite.newagedev.co.uk/app");
            }
        } else {
            if (window.location.href.indexOf("app") !== -1) {
                window.location.replace("https://tellmesite.newagedev.co.uk");
            }
        }
    }
}

function loginOrOut(forceLogOut) {
    forceLogOut = typeof forceLogOut !== "undefined" ? forceLogOut : true;
    var user = userAgentApplication.getUser();
    if (!user) {
        userAgentApplication.loginRedirect(graphAPIScopes, "domain_hint=kcl.ac.uk");
    } else {
        if (forceLogOut) {
            userAgentApplication.logout();
        } else {
            userAgentApplication.acquireTokenSilent(graphAPIScopes).then(function (token) {
                callWebApiWithToken(graphApiEndpoint, token);
            }, function (error) {
                if (error) {
                    userAgentApplication.acquireTokenRedirect(graphAPIScopes);
                }
            });
        }
    }
}

function getUser() {
    if (typeof(Storage) !== "undefined") {
        return localStorage.getItem("user");
    } else {
        return _user;
    }
}

function loginCallback(errorDesc, token, error, tokenType) {
    if (errorDesc) {
        showError(msal.authority, error, errorDesc);
    } else {
        loginOrOut(false);
    }
}

function showError(endpoint, error, errorDesc) {
    var formattedError = JSON.stringify(error, null, 4);
    if (formattedError.length < 3) {
        formattedError = error;
    }
    document.getElementById("errorMessage").innerHTML = "An error has occurred:<br/>Endpoint: " + endpoint + "<br/>Error: " + formattedError + "<br/>" + errorDesc;
    console.error(error);
}

function callWebApiWithToken(endpoint, token) {
    var headers = new Headers();
    var bearer = "Bearer " + token;
    headers.append("Authorization", bearer);
    var options = {
        method: "GET",
        headers: headers
    };

    fetch(endpoint, options).then(function (response) {
        var contentType = response.headers.get("content-type");
        if (response.status === 200 && contentType && contentType.indexOf("application/json") !== -1) {
            response.json().then(function (data) {
                console.log(data);

                if (typeof(Storage) !== "undefined") {
                    localStorage.setItem("user", data.userPrincipalName);
                } else {
                    _user = data.userPrincipalName;
                }
            }).catch(function (error) {
                showError(endpoint, error);
            });
        } else {
            response.json().then(function (data) {
                showError(endpoint, data);
            }).catch(function (error) {
                showError(endpoint, error);
            });
        }
    }).catch(function (error) {
        showError(endpoint, error);
    });
}
