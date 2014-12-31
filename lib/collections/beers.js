Beers = new Meteor.Collection("beers");
Beers.allow({
  insert: function(){
    return true;
  },
  update: function(){
    return true;
  },
  remove: function(){
    return true;
  }
});

/*
 * This next bit feels a bit hacky, but I was re-using the "find via regex" in
 * multiple places and kept having to update each bit of code.
 * I couldn't find any better ways of sharing the "helper" function though
 * so now we have "Beers.helpers" - to contain the shared code.
*/
Beers.helpers = Beers.helpers || {};
Beers.helpers.searchByBeerName = function (beerName) {
    check(beerName, String);
    if (beerName === '') {
      beerName = '.';
    }
    var beerList = Beers.find( { name: new RegExp(beerName, 'i') } );
    return beerList;
};

Meteor.methods({
  beerInsert: function(beerAttributes) {
    check(beerAttributes, {
      name: String,
      breweryId: String,
      beerTypeId: String,
      alcohol: String,
      servingType: String,
      notes: Match.Optional(String)
    });

    if (['Tap', 'Bottle', 'Can'].indexOf(beerAttributes.servingType) < 0) {
      throw Meteor.Error('invalid-beer', "Serving Type must be one of 'Tap', 'Bottle', 'Can'.");
    }

    var foundBrewery = !!Breweries.findOne({ _id: beerAttributes.breweryId});
    if (!foundBrewery) {
      throw Meteor.Error('invalid-beer', "Cannot find the brewery referenced in this beer.");
    }

    var foundBeerType = !!BeerTypes.findOne({ _id: beerAttributes.beerTypeId});
    if (!foundBeerType) {
      throw Meteor.Error('invalid-beer', "Cannot find the beer type referenced in this beer.");
    }

    var beer = _.extend(beerAttributes, {
      firstTasted: null,
      averageRating: null,
      tastings: []
    });

    var beerId = Beers.insert(beer);

    var beerReturn = {
      _id: beerId
    };
    
    return beerReturn;
  },

  beerAddTasting: function(beerId, tastingAttributes) {
    check(beerId, String);
    check(tastingAttributes, {
      tastingDate: Date,
      rating: Match.Integer,
      comment: String
    });

    var beer = Beers.findOne({_id: beerId});
    if (!beer) {
      throw Meteor.Error('invalid-beertasting', "Cannot find the beer referenced in this tasting.");
    }

    // ensure we always have an array
    beer.tastings = beer.tastings || [];

    // seed the rating with the new tasting's value
    var rating = tastingAttributes.rating;
    for(var i=0; i < beer.tastings.length; i++) {
      rating += beer.tastings[i].rating || 0;
    }

    // calculate Average tasting and the first Tasted date
    var averageRating = Math.round(rating/(beer.tastings.length + 1) * 10)/10;
    var firstTasted = beer.firstTasted === null ? tastingAttributes.tastingDate : new Date(Math.min(beer.firstTasted, tastingAttributes.tastingDate));

    Beers.update(beerId, {
      $push: { tastings: tastingAttributes },
      $set: {
        averageRating: averageRating,
        firstTasted: firstTasted
      }
    });
  }

});
