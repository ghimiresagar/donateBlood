// Uncomment lines below ->  ---for publishing, when you want to publish, line 36, 47, 57


var express = require('express');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var path = require('path');

// integrate routing
var indexRouter = require('./routes/index');

var app = express();

const port = 5000;

//Set up mongoose connection
// var mongoose = require('mongoose').set('debug', true);
var mongoose = require('mongoose');

// database name
var mongoDB = 'mongodb+srv://sagardb:<password>@cluster0.z8jim.mongodb.net/donate_blood?retryWrites=true&w=majority';
// for local connection
// var mongoDB = "mongodb://127.0.0.1:27017/cs_survey";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// check if connection has succeeded
var db = mongoose.connection;
db.once('open', _ => {
  console.log('[INFO] Database connected!')
});

db.on('error', err => {
  console.error('[WARNING] Connection error!')
});

// cross origin resource sharing
// ---for publishing
// app.use(cors({ origin: 'http://surveycs.salemstate.edu' }));

// for using locally
app.use(cors({ origin: 'http://127.0.0.1' }));

// to let express accept json request and accept cookies setup
app.use(express.json());
app.use(cookieParser());

// tell express that we are serving static files
// ---for publishing
// app.use(express.static(path.join(__dirname, 'build')));

// when we hit the website, it goes into the landing page and serves the files
app.use('/', indexRouter);

// for any other location within the website, we still need express to serve the static files
// other CRUD operations are handled at userController.js
// ---for publishing
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname+'/build/index.html'));
// });

app.listen(port, () => {
  console.log(`Server running at ${port}`);
});

module.exports = app;
