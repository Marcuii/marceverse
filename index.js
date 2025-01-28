let myNav = document.querySelector(".navbar");
let myBrand = document.querySelector(".navbar-brand");
let myNavBtn = document.querySelector(".nav-btn");
let myCollapse = document.querySelector(".navbar-collapse");
let myNavLinks = document.querySelector(".navbar-nav");

let myServices = document.querySelectorAll(".s-rect");

let mybutton = document.querySelector("#myBtn");

console.log(myServices);
myServices.forEach((service) => {
  service.addEventListener("click", () => {
    if (service.children[1].className.includes("d-none")) {
      service.style.animation = "flip-vertical-right 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) both"
      service.style.boxShadow = "0rem 0rem 1.5rem 0.6rem rgba(var(--shadow-color), 0.5)"
      setTimeout(() => {
        service.children[1].classList.replace("d-none", "d-flex");
        service.children[0].classList.replace("d-flex", "d-none");
      }, 400);
    } else {
      service.style.animation = "flip-vertical-right-neg 0.8s cubic-bezier(0.455, 0.030, 0.515, 0.955) both"
      service.style.boxShadow = ""
      setTimeout(() => {
        service.children[1].classList.replace("d-flex", "d-none");
        service.children[0].classList.replace("d-none", "d-flex");
      }, 400);
    }
  });
});


// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 3 || document.documentElement.scrollTop > 3) {
    myNav.style.backgroundColor = "rgba(var(--background-color), 0.8)";

    myBrand.classList.replace("d-none", "d-flex");
    myBrand.classList.add("focus-in-contract");

    myNavBtn.classList.remove("col-12");

    myCollapse.classList.replace("col-md-12", "col-md-6");
    myCollapse.classList.replace(
      "justify-content-center",
      "justify-content-end"
    );

    myNavLinks.classList.remove("nav-text");

    mybutton.style.display = "block";
  } else if (
    document.body.scrollTop < 3 ||
    document.documentElement.scrollTop < 3
  ) {
    myNav.style.backgroundColor = "rgba(var(--background-color), 0)";

    myBrand.classList.replace("d-flex", "d-none");
    myBrand.classList.remove("focus-in-contract");

    myNavBtn.classList.add("col-12");

    myCollapse.classList.replace("col-md-6", "col-md-12");
    myCollapse.classList.replace(
      "justify-content-end",
      "justify-content-center"
    );

    myNavLinks.classList.add("nav-text");

    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
