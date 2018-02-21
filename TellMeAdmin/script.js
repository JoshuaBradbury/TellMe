function validateForm() {
    var postBox = document.getElementsByClassName('pop-container');
    var popupBtn = document.getElementsByClassName('pop-input-mysize');
    postBox.style.display = "none";

    popupBtn.onclick = function() {
      postBox.style.display = "block";
    }

    window.onclick = function(event){
      if (event.target == postBox){
        postBox.style.display = "none";
      }
    }
}
