//Dependencies
let express = require('express');

//Create an instance of the express app
let app = express();

//Sets the port of the application
//process.env.PORT allows the app to use the port assigned by Heroku
let PORT = process.env.PORT || 3000;

//Sets up the express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const CONTACT_ADDRESS = 'me@company.com';

var mailer = require('nodemailer').createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_PASSWORD,
  }
});

app.post('/contact', function(req, res) {
  mailer.sendMail({
    from: req.body.from,
    to: [CONTACT_ADDRESS],
    subject: req.body.subject || '[No subject]',
    html: req.body.message || '[No message]',
  }, function(err, info) {
    if (err) return res.status(500).send(err);
    res.json({success: true});
  })
});

//Starts the server and allows it to listen to client requests
app.listen(PORT, function() {
    //log showing that the server has started
    console.log("Server listening on: http://localhost:" + PORT);
});