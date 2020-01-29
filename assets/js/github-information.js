function fetchGitHubInformation(event) {

    var username = $("#gh-username").val(); // jquery to get it
    if (!username) {
        $("#gh-user-data").html(`<h2>Please enter a GitHub username</h2>`); // again jquery
        return;
    } 
    
    $("#gh-user-data").html(
        `<div id="loader">
            <img src="assets/css/loader.gif" alt="loading..."/>
        </div>`);
}