/*titleBtn opens pop up when text field is pressed*/
document.getElementById("titleBtn").onclick = function() {
    $("div#popcontainer").fadeIn("");
    $("div#cover").fadeIn("");
    $("#plusBtn").css("transform", "rotate(45deg)");
}

document.getElementById("postBtn").onclick = function() {
    var newA = document.getElementById("popcontainer");

    if (newA.style.display !== "none") {
        $("div#popcontainer").fadeOut("");
        $("div#cover").fadeOut("");
        $("#plusBtn").css("transform", "rotate(0deg)");
    } else {
        $("div#popcontainer").fadeIn("");
        $("div#cover").fadeIn("");
        $("#plusBtn").css("transform", "rotate(45deg)");
    }
}

/*open csv ui*/
var newGroupBtn = document.getElementById("csvBtn");

newGroupBtn.onclick = function() {
    if (document.getElementById("cover").style.display == "none") {
        var newA = document.getElementById("csvcontainer");

        if (newA.style.display !== "none") {
            $("div#csvcontainer").fadeOut("");
            $("div#cover").fadeOut("");
        } else {
            $("div#cover").fadeIn("");
            $("div#csvcontainer").fadeIn("");
        }
    }
}

/*open settings ui*/
var newGroupBtn = document.getElementById("settings");

newGroupBtn.onclick = function() {
    if (document.getElementById("csvcontainer").style.display == "none") {
        var newA = document.getElementById("settingscontainer");

        if (newA.style.display !== "none") {
            $("div#settingscontainer").fadeOut("");
            $("div#cover").fadeOut("");
        } else {
            $("div#cover").fadeIn("");
            $("div#settingscontainer").fadeIn("");
            document.getElementById("settingsName").value = document.getElementById("title-text").innerHTML;
        }
    }
}

window.addEventListener("click", function(e) { //detect outside click
    //TODO condition for multiple windows
    if (!document.getElementById("settingscontainer").contains(e.target) && !document.getElementById("settings").contains(e.target)) {
        if (document.getElementById("settingscontainer").style.display !== "none") {
            $("div#settingscontainer").fadeOut("fast");
            $("div#cover").fadeOut("");
        }
    }

    if (!document.getElementById("csvBtn").contains(e.target) && !document.getElementById("csvcontainer").contains(e.target)) {
        if (document.getElementById("csvcontainer").style.display !== "none") {
            $("div#csvcontainer").fadeOut("fast");
            $("div#cover").fadeOut("");
        }
    }

    if (!document.getElementById("popcontainer").contains(e.target) &&
        !document.getElementById("titleBtn").contains(e.target) &&
        !document.getElementById("postBtn").contains(e.target)) {
        if (document.getElementById("popcontainer").style.display !== "none") {
            $("div#cover").fadeOut("");
            $("div#popcontainer").fadeOut("fast");
            $("#plusBtn").css("transform", "rotate(0deg)");
        }
    }
});

function save() { //TODO connect backend to settings
    //if(){} //TODO error message if new group name is not unique?
    console.log(document.getElementById("groupname").value); //backend var for new group name
};

/*Write announcement*/
function submit() {
    var title = document.getElementById("titleBtn").value;
    var text = document.getElementById("text").innerHTML;

    if (title == "" || text == "") {
        alert("Missing text field");
    } else {
        $(".pop-container").fadeOut(); //removes dropdown on exit
        $("div#cover").fadeOut("");

        document.getElementById("titleBtn").value = ""; //clears text field on successful submit
        document.getElementById("text").innerHTML = ""; //@TODO doesnt work!!

        console.log(document.getElementById("title-text").innerHTML); // backend module code used to identify which module message belongs to
        add_announcement(title, text); //calls add func, replace paramters with backend call
    }
}

/*Add announcement*/
function add_announcement(title, text) { //backend @TODO format the announcement
    var new_announcement = document.createElement("div");
    var my_container = document.getElementById("announcements-container")
    var urgent_flag = document.createElement("div");
    var del = document.createElement("div");

    new_announcement.classList.add("del");
    new_announcement.appendChild(urgent_flag); //adds urgent flag
    new_announcement.appendChild(del);
    my_container.prepend(new_announcement);
    new_announcement.classList.add("post");

    var text_container = document.createElement("div");
    text_container.classList.add("text-container");
    var close = document.createElement("div");
    close.classList.add("close");

    /*urgent flag, currently not in use, too lazy to change else*/
    if (title == "abcdefghijklmnopqrstuvwxyz123") { //set subject as abcdefghijklmnopqrstuvwxyz123 for urgent flag idk
        new_announcement.classList.add("urgent");
    } else {
        //text_container.style.marginRight = "10px";
        text_container.classList.add("extra-margin");
        close.style.marginLeft = "10px";
    }

    new_announcement.appendChild(text_container); //adds urgent flag
    new_announcement.id = "announcement-module";
    text_container.innerHTML += text;

    close.onclick = function() {
        deleteannouncement(this);
        return false;
    }

    new_announcement.appendChild(close);
}

