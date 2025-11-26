"use strict"

// opens and closes navigation menu
document.querySelector(".hamburger").addEventListener("click", () => {
  document.querySelector("nav").classList.toggle("active");
});

// Opens respective pages in a new tab
function openIG() {
  window.open('https://www.instagram.com', '_blank');
}

function openFB(){
  window.open('https://www.facebook.com', '_blank');
}

function openLI (){
  window.open('https://www.linkedin.com', '_blank');
}


const toggleBtn = document.getElementById("darkModeToggle");

// if dark mode is enabled in the local storage, add "dark" class to boday tag
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
}

// if toggleBtn exists, create an event listener
if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        // removes/adds dark class to body tag
        document.body.classList.toggle("dark");

        /*  if the body has a "dark" class, enable dark mode
         in the local storage and change the buttun text to Light Mode*/
        if (document.body.classList.contains("dark")) {
            localStorage.setItem("darkMode", "enabled");
            toggleBtn.textContent = "Light Mode";
        } else {
            localStorage.setItem("darkMode", "disabled");
            toggleBtn.textContent = "Dark Mode";
        }
    });
}
