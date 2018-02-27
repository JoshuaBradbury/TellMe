
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
