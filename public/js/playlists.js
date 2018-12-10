(function($) {
    function getToken() {
        let q = window.location.search;
        let token = q.slice(14) 
        return token;
    }
    let access_token = "BQBTHWO9T5bJG96_PAkzxloJapAP2Ajw31eFt-y4vi144vz-KHEHqOtu1YruM_vZZLgNbwKQlGRAGy0WloXhSOJDxz8nsF0mQBAkmXQrrwjNv3TSmc0YjrG4lqZU8pwOO1L2hbt2MoqNkv_bMQPT31_6h1JqqlIP5o8HN2U"  //placeholder access token
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