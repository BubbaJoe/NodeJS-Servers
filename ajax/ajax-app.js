const express = require('express')
import Unsplash from 'unsplash-js';
 
const unsplash = new Unsplash({
  applicationId: "8f65e68fddf8e62d1da2d53456a5cc5661e5d62966b3400527d006e77e85a2cb",
  secret: "f7a6fe1a20b48ec6ca6d78f000e81eb8e4dd11def73699ab64583cffd1388a2c",
  callbackUrl: "urn:ietf:wg:oauth:2.0:oob"
});

const authenticationUrl = unsplash.auth.getAuthenticationUrl([
  "public",
]);

var app = express()

app.use('/', express.static(__dirname + '/ajax'))

app.listen(80, () => {
    console.log("Server started")
});

