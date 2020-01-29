function userInformationHTML(user) {
    return `
        <h2>${user.name}
            <span class="small-name">
                (@<a href=${user.html_url}" target="_blank">${user.login}</a>)
            </span>
        <h2>
        <div class="gh-content">
            <div class="gh-avatar">
                <a href="${user.html_url}" target="_blank">
                    <img src="${user.avatar_url}" width="80" height="80" alt="${user.login}"/>
                </a>
            </div>
            <p>Followers: ${user.followers} - Following ${user.following} <br> Respos: ${user.public_repos}</p>
        </div>`;
}

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

    $.when(
        $.getJSON(`https://api.github.com/users/${username}`) // get the JSON data from the API
    ).then(
        function(response) {
            var userData = response;
            $("#gh-user-data").html(userInformationHTML(userData)); // update the html with the found data
        }, function(errorResponse){
            if (errorResponse.status == 404) { // if it is not found:
                $("#gh-user-data").html(`<h2>No info found for user ${username}</h2>`);
            } else {
                console.log(errorResponse); // find out what the error actually is
                $("#gh-user-data").html(
                    `<h2>Error: ${errorResponse.responseJSON.message}</h2>` // tell the user what the error is
                );
            }
        }
    );
}