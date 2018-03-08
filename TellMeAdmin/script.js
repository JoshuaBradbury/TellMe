



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
  var title = document.getElementById("usr").value;
  var text = document.getElementById("text").innerHTML;
  if(title == "" || text == "") {
    alert("Missing text field");
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
  urgent_flag.classList.add("urgent-flag");


  //new_announcement.appendChild(urgent_flag);
  my_container.appendChild(new_announcement);
  new_announcement.classList.add("post");
  new_announcement.id = "announcement-module";
  new_announcement.innerHTML += text;
  console.log("created announcement");
  var close = document.createElement("h1");
  close.classList.add("close");
  close.onclick = function() {
    deleteannouncement(this); return false;
  }
  new_announcement.appendChild(close);

}
/*load in modules after page is opened initially*/
$(document).ready(function(){

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
      add_announcement(obj.Announcements[j],obj.Announcements[j]); //change when format is decided
}
        for(var x = 0; x < obj.students.length; x++) {
            var new_mod = document.createElement("div");
            var my_container = document.getElementById("left");
            new_mod.classList.add("students");

            my_container.appendChild(new_mod);
            var text = document.createElement("h1");
            text.id = "student-name";
            text.innerHTML = obj.students[x];
            text.onclick = function() {
              update(this); return false;
            }
            new_mod.appendChild(text);
        }

    }
}

}

/*Delete announcement*/
function deleteannouncement(e) {
  var answer = confirm("Delete this announcement?")
  if (answer) {
    e.parentNode.parentNode.removeChild(e.parentNode);
  }
  else {
    //some code
  }
}
