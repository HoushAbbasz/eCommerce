"use strict"

let namePattern = /^[A-Za-z' -]+$/;
let mInitPattern = /^[A-Za-z]?$/

document.getElementById("contactForm").addEventListener("submit", function(event) {
    // prevents form from being submitted if the user clicks submit w/o the validation process
    event.preventDefault(); 
    
    let valid = true;
    let status = document.getElementById("formStatus");

    // sets the default value of the status and makes the text red for an error
    status.textContent = "";
    status.style.color = "red";

    // get form values by ID
    let fName = document.getElementById("firstName").value.trim();
    let lName = document.getElementById("lastName").value.trim();
    let mInitial = document.getElementById('middleInitial').value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();

    // validate name
    if (fName.length < 2 || !namePattern.test(fName)) {
        valid = false;
        status.textContent = "First name must be at least 2 characters long, only containing english letters, hyphens, or appostrophes";
    }

    if (mInitial.length > 1 || !mInitPattern.test(mInitial)) {
        valid = false;
        status.textContent = "Middle initial must be at most one letter long, no other characters are allowed.";
    }

    if (lName.length < 2 || !namePattern.test(lName)) {
        valid = false;
        status.textContent = "Last name must be at least 2 characters long, only containing english letters, hyphens, or appostrophes";
    }

    // checks for this format: str "@" str "." str
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (valid && !emailPattern.test(email)) {
        valid = false;
        status.textContent = "Please enter a valid email address.";
    }

    // check if this the comment is at least ten characters long 
    if (valid && message.length < 10) {
        valid = false;
        status.textContent = "Your message must be at least 10 characters long.";
    }

    // if valid form, update status and clear form
    if (valid) {
        status.style.color = "green";
        status.textContent = "Form submitted successfully!";
        alert(status.textContent);
        document.getElementById("contactForm").reset();
    }
});