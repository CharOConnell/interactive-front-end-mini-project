function sendMail(contactForm) { // new variable
    emailjs.send("gmail","rosie",{
        "from_name": contactForm.name.value,
        "from_email": contactForm.emailaddress.value,
        "project_request": contactForm.projectsummary.value
    }) // match the html file naming conventions
    .then(
        function(response) {
            console.log("SUCCESS", response); // successful
        },
        function(error) {
            console.log("FAILED", error); // if it failed
        }
    );
    return false; // to block from loading a new page
}