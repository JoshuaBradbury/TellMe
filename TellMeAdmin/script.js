function new_announcement_fade_in_out() {
  if ($('#popcontainer').css('display') !== 'none') {
    $('div#popcontainer').fadeOut("");
    $('#screen-cover').fadeOut("");
  } else {
    $('div#popcontainer').fadeIn("");
    $('#screen-cover').fadeIn("");
  }
}

//gets rid of screen cover if active and clicked on
$('#screen-cover').click(function() {
  if($(this).css('display') !== 'none') {
    new_announcement_fade_in_out();
  }
});

//add screen cover and pop container
$('#usr').click(function() {
  if($('#screen-cover').css('display') == 'none'){
    new_announcement_fade_in_out();
  }
});


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

document.getElementById('submitBtn').onclick = function(){

  var messageText = document.getElementById('new_announcement_text_box').innerHTML;
  var group = "testGroupName";
  var send = {"groupname" : group, "new_announcement_text" : messageText };

  var xhr = new XMLHttpRequest();
  xhr.open("POST", '/new_announcement', true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(send);

}

/*Read text*/
function add_announcement(title, text) {
  var new_announcement = document.createElement("div");
  var my_container = document.getElementById("announcements-container")
  my_container.appendChild(new_announcement);
  new_announcement.classList.add("post");
  new_announcement.innerHTML += text;
  console.log("created announcement");

}
