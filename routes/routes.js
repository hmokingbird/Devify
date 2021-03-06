const express = require("express");
const router = express.Router();
let request = require("request");
const querystring = require("querystring");
const rp = require("request-promise");
const user = require("../data");

const client_id = "0edee0583a08407fa148378bb88dcf68"; // Your client id thats provided form our application
const client_secret = "7807b53ecdff4da3a2325ce589b798d2"; // Your secret id thats provided form our application
const redirect_uri = "http://localhost:3000/callback"; // Your redirect uri thats added to our app via spotify. If the redirect uri isnt added to spotify acount app, it wont work
authorized = false;

router.get("/", (req, res) => {
  res.render("authentication/static", {}); // default path thats just login
});

router.get("/login", function(req, res) {
  //path that hits the authorization path of spotify
  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      querystring.stringify({
        response_type: "code",
        client_id: client_id,
        scope: "user-read-private user-read-email", //read rights that sptofy authorizes after successful login
        redirect_uri //redirect uri after successful authorization.
      })
  );
});

router.get("/callback", function(req, res) {
  //redirect uri path  // IF YOU HIT THIS PATH THERE IS AN ERROR AKA ITS A CALLBACK, AND IT NEVER REDIRECTS THROUGH LOGIN
  authorized = true;
  let code = req.query.code || null;
  let authOptions = {
    //this object is to retrieve a token from the spotify after a sucessful login.
    url: "https://accounts.spotify.com/api/token",
    form: {
      code: code,
      redirect_uri,
      grant_type: "authorization_code"
    },
    headers: {
      Authorization:
        "Basic " +
        new Buffer(client_id + ":" + client_secret).toString("base64")
    },
    json: true
  };
  request.post(authOptions, function(error, response, body) {
    //this request takes the object and hits sptofys api which in the response of the body returns the token
    let access_token = body.access_token; //access token taken from body

    let uri = "http://localhost:3000/logged"; //uri that is used after a successful callback and its our "logged" page
    res.redirect(uri + "?access_token=" + access_token); // after the access token is gotten it will redirect to the the "logged" page with the access token in the header
    //IMPORTANT: ACCESS TOKEN HAS A 1 HOUR TIMEOUT PER SPOTIFY

    // FOR EAKRUM. This access token is only part of the logged header and needs to be checked for all. If the access token exists that means the user successfully logged in through spotify authentication
  });
});

router.get("/logged", async function(req, res) {
  //logged path
  let access_token = req.query.access_token; //pulls access token from header. If possible maybe make the access token a cookie?
  const options = {
    //object used to hit spotifys api to get the data we need
    method: "GET",
    uri: "https://api.spotify.com/v1/me",
    headers: { Authorization: "Bearer " + access_token },
    json: true
  };
  let data = await rp(options); //this will return a promise passing in the options object and returning the resulting data
  //   console.log(data)

  // //body.tracks.items[i].whatever property you need
  // /*body.display_name*/);

  let profilePicture = "/public/img/no-profile-picture-icon.jpg"; //if the image array is zero that means there is no image and should default to this
  if (data.images.length === 1) {
    profilePicture = data.images[0].url;
  }

  let MainSongFeedCollection = [
    //placeholder for database call just so i can use as a front end reference  //NEED DATABASE CALL WITH THIS OBJECT
    {
      _id: "4XOuT4tFDIYEfh61ra53oQ", //id of song is sptofys specific song reference code cause they all have a unique song reference id
      User: "Jonathan",
      Shared_Commment: "Check this song out!",
      Category: "US Top 50",
      Artist_name: "Testing",
      Song_name: "Hello",
      Album_cover_url: "testing.url",
      Stream_url: "https://open.spotify.com/embed/track/4XOuT4tFDIYEfh61ra53oQ",
      number_dailyplays: 10,
      number_Comments: 15,
      Comments: [
        {
          _id: "e423iu2jkd",
          Text: "User comment",
          UserID: "SpotifyUsername",
          Time: "2018-04-23"
        }
      ]
    },
    {
      _id: "4XOuT4tFDIYEfh61ra53oQ", //id of song is sptofys specific song reference code cause they all have a unique song reference id
      User: "Jonathan",
      Category: "US Top 50",
      Shared_Commment: "Check this song out!",
      Artist_name: "Testing",
      Song_name: "Hello",
      Album_cover_url: "testing.url",
      Stream_url: "https://open.spotify.com/embed/track/4XOuT4tFDIYEfh61ra53oQ",
      number_dailyplays: 10,
      number_Comments: 15,
      Comments: [
        {
          _id: "e423iu2jkd",
          Text: "User comment",
          UserID: "SpotifyUsername",
          Time: "2018-04-23"
        }
      ]
    }
  ];
  res.render("authentication/logged", {
    profilePicture: profilePicture,
    Name: data.display_name,
    followers: data.followers.total,
    WebName: data.display_name,
    commentData: MainSongFeedCollection
  });
});

router.get("/UsTop50", async (req, res) => {
  res.render("authentication/playlists"); //this path never gets checked. Currently just rendered to see what is being done
});

module.exports = router;
