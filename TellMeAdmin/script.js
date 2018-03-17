/*titleBtn opens pop up when text field is pressed*/
document.getElementById('titleBtn').onclick = function() {
    console.log("clicked");

    $('div#popcontainer').fadeIn("");

    document.getElementById("announcementsBoard").style.display = "none";
    document.getElementById("postBtn").style.opacity = "0.5";
    document.getElementById("overlay").style.display = "block";
}
document.getElementById('postBtn').onclick = function() {
    console.log("clicked");
    var newA = document.getElementById('popcontainer');
    if (newA.style.display !== 'none') {
        $('div#popcontainer').fadeOut("");
    } else {
        $('div#popcontainer').fadeIn("");
    }
    document.getElementById("announcementsBoard").style.display = "none";
    document.getElementById("postBtn").style.opacity = "0.5";
    document.getElementById("overlay").style.display = "block";

}
/*open csv ui*/
var newGroupBtn = document.getElementById('csvBtn');
newGroupBtn.onclick = function() {
    if (document.getElementById("cover").style.display == "none") {
        var newA = document.getElementById('csvcontainer');
        if (newA.style.display !== 'none') {
            $('div#csvcontainer').fadeOut("");
            $('div#cover').fadeOut("");
        } else {
            $('div#cover').fadeIn("");
            $('div#csvcontainer').fadeIn("");
        }
        document.getElementById("announcementsBoard").style.display = "none";
        document.getElementById("csvBtn").style.opacity = "0.5";
        document.getElementById("overlay").style.display = "block";
    }
}
/*open settings ui*/
var newGroupBtn = document.getElementById('settings');
newGroupBtn.onclick = function() {
    if (document.getElementById("csvcontainer").style.display == "none") {
        var newA = document.getElementById('settingscontainer');
        if (newA.style.display !== 'none') {
            $('div#settingscontainer').fadeOut("");
            $('div#cover').fadeOut("");
        } else {
            $('div#cover').fadeIn("");
            $('div#settingscontainer').fadeIn("");
            document.getElementById("groupname").value = document.getElementById('title-text').innerHTML;
        }
        document.getElementById("announcementsBoard").style.display = "none";
        document.getElementById("csvBtn").style.opacity = "0.5";
        document.getElementById("overlay").style.display = "block";
    }
}

window.addEventListener('click', function(e) { //detect outside click
    //TODO condition for multiple windows
    if (!document.getElementById('settingscontainer').contains(e.target) && !document.getElementById('settings').contains(e.target)) {
        if (document.getElementById('settingscontainer').style.display !== 'none') {
            $('div#settingscontainer').fadeOut("fast");
            $('div#cover').fadeOut("");
        }
    }
    if (!document.getElementById('csvBtn').contains(e.target) && !document.getElementById('csvcontainer').contains(e.target)) {
        if (document.getElementById('csvcontainer').style.display !== 'none') {
            $('div#csvcontainer').fadeOut("fast");
            $('div#cover').fadeOut("");
        }
    }
    if (!document.getElementById('popcontainer').contains(e.target) &&
        !document.getElementById('titleBtn').contains(e.target) &&
        !document.getElementById('postBtn').contains(e.target)) {
        $('div#popcontainer').fadeOut("fast");
    }
})

function save() { //TODO connect backend to settings
    //if(){} //TODO error message if new group name is not unique?
    console.log(document.getElementById("groupname").value); //backend new group name
};

/*Write announcement*/
function submit() {
    var title = document.getElementById("titleBtn").value;
    var text = document.getElementById("text").innerHTML;
    if (title == "" || text == "") {
        alert("Missing text field");
    } else {
        $('.pop-container').fadeOut(); //removes dropdown on exit
        document.getElementById('usr').value = ""; //clears text field on successful submit
        document.getElementById('text').value = ""; //@TODO doesnt work!!
        console.log(title); //backend announcement data
        console.log(text); //backend announcement data
        console.log(document.getElementById('title-text').innerHTML); // backend module code used to identify which module message belongs to
        add_announcement(title, text); //calls add func, replace paramters with backend call
    }
};

/*Add announcement*/
function add_announcement(title, text) {
    var new_announcement = document.createElement("div");
    var my_container = document.getElementById("announcements-container")
    var urgent_flag = document.createElement("div");
    var del = document.createElement("div");
    new_announcement.classList.add("del");
    new_announcement.appendChild(urgent_flag); //adds urgent flag
    new_announcement.appendChild(del);
    my_container.appendChild(new_announcement);
    new_announcement.classList.add("post");
    var text_container = document.createElement("div");
    text_container.classList.add("text-container");
    var close = document.createElement("div");
    close.classList.add("close");

    /*urgent flag, currently not in use, too lazy to change else*/
    if (title == "aaaaaaaaaaaaaaaaaaaa") { //set subject as aaaaaaaaaaaaaaaaaaaa for urgent flag idk
        new_announcement.classList.add("urgent");

    } else {
        //text_container.style.marginRight = "10px";
        text_container.classList.add("extra-margin");
        close.style.marginLeft = "10px";
    }
    new_announcement.appendChild(text_container); //adds urgent flag
    new_announcement.id = "announcement-module";
    text_container.innerHTML += text;
    console.log("created announcement");

    close.onclick = function() {
        deleteannouncement(this);
        return false;
    }
    new_announcement.appendChild(close);

}
/*load in modules after page is opened initially*/
$(document).ready(function() {
    if (screen.width <= 1024) { //testing for screen width
        console.log(screen.width)
    }
    for (var i = 0; i < json.length; i++) { //backend loops through list of modules
        var obj = json[i];
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
});
/*
 * update() changes divs/text to match selected module
 * id module-name : selected module
 * id title-text : top title text
 */
function update(e) {
    document.getElementById('title-text').innerHTML = e.innerHTML;
    $('.post').remove(); //clears existing announcements
    $('.students').remove(); //clears existing students
    document.getElementById("settings").style.display = 'block';
    for (var i = 0; i < json.length; i++) {
        var obj = json[i];
        if (obj.ModuleName == e.innerHTML) {
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
                text.id = "student-name";
                text.innerHTML = obj.students[x]; //backend load students
                //new_mod.appendChild(close);

                text.onclick = function() {
                    removestudent(this, e.innerHTML, text.innerHTML);
                    return false; //TODO fix this
                }
                new_mod.appendChild(text);
            }

        }
    }
    if (screen.width <= 1024) { //condition for mobiles
        document.getElementById("right").style.display = "none";
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

/*Some responsive stuff*/
function respModules() {
    console.log("display");
    var student = document.getElementById("right")
    if (document.getElementById("left").style.display === 'block') {
        document.getElementById("left").style.display = "none";
    }
    if (student.style.display === 'block') {
        student.style.display = "none";
    } else {
        student.style.display = "block";
    }
}

function respStudents() {
    console.log("display");
    var tab = document.getElementById("left")
    if (document.getElementById("right").style.display === 'block') {
        document.getElementById("right").style.display = "none";
    }
    if (tab.style.display === 'block') {
        tab.style.display = "none";
    } else {
        tab.style.display = "block";
    }
}

function save() {
    //TODO
}

function deleteforever() {
    //TODO
}
