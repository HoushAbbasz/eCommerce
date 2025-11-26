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

// Check saved preference
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
}

// Toggle when clicked
if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");

        if (document.body.classList.contains("dark")) {
            localStorage.setItem("darkMode", "enabled");
            toggleBtn.textContent = "Light Mode";
        } else {
            localStorage.setItem("darkMode", "disabled");
            toggleBtn.textContent = "Dark Mode";
        }
    });
}
