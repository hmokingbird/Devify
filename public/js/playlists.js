(function($) {
    function getToken() {
        let q = window.location.search;
        let token = q.slice(14) 
        return token;
    }
    let access_token = "BQDy-vFQMODAIPdQRWsosimrjcoMX5c0oMlxLPy65YjIOLg9KqlbpCV6nyDqsPoLUcm1lSPiMxRPVYcghhY0Y7r9MC18Wbs0LtYiDGFHwDEoaWcso_gLt80_dzTdL7v3kU8oWsqWeNey5Tp-LYGhVMAfi-Zu99xGCiryV10"  //placeholder access token
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