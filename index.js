//constants
var PORT = 8080;//Server port
var RESOLVETIME = 20000;//Time to simulate asynchronous request.
//Imports
var app = require('express')();//espress is a http router + server
var bodyParser = require('body-parser');
var hat = require('hat');//hat is use to generate random strings

// //ES6 Imports
// import express from 'express';
// import bodyParser from 'body-parser';
// import hat from 'hat';

//Asynchronous Processor
var processAsynchronously = function(input){
  return new Promise(function(resolve, reject){
    if(true){
      setTimeout(function(){
        resolve('The input was: ' + input);
      }, RESOLVETIME);

    }else{
      setTimeout(function(){
        reject(input + ' rejected!');
      }, RESOLVETIME);
    }
  })
};

//Dictionary to hold data.
var data = Object.create(null);

//Middleware
app.use(bodyParser.text());

//Routes
app.post('/', function(req, res){
  var key = hat();
  var input = req.body;
  console.log("---\n%s\n---\nWill be posted to /%s when ready.",
    input,
    key);
  processAsynchronously(input)
  .then(function(response){
    data[key] = response;
  });
  res
    .status(202)
    .json({
      ready : RESOLVETIME,
      path  : '/' + key,
      key    : key
    });
});
app.get('/:key', function(req, res){
  var key = req.params.key;
  var value = data[key];
  if(value !== undefined && data.hasOwnProperty(key)){
    console.log('Attempt to retreive key %s was successful :).', key);
    res.json({
      value : value;
    });
  }else{
    console.log('Attempt to retreive key %s failed :(.', key);
    res
      .status(404)
      .end('not yet ready');
  }
});

//Start Server
app.listen(8080, function(){
  console.log('Server running on port %s', PORT);
  console.log('POST raw text to /');
  console.log('GET text from /:id');
});
