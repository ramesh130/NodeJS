//var _ = require('underscore');
var request = require('request');
var fs = require("fs")
var csv = require("fast-csv");

reverseGeocode = function (lat, lng) {
  //https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=XXXXXXXXXXXXXXX
  var key = "XXXXXXXXXXXXXXXX";

  var uri = "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=" + key;

  request({
    uri:uri,
  }, function(err,resp,body) {
    if (err) console.log("Error: " + err);
    var result;
    try {
      //console.log(body.results[0].address_components[1].short_name);
      result = JSON.parse(body);
      console.log(result.results[0].address_components.length);////address_components[1].short_name);

  	  for(i = 1; i < 3/*result.results[0].address_components.length*/; i++){
  	  	writableStream.write(result.results[0].address_components[i].short_name + ",");// + result.results[0].address_components[1].short_name + "\n");
  	  }
  	  writableStream.write("\n");
      
    } catch (err) {
      console.log("Exception: " + err);
      return;
    }
  });

};

//reverseGeocode("40.714224", "-73.961452");
//reverseGeocode("51.74353", "-0.03255");
//reverseGeocode("51.88802", "0.8119001");

var stream = fs.createReadStream("geo2.csv");
 
var csvStream = csv()
    .on("data", function(data){
         console.log(data[0] + " " + data[1]);

         reverseGeocode(data[0], data[1]);
    })
    .on("end", function(){
         console.log("done");
    });
 
stream.pipe(csvStream);

writableStream = fs.createWriteStream("out.csv");
