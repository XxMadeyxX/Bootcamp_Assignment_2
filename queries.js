/* Add all the required libraries*/
var mongoose = require('mongoose'),
  Listing = require('./ListingSchema.js'),
  config = require('./config');

/* Connect to your database using mongoose - remember to keep your key secret*/
mongoose.connect(config.db.uri, {useNewUrlParser: true, useUnifiedTopology: true});

/* Fill out these functions using Mongoose queries*/
//Check out - https://mongoosejs.com/docs/queries.html


  /*
    Find the document that contains data corresponding to Library West,
    then log it to the console.
   */
var findLibraryWest = function() {
   Listing.findOne({name: 'Library West'}, function(err, data){
     if (err) {
      throw err;
      }
     console.log(data);
   });
};

  /*
    Find the document with the code 'CABL'. This cooresponds with courses that can only be viewed
    on cable TV. Since we live in the 21st century and most courses are now web based, go ahead
    and remove this listing from your database and log the document to the console.
   */
   var removeCable = function() {
   mongoose.set('useFindAndModify', false);
   Listing.findOneAndRemove({code : 'CABL'}, function(err, data){
     if (err)
      throw err;
     if (data != null) {
        data.remove();
     }
      console.log(data);
     });
   };

  /*
    Phelps Lab address is incorrect. Find the listing, update it, and then
    log the updated document to the console.
   */
var updatePhelpsLab = function() {
   mongoose.set('useFindAndModify', false);
   Listing.findOneAndUpdate({name: 'Phelps Laboratory'}, "", function(err, data){
     if (err)
      throw err;
   data.address = '1953 Museum Rd, Gainesville, FL 32603';
   data.save(function (err){
     if (err) {
      console.log(err);
      throw err;
     }
   });
   });
};

  /*
    Retrieve all listings in the database, and log them to the console.
   */
var retrieveAllListings = function() {
  Listing.find({}, function(err, data){
     if (err)
      throw err;
    console.log(data);
  });
};

findLibraryWest();
removeCable();
updatePhelpsLab();
retrieveAllListings();
