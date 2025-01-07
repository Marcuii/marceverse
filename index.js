let myNav = document.querySelector(".navbar");
let myBrand = document.querySelector(".navbar-brand");
let myNavBtn = document.querySelector(".nav-btn");
let myCollapse = document.querySelector(".navbar-collapse");
let myNavLinks = document.querySelector(".navbar-nav");
let mybutton = document.querySelector("#myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 3 || document.documentElement.scrollTop > 3) {
    myNav.style.backgroundColor = "rgba(241, 241, 241, 0.8)";
    
    myBrand.classList.replace('d-none', 'd-flex');    
    
    myNavBtn.classList.remove("col-12");
    
    myCollapse.classList.replace("col-lg-12", "col-lg-6");
    myCollapse.classList.replace("justify-content-center", "justify-content-end");

    myNavLinks.classList.remove("nav-text");
    
    mybutton.style.display = "block";
  } else if (document.body.scrollTop < 3 || document.documentElement.scrollTop < 3){
    myNav.style.backgroundColor = "rgba(0, 0, 0, 0)";
    
    myBrand.classList.replace('d-flex', 'd-none');
    
    myNavBtn.classList.add("col-12");
    
    myCollapse.classList.replace("col-lg-6", "col-lg-12");
    myCollapse.classList.replace("justify-content-end", "justify-content-center")
    
    myNavLinks.classList.add("nav-text");

    mybutton.style.display = "none";
}}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}