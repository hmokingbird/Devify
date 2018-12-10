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
            let profilePicture = body.images[0].url;
            $("#profileImage").attr("src", profilePicture);
        },
        error: function() {
            console.log("Error retrieving spotify API");
        }
    });
})(jQuery);