let request = require('request');
let querystring = require('querystring');
let rp = require('request-promise');
const user= require("../data")


const constructorMethod = app => {
  
  let client_id = '0edee0583a08407fa148378bb88dcf68'; // Your client id thats provided form our application
  let client_secret = '7807b53ecdff4da3a2325ce589b798d2'; // Your secret id thats provided form our application
  let redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri thats added to our app via spotify. If the redirect uri isnt added to spotify acount app, it wont work
  let authorized = false;

  app.get('/', (req, res) => {
    res.render("authentication/static", {})    // default path thats just login
  })

  app.get('/login', function(req, res) {                         //path that hits the authorization path of spotify
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: 'user-read-private user-read-email',        //read rights that sptofy authorizes after successful login
        redirect_uri                                     //redirect uri after successful authorization.                              
      }))
  })
  
  app.get('/callback', function(req, res) {         //redirect uri path  // IF YOU HIT THIS PATH THERE IS AN ERROR AKA ITS A CALLBACK, AND IT NEVER REDIRECTS THROUGH LOGIN
    authorized = true
    let code = req.query.code || null
    let authOptions = {                               //this object is to retrieve a token from the spotify after a sucessful login.
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri,
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
      },
      json: true
    }
    request.post(authOptions, function(error, response, body) {   //this request takes the object and hits sptofys api which in the response of the body returns the token
      let access_token = body.access_token    //access token taken from body

      let uri = 'http://localhost:3000/logged'               //uri that is used after a successful callback and its our "logged" page
      res.redirect(uri + '?access_token=' + access_token)    // after the access token is gotten it will redirect to the the "logged" page with the access token in the header
      //IMPORTANT: ACCESS TOKEN HAS A 1 HOUR TIMEOUT PER SPOTIFY

      // FOR EAKRUM. This access token is only part of the logged header and needs to be checked for all. If the access token exists that means the user successfully logged in through spotify authentication
    })
  }) 
  
  app.get("/logged",async function (req,res) {    //logged path
    let access_token = req.query.access_token    //pulls access token from header. If possible maybe make the access token a cookie?
    const options = {                             //object used to hit spotifys api to get the data we need
      method: 'GET',
      uri: 'https://api.spotify.com/v1/me',
      headers: { 'Authorization': 'Bearer ' + access_token },
      json: true,  
    }
    let data = await rp(options)      //this will return a promise passing in the options object and returning the resulting data
    console.log(data)

    // //body.tracks.items[i].whatever property you need
          // /*body.display_name*/);


    let profilePicture = "/public/img/no-profile-picture-icon.jpg"     //if the image array is zero that means there is no image and should default to this
    if(data.images.length === 1){
        profilePicture = data.images[0].url;
     }
  
      res.render("authentication/logged", {
        profilePicture: profilePicture,
        Name: data.display_name,
        followers: data.followers.total,
        WebName: data.display_name,
      })
  })

  app.get("/UsTop50", async (req, res) => {
      res.render("authentication/playlists");   //this path never gets checked. Currently just rendered to see what is being done
  })


}

module.exports = constructorMethod;