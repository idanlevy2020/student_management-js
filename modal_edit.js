// Get the modal
const modal = document.querySelector(".modal");

// Get the <span> element that closes the modal
let span = document.querySelector(".close");

// When the user clicks on <span> (x), close the modal
span.onclick = function() { 
  modal.style.display = "none"; //close the modal
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none"; //close the modal
    }
};