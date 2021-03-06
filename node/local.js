var app = require('express')();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var ObjectId = require('mongoose').Types.ObjectId;
var Review = require('./reviewModel');

mongoose.connect('mongodb://127.0.0.1/opentrends');

var jsonParser = bodyParser.json();

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

var unirest = require('unirest'),
   MainURL = 'http://api.sentilo.cloud/';

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/data/mycars', function(req, res) {
  try {
      unirest
      .get(MainURL + 'data/mycars')
      .headers({
          'IDENTITY_KEY' : '0aa89b6ab1ea9bdc2df322f057f3253ad255621ea38b2c11490bc2bd59a6dba7'
      }).end(function(response){
          res.send(response.body);
      });
  } catch (err) {
    console.log(err);
  }
});

app.get('/data/vehicle_flow', function(req, res) {
  try {
      unirest
      .get(MainURL + 'data/vehicle_flow')
      .headers({
          'IDENTITY_KEY' : 'ea720a24e23f269b6d4cbe284e4f4edbf1eea7c94cd39be784b92cf5973d07c9'
      }).end(function(response){
          res.send(response.body);
      });
  } catch (err) {
    console.log(err);
  }
});

app.get('/catalog/mycars', function(req, res) {
  try {
      unirest
      .get(MainURL + 'catalog/mycars')
      .headers({
          'IDENTITY_KEY' : '0aa89b6ab1ea9bdc2df322f057f3253ad255621ea38b2c11490bc2bd59a6dba7'
      }).end(function(response){
          res.send(response.body);
      });
  } catch (err) {
    console.log(err);
  }
});

app.get('/catalog/pstreams', function(req, res) {
  try {
      unirest
      .get(MainURL + 'catalog/pstreams')
      .headers({
          'IDENTITY_KEY' : 'e020451b79f994b85d8da82f369b0b4783879843e6783c5e5848904ce895908c'
      }).end(function(response){
          res.send(response.body);
      });
  } catch (err) {
    console.log(err);
  }
});

app.get('/data/pstreams', function(req, res) {
  try {
      unirest
      .get(MainURL + 'data/pstreams')
      .headers({
          'IDENTITY_KEY' : 'e020451b79f994b85d8da82f369b0b4783879843e6783c5e5848904ce895908c'
      }).end(function(response){
          res.send(response.body);
      });
  } catch (err) {
    console.log(err);
  }
});

app.put('/data/pstreams', function(req, res) {
  try {
      unirest
      .put(MainURL + 'data/pstreams/pSensor1/100')
      .headers({
          'IDENTITY_KEY' : 'e020451b79f994b85d8da82f369b0b4783879843e6783c5e5848904ce895908c'
      }).end(function(response){
          res.send(response.body);
      });
  } catch (err) {
    console.log(err);
  }
});

app.get('/getReviews/:id', function(req, res) {
	var p_idCity = req.params.id;

	Review.find({
		idCity: p_idCity
	}, 'id idCity opinion stars date')
	.exec(function (err, reviews) {
		if (err) {
			console.log(err);
		} else {
			if (reviews !== null) {
				res.send({
					reviews
				})
			} else {
				res.send([])
			}
		}
	});
});

app.post('/sendReview', jsonParser, function(req, res) {
	var review = req.body;

	var reviewForDB = new Review({
	  idCity: req.body.idCity,
	  opinion: req.body.opinion,
	  stars: req.body.stars,
	});
	reviewForDB.save(function (err) {
		if (err) {
			console.log(err);
		} else {
			res.send({
				status: "OK"
			});
		}
	});

});

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

server.listen(8989);
