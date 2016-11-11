// var express  = require('express');
// var bodyParser = require('body-parser');
var AlexaAppServer = require('alexa-app-server');
// var verifier = require('alexa-verifier');

// var app = express();

// var PORT = process.env.port || 8123;

AlexaAppServer.start({
    server_root:__dirname,     // Path to root
    public_html:"public_html",
    app_dir:"apps",            // Where alexa-app modules are stored
    app_root:"/alexa/",        // Service root
    port:8080,
    preRequest: function(json,req,res) {
      console.log("preRequest fired");
      json.userDetails = { "name":"Bob Smith" };
    },
    postRequest: function(json,req,res) {
      json.dummy = "text";
    },
    // httpsPort:443,
    // httpsEnabled:true,
    // privateKey:'private-key.pem',
    // certificate:'cert.cer'
});


// alexa-verifier cleanup ===================================================

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// the alexa API calls specify an HTTPS certificate that must be validated.
// the validation uses the request's raw POST body which isn't available from
// the body parser module. so we look for any requests that include a
// signaturecertchainurl HTTP request header, parse out the entire body as a
// text string, and set a flag on the request object so other body parser
// middlewares don't try to parse the body again
// app.use(function(req, res, next) {
//   if (!req.headers.signaturecertchainurl) {
//     return next();
//   }
//   // mark the request body as already having been parsed so it's ignored by
//   // other body parser middlewares
//   req._body = true;
//   req.rawBody = '';
//   req.on('data', function(data) {
//     return req.rawBody += data;
//   });
//   req.on('end', function() {
//     var cert_url, er, error, requestBody, signature;
//     try {
//       req.body = JSON.parse(req.rawBody);
//     } catch (error) {
//       er = error;
//       req.body = {};
//     }
//     cert_url = req.headers.signaturecertchainurl;
//     signature = req.headers.signature;
//     requestBody = req.rawBody;
//     verifier(cert_url, signature, requestBody, function(er) {
//       if (er) {
//         console.error('error validating the alexa cert:', er);
//         res.status(401).json({ status: 'failure', reason: er });
//       } else {
//         next();
//       }
//     });
//   });
// });


