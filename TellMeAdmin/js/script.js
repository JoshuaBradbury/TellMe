var newGroupBtn = document.getElementById("newGroupBtn");

newGroupBtn.onclick = function() {
    if (document.getElementById("cover").style.display == "none") {
        var newA = document.getElementById("newGroup");

        if (newA.style.display !== "none") {
            $("div#newGroup").fadeOut("");
            $("div#cover").fadeOut("");
        } else {
            $("div#cover").fadeIn("");
            $("div#newGroup").fadeIn("");
        }
    }
}

var newGroupBtn = document.getElementById("settingsBtn");

newGroupBtn.onclick = function() {
    if (document.getElementById("newGroup").style.display == "none") {
        var newA = document.getElementById("settings");

        if (newA.style.display !== "none") {
            $("div#settings").fadeOut("");
            $("div#cover").fadeOut("");
        } else {
            $("div#cover").fadeIn("");
            $("div#settings").fadeIn("");
            document.getElementById("settingsName").value = document.getElementById("title").innerHTML;
        }
    }
}

var popupIDs = [["settings", "settingsBtn"], ["newGroup", "newGroupBtn"], ["collapseOne", "announcementInputGroup", "announcementTitle", "text", "submitBtn"]];

window.addEventListener("click", function(e) {
    var outsideClick = true;
    var displayed = "";

    for (let popGroup of popupIDs) {
        let cont = popGroup[0];

        if (document.getElementById(cont).style.display !== "none" || document.getElementById(cont).classList.contains("show")) {
            for (let popID of popGroup) {
                if (document.getElementById(popID).contains(e.target)) {
                    outsideClick = false;
                    break;
                }
            }

            displayed = cont;
            break;
        }
    }

    if (outsideClick && displayed != "") {
        if (displayed == "collapseOne") {
                $('div#collapseOne').collapse("hide");
        } else {
            $("div#" + displayed).fadeOut("fast");
            $("div#cover").fadeOut("");
        }
    }
});

(function($) {
    $.fn.innerText = function(msg) {
        if (msg) {
            if (document.body.innerText) {
                for (var i in this) {
                    this[i].innerText = msg;
                }
            } else {
                for (var i in this) {
                    this[i].innerHTML.replace(/&lt;br&gt;/gi,"n").replace(/(&lt;([^&gt;]+)&gt;)/gi, "");
                }
            }
            return this;
        } else {
            if (document.body.innerText) {
                return this[0].innerText;
            } else {
                return this[0].innerHTML.replace(/&lt;br&gt;/gi,"n").replace(/(&lt;([^&gt;]+)&gt;)/gi, "");
            }
        }
    };
})(jQuery);

function submit() {
    var title = document.getElementById("announcementTitle").value;
    var text = document.getElementById("text").innerHTML;

    if (title == "" || text == "") {
        alert("Missing text field");
    } else {
        sendEndpointRequest("announcement", "POST", { "groupId": getOpenGroupId(), "subject": title, "announcement": $("div#text").innerText() }, function(json) {
            update(document.getElementById("title").innerHTML);
            document.getElementById("announcementTitle").value = "";
            document.getElementById("text").innerHTML = "";
            $('div#collapseOne').collapse("hide");
        }, null);
    }
}

function addAnnouncement(announcement) {
    var title = announcement.subject;
    var time = announcement.time_sent;
    var text = announcement.message;
    var new_announcement = document.createElement("div");
    var my_container = document.getElementById("announcements")
    var urgent_flag = document.createElement("div");
    var del = document.createElement("div");

    new_announcement.classList.add("del");
    new_announcement.appendChild(urgent_flag);
    new_announcement.appendChild(del);
    my_container.prepend(new_announcement);
    new_announcement.classList.add("post");

    var text_container = document.createElement("div");
    text_container.classList.add("text-container");
    var close = document.createElement("div");
    close.classList.add("close");

    text_container.classList.add("extra-margin");
    close.style.marginLeft = "10px";

    var titleText = document.createElement("p");
    titleText.classList.add("text-title");
    titleText.innerHTML = title;

    var messageText = document.createElement("p");
    messageText.innerHTML = text;

    new_announcement.appendChild(text_container);
    new_announcement.id = "announcement " + announcement.announcement_id;
    text_container.appendChild(titleText);
    text_container.appendChild(messageText);

    close.onclick = function() {
        deleteannouncement(this);
        return false;
    }

    new_announcement.appendChild(close);
}

