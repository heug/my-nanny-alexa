var AlexaAppServer = require('alexa-app-server');
var verifier = require('alexa-verifier');

AlexaAppServer.start({
  server_root: __dirname,     // Path to root
  public_html: "public_html",
  app_dir: "apps",            // Where alexa-app modules are stored
  app_root: "/alexa/",        // Service root
  port: 8081,
  preRequest: function(json, req, res) {
    console.log("preRequest fired");
    if (!req.headers.signaturecertchainurl) {
      console.log('No signaturecertchainurl');
      console.log('req headers:', req.headers);
      console.log('req body:', req.body);
      return
    }

    req.rawBody = '';

    req.on('data', function(data) {
      req.rawBody += data;
    });

    req.on('end', function() {

      console.log('req headers:', req.headers);

      var er;

      try {
        req.body = JSON.parse(req.rawBody);
      } catch (error) {
        er = error;
        req.body = {};
      }

      var certUrl = req.headers.signaturecertchainurl;
      var signature = req.headers.signature;
      var reqBody = req.body;

      verifier(certUrl, signature, reqBody, function(err) {
        if (err) {
          console.error('error validating alexa cert:', err);
          res.status(401).json({ status: 'failure', reason: err });
        } else {
          return;
        }
      });
    });
  }
});
