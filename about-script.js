// Function to open the contact form modal
function openContactForm() {
    document.getElementById("contactFormModal").style.display = "block";
}

// Function to close the contact form modal
function closeContactForm() {
    document.getElementById("contactFormModal").style.display = "none";
}

// Close the modal if the user clicks anywhere outside the modal
window.onclick = function(event) {
    if (event.target === document.getElementById("contactFormModal")) {
        closeContactForm();
    }
}