function addGroupToWeb(group) {
    var new_mod = document.createElement("li");
    var my_container = document.getElementById("groupList");
    new_mod.classList.add("menu-box-tab");
    new_mod.classList.add("nav-item");
    my_container.appendChild(new_mod);

    var text = document.createElement("h1");
    text.id = "group " + group.groupId;
    text.innerHTML = group.groupName;

    new_mod.onclick = function() {
        update(this.children[0].innerHTML);
        return false;
    }

    new_mod.appendChild(text);
}

$(document).ready(function() {
    document.getElementById("cover").style.display = "none";

    if (getUser()) {
        sendEndpointRequest("group", "GET", null, function(json) {
            var groups = json.groups;
            for (var i = 0; i < groups.length; i++) {
                addGroupToWeb(groups[i]);
            }

            update(groups[0].groupName);
        }, null);
    }
});

function getOpenGroupId() {
    var groupId = -1;
    for (let group of document.getElementById("groupList").children) {
        if (group.children[0].innerHTML == document.getElementById("title").innerHTML) {
            groupId = group.children[0].id.split(" ")[1]
            break;
        }
    }

    return groupId;
}

function update(e) {
    if(typeof e === "string" || e instanceof String) {
        document.getElementById("title").innerHTML = e;
    } else {
        document.getElementById("title").innerHTML = e.innerHTML;
    }

    $(".post").remove();
    $(".students").remove();

    document.getElementById("settingsBtn").style.display = "block";

    if (getUser()) {
        var groupId = getOpenGroupId();

        sendEndpointRequest("announcement/" + groupId + "?n=all", "GET", null, function(json) {
            var announcements = json.announcements;
            for (var j = 0; j < announcements.length; j++) {
                addAnnouncement(announcements[j]);
            }
        }, null);

        sendEndpointRequest("group/student?groupId=" + groupId, "GET", null, function(json) {
            var students = json.students;
            for (var j = 0; j < students.length; j++) {
                var new_mod = document.createElement("div");
                var my_container = document.getElementById("left");
                new_mod.classList.add("students");

                my_container.appendChild(new_mod);
                var text = document.createElement("h1");
                text.id = "student-name" + j;
                text.innerHTML = students[j];

                text.onclick = function() {
                    removestudent(this, document.getElementById("title").innerHTML, this.innerHTML);
                    return false;
                }

                new_mod.appendChild(text);
            }
        }, null);
    }

    if (screen.width <= 750) {
        document.getElementById("newGroupBtn").style.display = "none";
        document.getElementById("newGroupBtn").style.visibility = "hidden";
    }
}

function removestudent(e, course, student) {
    var answer = confirm("Remove " + student + " from " + course)
    if (answer) {
        if (getUser()) {
            sendEndpointRequest("group/student", "DELETE", { "groupId": getOpenGroupId(), "student": student }, function(json) {
                e.parentNode.parentNode.removeChild(e.parentNode);
            }, null);
        }
    } else {}
}

function deleteannouncement(e) {
    var answer = confirm("Delete this announcement?")
    if (answer) {
        sendEndpointRequest("announcement", "DELETE", { announcement_id: Number(e.parentNode.id.split(" ")[1]) }, function(json) {
            e.parentNode.parentNode.removeChild(e.parentNode);
        }, null);
    } else {}
}

