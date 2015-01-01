Meteor.publish('findBeerByName', function(names) {
    return Beers.helpers.searchByBeerName(names);
});

Meteor.publish('findBeerById', function(beerId) {
  check(beerId, String);
  return Beers.find({ _id: beerId});
});

Meteor.publish('beerTypes', function() {
    return BeerTypes.find();
});

Meteor.publish('breweries', function() {
  return Breweries.find();
});

Meteor.publish('findImageByBeerId', function(beerId){
    var beer = Beers.findOne({ _id: beerId});
    if (beer) {
      return Images.find({ _id: beer.imageId });
    }
});
