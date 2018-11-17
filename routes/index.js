let request = require('request');
let querystring = require('querystring');
const user= require("../data")
const userInfo = user.userData

const constructorMethod = app => {
  
  let client_id = '0edee0583a08407fa148378bb88dcf68'; // Your client id
  let client_secret = '7807b53ecdff4da3a2325ce589b798d2'; // Your secret
  let redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri
  let authorized = false;

  app.get('/', (req, res) => {
    res.render("authentication/static", {})
  })

  app.get('/login', function(req, res) {
    res.redirect('https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id: client_id,
        scope: 'user-read-private user-read-email',
        redirect_uri
      }))
  })
  
  app.get('/callback', function(req, res) {
    authorized = true
    let code = req.query.code || null
    let authOptions = {
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
    request.post(authOptions, function(error, response, body) {
      let access_token = body.access_token

      const options = {                                             //this is your request from the spotify web api the get requests that are happening
        url: 'https://api.spotify.com/v1/me',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };

      // use the access token to access the Spotify Web API
      request.get(options, async function(error, response, body) {
        try{
        console.log(/*body.display_name*/);
        let findUser = await userInfo.getUser(body.display_name) //checks if users unique spotify name already exists
        if(!findUser){
          await userInfo.addUser(body.display_name)  //if not adds user
        }
        }
        catch (error){
          throw error
        }
      });

      let uri = 'http://localhost:3000/logged'
      res.redirect(uri + '?access_token=' + access_token)

    })
  }) 
  
  app.get("/logged", (req,res) => {
    let access_token = req.query.access_token
    if (authorized === true){
      const options = {                                             //this is your request from the spotify web api the get requests that are happening
        url: 'https://api.spotify.com/v1/playlists/37i9dQZEVXbMDoHDwVN2tF?market=US',
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };

      // use the access token to access the Spotify Web API
      request.get(options, async function(error, response, body) {
        try{
        for (let i = 0; i< body.tracks.items.length; i++){
        await console.log(
        body.tracks.items[i].track.name
        //body.tracks.items[i].whatever property you need
        /*body.display_name*/);

        //}
      }
    }
        catch (error){
          throw error
        }
      });
      console.log(req.query.access_token) // access token in the url header to parse spotify data
      res.render("authentication/logged", {})
  }
    else res.redirect('/login')
  })


}

module.exports = constructorMethod;