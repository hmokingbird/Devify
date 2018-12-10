(function($) {
    function getToken() {
        let q = window.location.search;
        let token = q.slice(14) 
        return token;
    }
    let access_token = getToken();
    $.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {
              'Authorization': 'Bearer ' + access_token
            },
        dataType: "json",
        success: function(body) {
            console.log(body);
            let profilePicture = body.images[0].url;
            let Name = body.display_name;
            let followers = body.followers.total;
            $("#profileImage").attr("src", profilePicture);
            $("#Name").append(Name);
            $("#Followers").append(followers);
        },
        error: function() {
            console.log("Error retrieving spotify API");
        }
    });
})(jQuery);