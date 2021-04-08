var express = require('express');
var bodyParser = require('body-parser');
var Pusher = require('pusher');

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// to serve our JavaScript, CSS and index.html
app.use(express.static('./'));

var pusher = new Pusher({
  appId: '1183520',
  key: 'b630de3bf3853a953e20',
  secret:  'eef14c3086e46ceb0f62',
  cluster: "ap2",
  useTLS: true,
  disableStats: true
});

app.post('/pusher/auth', function(req, res) {
  var socketId = req.body.socket_id;
  var channel = req.body.channel_name;
  pusher.trigger("id", "client-text-edit", {
    message: "hello world"
  });
  var auth = pusher.authenticate(socketId, channel);
  res.send(auth);
});