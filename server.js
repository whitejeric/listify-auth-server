const express = require('express');
const cors = require('cors');
require('dotenv').config();

const SpotifyWebApi = require('spotify-web-api-node');

const app = express();

app.use(cors()); // to handle cross origin requests
app.use(express.json()); // to parse json

const credentials = {
	clientId: process.env.CLIENT_ID,
	clientSecret: process.env.CLIENT_SECRET,
	redirectUri: process.env.REDIRECT_URI,
};

app.get('/', (req, res) => {
	console.log('listify server');
});

//TODO fix weird extra error
// a login route requests the code from the client side and then
// asks for accesstoken from the api
app.post('/login', (req, res) => {
	//  setup
	let spotifyApi = new SpotifyWebApi(credentials);

	//  Get the "code" value posted from the client-side and get the user's accessToken from the spotify api
	const code = req.body.code;

	// Retrieve an access token
	spotifyApi
		.authorizationCodeGrant(code)
		.then((data) => {
			// Returning the User's AccessToken in the json format
			res.json({
				accessToken: data.body.access_token,
			});
		})
		.catch((err) => {
			res.sendStatus(400);
		});
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});

//node server.js to host
