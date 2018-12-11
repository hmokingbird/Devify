(function($) {
    function getToken() {
        let q = window.location.search;
        let token = q.slice(14) 
        return token;
    }
    let access_token = "BQD3vAohAHc3ikXbjUpRc3tFUtDDcykcvjqP-Wyy--HRjYcu6YshVHl1AtsgQGtCE4XiskxpnqBTgNqEKKNT-P6qHQJgyLlE55ttQ7JFH-s3cAlDoG1Nv33LNuG1qtZ6LunrTCllnzoNVa1uelkTOjdNEwIGak4BW-jvXN0"  //placeholder access token
    $.ajax({
        url: 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF?market=US',
        headers: {
              'Authorization': 'Bearer ' + access_token
            },
        dataType: "json",
        success: function(body) {
            for (let i = 0; i< body.tracks.items.length; i++){
                let songID= body.tracks.items[i].track.id;
                let songName = body.tracks.items[i].track.name;
                let testing = `https://open.spotify.com/embed/track/${songID}`
                $(`#song${i}`).attr("src", testing)
                $(`.title${i}`).append(songName)
                //body.tracks.items[i].track.name
                // //body.tracks.items[i].whatever property you need
                // /*body.display_name*/);      
                //}
              }
        },
        error: function() {
            console.log("Error retrieving spotify API");
        }
    });
})(jQuery);