function deleteGroup(e) {
    var answer = confirm("Delete this group?")
    if (answer) {
        if (getUser()) {
            sendEndpointRequest("group", "DELETE", { "groupId": getOpenGroupId() }, function(json) {
                for (let group of document.getElementById("groupList").children) {
                    if (group.children[0].innerHTML == document.getElementById("title").innerHTML) {
                        document.getElementById("groupList").removeChild(group);
                        break;
                    }
                }

                if (document.getElementById("groupList").children.length > 0) {
                    update(document.getElementById("groupList").children[0].children[0].innerHTML);
                }
            });
        }

        $("div#settings").fadeOut("fast");
        $("div#cover").fadeOut("");
    } else {}
}

function updateGroup() {
    var file = document.getElementById("settingsFile").files[0];
    var group = document.getElementById("settingsName").value;

    if (createGroup(file, group)) {
        document.getElementById("settingsFile").value = null;
        document.getElementById("settingsName").value = null;

        $("div#settings").fadeOut("fast");
        $("div#cover").fadeOut("");
    }
}

function createNewGroup() {
    var file = document.getElementById("newGroupFile").files[0];
    var group = document.getElementById("newGroupName").value;

    if (createGroup(file, group)) {
        document.getElementById("newGroupFile").value = null;
        document.getElementById("newGroupName").value = null;

        $("div#newGroup").fadeOut("fast");
        $("div#cover").fadeOut("");
    }
}

function asNumber(obj) {
    if (obj) {
        var n = Number(obj);

        if (!isNaN(n)) {
            return n;
        }
    }

    return null;
}

function createGroup(file, group) {
    if(group != "") {
        if (file) {
            var reader = new FileReader();
            reader.readAsText(file);

            var text = reader.result;

            reader.onloadend = function(e) {
                if (e.target.readyState == FileReader.DONE) {
                    var csvval = e.target.result.split("\n");

                    var students = [];

                    for (var i = 0; i < csvval.length; i++) {
                        var temp = csvval[i].split(",");
                        for (var j = 0; j < temp.length; j++) {
                            if (temp[j][0] == "k" && asNumber(temp[j][1]) != null) {
                                console.log(temp[j]);
                                students.push(temp[j].trim());
                            }
                        }
                    }

                    if (getUser()) {
                        sendEndpointRequest("group?groupName=" + group, "GET", null, function(json) {
                            updateGroupRequest(getOpenGroupId(), students);
                        }, function() {
                            createNewGroupRequest(group, students);
                        });
                    }
                }
            }
        }

        return true;
    } else {
        alert("Missing group name");
    }

    return false;
}

function updateGroupRequest(gid, students) {
    sendEndpointRequest("group", "PUT", { "users": students, "groupId": gid }, function (json) {
        update(document.getElementById("title").innerHTML);
    }, null);
}

function createNewGroupRequest(gname, students) {
    sendEndpointRequest("group", "POST", { "groupName": gname }, function (json) {
        addGroupToWeb({ groupId: json.groupId, groupName: gname });
        document.getElementById("title").innerHTML = gname;
        updateGroupRequest(json.groupId, students);
    }, null);
}

function evalJSON(json) {
    return eval("(" + json + ")");
}

function makeHttpObject() {
    try {
        return new XMLHttpRequest();
    } catch (error) {}
    try {
        return new ActiveXObject("Msxml2.XMLHTTP");
    } catch (error) {}
    try {
        return new ActiveXObject("Microsoft.XMLHTTP");
    } catch (error) {}

    throw new Error("Could not create HTTP request object.");
}

function sendEndpointRequest(endpoint, method, body, success, failure) {
    var request = makeHttpObject();
    request.open(method, "https://tellme.newagedev.co.uk/api/v1.0/" + endpoint, true);
    request.setRequestHeader("Authorization", "Basic " + btoa("joshua.bradbury@kcl.ac.uk:"));
    if (body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        request.send(JSON.stringify(body));
    } else {
        request.send(null);
    }
    request.onreadystatechange = function() {
        if (request.readyState == 4) {
            if (request.status >= 200 && request.status < 300)
                success(evalJSON(request.responseText));
            else if (failure)
                failure(request.status, request.statusText);
        }
    };
}
