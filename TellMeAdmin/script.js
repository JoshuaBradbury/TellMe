

/*titleBtn opens pop up when text field is pressed*/
document.getElementById('titleBtn').onclick = function() {
  console.log("clicked");

    $('div#popcontainer').fadeIn("");

  document.getElementById("announcementsBoard").style.display="none";
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
  document.getElementById("announcementsBoard").style.display="none";
  document.getElementById("postBtn").style.opacity = "0.5";
  document.getElementById("overlay").style.display = "block";
  $('body').click(function () {
     $('div#popcontainer').hide();
 });
}
/*open csv ui*/
var newGroupBtn = document.getElementById('csvBtn');

newGroupBtn.onclick = function() {
  var newA = document.getElementById('csvcontainer');

  if (newA.style.display !== 'none') {
    $('div#csvcontainer').fadeOut("");
  } else {
    $('div#csvcontainer').fadeIn("");

  }
  document.getElementById("announcementsBoard").style.display="none";
  document.getElementById("csvBtn").style.opacity = "0.5";
  document.getElementById("overlay").style.display = "block";


  $('body').click(function () {
     $('div#csvcontainer').hide();

 });
}
/* NOT SURE WHAT THIS DOES BUT IT BREAKS THE CODE
$(document)
  .one('focus.autoExpand', 'textarea.autoExpand', function() {
    var savedValue = this.value;
    this.value = '';
    this.baseScrollHeight = this.scrollHeight;
    this.value = savedValue;
  })
  .on('input.autoExpand', 'textarea.autoExpand', function() {
    var minRows = this.getAttribute('data-min-rows') | 0,
      rows;
    this.rows = minRows;
    rows = Math.ceil((this.scrollHeight - this.baseScrollHeight) / 16);
    this.rows = minRows + rows;
  });

/*Write announcement*/
function submit(){
  var title = document.getElementById("titleBtn").value;
  var text = document.getElementById("text").innerHTML;
  if(title == "" || text == "") {
    alert("Missing text field");
    console.log(title);
    console.log(text);
  } else {
  $('.pop-container').fadeOut(); //removes dropdown on exit
  document.getElementById('usr').value=""; //clears text field on successful submit
  document.getElementById('text').value=""; //@TODO doesnt work!!
    console.log(title);
    console.log(text);
    console.log(document.getElementById('title-text').innerHTML); //module code used to identify which module message belongs to
    add_announcement(title, text); //calls add func
  }

};

/*Add announcement*/
function add_announcement(title, text) {
  var new_announcement = document.createElement("div");
  var my_container = document.getElementById("announcements-container")
  var urgent_flag = document.createElement("div");



  new_announcement.appendChild(urgent_flag); //adds urgent flag
  my_container.appendChild(new_announcement);
  new_announcement.classList.add("post");
  var text_container = document.createElement("div");
  text_container.classList.add("text-container");
  var close = document.createElement("div");
  close.classList.add("close");

/*urgent flag, currently not in use*/
  if(title == "urgent") { //change
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
    deleteannouncement(this); return false;
  }
  new_announcement.appendChild(close);

}
/*load in modules after page is opened initially*/
$(document).ready(function(){
  if (screen.width <=1024) { //testing for screen width
    console.log(screen.width )
  }
    for(var i = 0; i < json.length; i++) {
        var obj = json[i];
        var new_mod = document.createElement("div");
        var my_container = document.getElementById("right");
        new_mod.classList.add("modulemodule");

        my_container.appendChild(new_mod);
        var text = document.createElement("h1");
        text.id = "module-name";
        text.innerHTML = obj.ModuleName;
        text.onclick = function() {
          update(this); return false;
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

  for(var i = 0; i < json.length; i++) {
    var obj = json[i];
    if(obj.ModuleName == e.innerHTML){
      for(var j = 0; j < obj.Announcements.length; j++) {
      add_announcement(obj.Announcements[j],obj.Announcements[j]); //TODO change when format is decided
}
        for(var x = 0; x < obj.students.length; x++) {
            var new_mod = document.createElement("div");
            var my_container = document.getElementById("left");
            new_mod.classList.add("students");

            var close = document.createElement("div");
            close.classList.add("close"); //TODO change to custom close element for students
            my_container.appendChild(new_mod);
            var text = document.createElement("h1");
            text.id = "student-name";
            text.innerHTML = obj.students[x];
            new_mod.appendChild(close);

            close.onclick = function() {
              removestudent(this, e.innerHTML, text.innerHTML); return false; //TODO fix this
            }
            new_mod.appendChild(text);
        }

    }
}
if (screen.width <=1024) { //condition for mobiles
  document.getElementById("right").style.display="none";
}
}
/*Remove student*/
function removestudent(e, course, student) {
  var answer = confirm("Remove " +  + " from " + course) //TODO fix this
  if (answer) {
    e.parentNode.parentNode.removeChild(e.parentNode);
  }
  else {  }
}
/*Delete announcement*/
function deleteannouncement(e) {
  var answer = confirm("Delete this announcement?")
  if (answer) {
    e.parentNode.parentNode.removeChild(e.parentNode);
  }
  else {  }
}

/*Some responsive stuff*/
function respModules(){
  console.log("display");
  var student = document.getElementById("right")
  if(document.getElementById("left").style.display === 'block'){
    document.getElementById("left").style.display="none";
  }
  if(student.style.display === 'block'){
    student.style.display="none";
  } else {
  student.style.display="block";
  }
}
function respStudents(){
  console.log("display");
  var tab = document.getElementById("left")
  if(document.getElementById("right").style.display === 'block'){
    document.getElementById("right").style.display="none";
  }
  if(tab.style.display === 'block'){
    tab.style.display="none";
  } else {
  tab.style.display="block";
}
}
