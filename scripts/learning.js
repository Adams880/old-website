var username = 'adams880';

$(function () {
    $("#description").click(function () {
        $(this).text("Get the sweet JavaScript with JQuery going bois");
    });
});

jQuery.fn.loadGithubRepos = function () { //create jQuery function
    //TODO: Potentially use the Bootstrap 4 cards to display the different repos
    var target = this; //sets target to the div element that called this function
    //console.log(target);
    var list = $('<ul>'); //starts the list element that we will use to organize the repos
    $.githubJSON(username, function (data) { //call jQuery function githubJSON and set the callback function to the following lines
        var repos = data.data; //grab the array "data" from the JSON object returned from api.github.com
        sortRepos(repos);

        $(target).text(""); //clears out the target element
        target.append(list); //adds the list to the target div element
        $(repos).each(function () { //loop through each repo in JSON obj
            if (this.name != username.toLowerCase() + 'github.com') { //keeps the website repo from showing (not working lol)
                //adds the information for each repo to the list
                list.append('<li><a href="' + this.html_url + '">' + this.name + '</a><p style="font-weight: bold">' + this.language + '</p></li>');
            }
        });
        list.append('</ul>') //add closing tag to list
    })

    function sortRepos(repos) {
        //sort repositories by name, handles digit names
        repos.sort(function (a, b) {
            return a.name - b.name;
        });
    }
}
/*$(function () {
    $("#javascriptTest").click(function () {
        $(this).text("Changed Test");
        var target = this;
        console.log(target);
        var list = $('<ul>');
        $.githubJSON(username, function (data) {
            //var data = $.getJSON('https://api.github.com/users/' + username + '/repos?callback=?', callback);
            var repos = data.data;
            sortRepos(repos);

            $(target).text("");
            target.append(list);
            $(repos).each(function () {
                if (this.name != username.toLowerCase() + 'github.com') {
                    list.append('<li><a href="' + this.html_url + '>"' + this.name + '<p style="font-weight: bold">' + this.language + '</p></li>');
                }
            });
            list.append('</ul>')
        })
    });

    function sortRepos(repos) {
        repos.sort(function (a, b) {
            return a.name - b.name;
        });
    }
});*/

jQuery.githubJSON = function (username, callback) {
    $.getJSON('https://api.github.com/users/' + username + '/repos?callback=?', callback)
}

function initRepos(data) {
    var repos = data.data;
    repos = sortRepos(repos);
    return repos;
}