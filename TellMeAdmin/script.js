
var newAnnouncementBtn = document.getElementById('postBtn');

newAnnouncementBtn.onclick = function() {
  var newA = document.getElementById('popcontainer');
  if (newA.style.display !== 'none') {
    newA.style.display = 'none';
  } else {
    newA.style.display = 'block';
  }
  document.getElementById("announcementsBoard").style.display="none";
  document.getElementById("postBtn").style.opacity = "0.5";
  document.getElementById("overlay").style.display = "block";
  $('body').click(function () {
     $('div#popcontainer').hide();
 });
 /*$('body').click(function () {
    $('div#announcementsBoard').hide();
});*/

}


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

function submit(){
  var title = document.getElementById("usr").value;
  var text = document.getElementById("text").innerHTML;
  if(title == "" || text == "") {
    alert("Missing text field");
  } else {
    console.log(title);
    console.log(text);
    add_announcement(title, text);
  }
};

/*Read text*/
function add_announcement(title, text) {
  var new_announcement = document.createElement("div");
  var my_container = document.getElementById("announcements-container")
  my_container.appendChild(new_announcement);
  new_announcement.classList.add("post");
  new_announcement.innerHTML += text;
  console.log("created announcement");

}