/*load in modules after page is opened initially*/
$(document).ready(function() {
    document.getElementById("cover").style.display = "none";

    for (var i = 0; i < json.length; i++) { //backend loops through list of modules
        var obj = json[i]; //backend loop
        var new_mod = document.createElement("div");
        var my_container = document.getElementById("right");
        new_mod.classList.add("menu-box-tab");
        my_container.appendChild(new_mod);

        var text = document.createElement("h1");
        text.id = "module-name";
        text.innerHTML = obj.ModuleName; //backend load each module (line 127)

        text.onclick = function() {
            update(this);
            return false;
        }

        new_mod.appendChild(text);
    }

    update(json[0].ModuleName);
});

/*
 * update() changes divs/text to match selected module
 * id module-name : selected module
 * id title-text : top title text
 */
function update(e) {
    if(typeof e === "string" || e instanceof String) {
        document.getElementById("title-text").innerHTML = e;
    } else {
        document.getElementById("title-text").innerHTML = e.innerHTML;
    }

    $(".post").remove(); //clears existing announcements
    $(".students").remove(); //clears existing students

    document.getElementById("settings").style.display = "block";

    for (var i = 0; i < json.length; i++) { //backend loop
        var obj = json[i]; //backend loop
        if (obj.ModuleName == e || obj.ModuleName == e.innerHTML) {
            for (var j = 0; j < obj.Announcements.length; j++) {
                add_announcement(obj.Announcements[j], obj.Announcements[j]); //TODO change when format is decided
            }

            for (var x = 0; x < obj.students.length; x++) { //backend loop through students
                var new_mod = document.createElement("div");
                var my_container = document.getElementById("left");
                new_mod.classList.add("students");

                //var close = document.createElement("div");
                //close.classList.add("close"); //TODO change to custom close element for students
                my_container.appendChild(new_mod);
                var text = document.createElement("h1");
                text.id = "student-name" + x;
                text.innerHTML = obj.students[x]; //backend load students
                //new_mod.appendChild(close);

                text.onclick = function() {
                    removestudent(this, e, this.innerHTML);
                    return false; //TODO fix this
                }

                new_mod.appendChild(text);
            }
        }
    }

    if (screen.width <= 750) { //condition for mobiles
        document.getElementById("csvBtn").style.display = "none";
        document.getElementById("csvBtn").style.visibility = "hidden";
    }
}

/*Remove student*/
function removestudent(e, course, student) {
    var answer = confirm("Remove " + student + " from " + course)
    if (answer) {
        e.parentNode.parentNode.removeChild(e.parentNode); //backend remove student
    } else {}
}

/*Delete announcement*/
function deleteannouncement(e) {
    var answer = confirm("Delete this announcement?")
    if (answer) {
        e.parentNode.parentNode.removeChild(e.parentNode); //backend delete announcement
    } else {}
}

function updateGroup() {
    var file = document.getElementById("settingsFile").files[0];
    var group = document.getElementById("settingsName").value;

    if (createGroup(file, group)) {
        document.getElementById("settingsFile").value = null;
        document.getElementById("settingsName").value = null;

        $("div#settingscontainer").fadeOut("fast");
        $("div#cover").fadeOut("");
    }
}

function createNewGroup() {
    var file = document.getElementById("filename").files[0];
    var group = document.getElementById("usr").value;

    if (createGroup(file, group)) {
        document.getElementById("filename").value = null;
        document.getElementById("usr").value = null;

        $("div#csvcontainer").fadeOut("fast");
        $("div#cover").fadeOut("");
    }
}

function createGroup(file, group) {
    if(file && group != "") {
        var reader = new FileReader();
        reader.readAsText(file);

        var text = reader.result;

        reader.onloadend = function(e) {
    		if (e.target.readyState == FileReader.DONE) {
                var csvval = e.target.result.split("\n");

                var users = [];
                var userIndex = csvval[0].split(",").indexOf("Username");

                for (var i = 1; i < csvval.length; i++) {
                    var temp = csvval[i].split(",");
                    if (temp.length > userIndex) {
                        if (temp[userIndex] && temp[userIndex].trim()) {
                            users.push(temp[userIndex].trim());
                        }
                    }
                }

                // make request here
                console.log(users);
            }
        }

        return true;
    } else {
        alert("Missing field");
    }

    return false;
}
