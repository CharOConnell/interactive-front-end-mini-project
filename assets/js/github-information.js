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

function repoInformationHTML(repos) {
    if (repos.length == 0) {
        return `<div class="clearfix repo-list">No repos!</div>`;
    }

    var listItemsHTML = repos.map(function(repo) {
        return `<li>
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                </li>`;
    });

    return `<div class="clearfix repo-list">
                <p>
                    <strong>Repo List:</strong>
                </p>
                <ul>
                    ${listItemsHTML.join("\n")} 
                </ul>
            </div>`; // stops us having to iterate through the new array, joins with a new line variable
}

function fetchGitHubInformation(event) {
    $("#gh-user-data").html("");
    $("#gh-repo-data").html("");
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
        $.getJSON(`https://api.github.com/users/${username}`), // get the JSON data from the API
        $.getJSON(`https://api.github.com/users/${username}/repos`)
    ).then(
        function(firstResponse, secondResponse) { // 2 JSON calls
            var userData = firstResponse[0]; // packed into arrays so we want the first one!
            var repoData = secondResponse[0];
            $("#gh-user-data").html(userInformationHTML(userData)); // update the html with the found data
            $("#gh-repo-data").html(repoInformationHTML(repoData));
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

$(document).ready(fetchGitHubInformation); // octocat profile will auto-display when page is loaded