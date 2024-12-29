let mybutton = document.querySelector("#myBtn");
let myNav = document.querySelector(".navbar");
let myBrand = document.querySelector(".navbar-brand");
let myCollapse = document.querySelector(".navbar-collapse");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    mybutton.style.display = "block";

    myNav.style.backgroundColor = "rgba(241, 241, 241, 1)";
    myNav.style.transform = "scaleY(0.8)";

    myBrand.classList.remove('d-none');
    
    myCollapse.classList.replace("col-md-12", "col-md-6");
    myCollapse.classList.replace("justify-content-center", "justify-content-end");

} else if (document.body.scrollTop < 3 || document.documentElement.scrollTop < 3){
    mybutton.style.display = "none";

    myNav.style.backgroundColor = "rgba(0, 0, 0, 0)";
    myNav.style.transform = "scaleY(1)";

    myBrand.classList.add('d-none');

    myCollapse.classList.replace("col-md-6", "col-md-12");
    myCollapse.classList.replace("justify-content-end", "justify-content-center")

}
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}