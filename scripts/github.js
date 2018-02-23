var username = 'adams880';

$(function () {
    $("#description").click(function () {
        $(this).text("Get the sweet JavaScript with JQuery going bois");
    });
});

jQuery.fn.loadGithubRepos = function () { //create jQuery function
    //TODO: Figure out how the fuck to get the damn row to break at 3
    var target = this; //sets target to the div element that called this function
    //console.log(target);
    //var list = $('<ul>');
    var list = $('<div class="row">'); //starts the row that will be used to hold the first 3 cards
    $.githubJSON(username, function (data) { //call jQuery function githubJSON and set the callback function to the following lines
        var repos = data.data; //grab the array "data" from the JSON object returned from api.github.com
        sortRepos(repos);

        $(target).text(""); //clears out the target element
        target.append(list); //adds the list to the target div element
        $(repos).each(function () { //loop through each repo in JSON obj
            if (this.name != username.toLowerCase() + 'github.com') { //keeps the website repo from showing (not working lol)

                //use col-md-4 to make the cards break after 3 being added. (12 cols total)
                list.append('<div class="col-md-4">' +
                    '<div class="card my-3">' +
                    '<div class="card-header"><a href="' + this.html_url + '">' + this.name + '</a><p class="right-text"><span class="glyphicon glyphicon-eye-open"></span>## ##</p></div>' +
                    '<div class="card-body">' + this.description + '</div>' +
                    '<div class="card-footer">Date Created: </div>' +
                    '</div>' +
                    '</div>');

                //EXTRA TEST CODE:

                // list.append('<div class="col">'); //OPENING COL DIV
                // list.append('<div class="card">'); //OPENING CARD DIV
                // list.append('<div class="card-header"><a href="' + this.html_url + '">' + this.name + '</a><p class="right-text">## ##</p></div>'); //insert number of watchers and etc in for the ## ##
                // list.append('<div class="card-body">' + this.description + '</div>'); //description of the project in the body of card
                // list.append('<div class="card-footer">Date Created: </div>'); //date created and last commit date
                // list.append('</div>'); //CLOSING CARD DIV
                // list.append('</div>'); //CLOSING COL DIV

                //adds the information for each repo to the list
                //list.append('<li><a href="' + this.html_url + '">' + this.name + '</a><p style="font-weight: bold">' + this.language + '</p></li>');
                // if (((count % 3) == 0) && count != 0) {
                //     list.append('</div>'); //add closing div for prev row
                //     list.append('<div class="row">'); //start new row
                // }
            }
        });
        list.append('</div>') //add closing div for the row
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