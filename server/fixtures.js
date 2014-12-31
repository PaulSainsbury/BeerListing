// Fixture data

var Fixture = {
  createUsers : function () {
    var billId = Accounts.createUser({
      username: 'bill',
      email: 'paul+bill@digitaltinder.com',
      password: 'bill',
      profile: { name: 'Bill Billington'}
    });
    var bill = Meteor.users.findOne(billId);

    var aliceId = Accounts.createUser({
      username: 'alice',
      email: 'paul+alice@digitaltinder.com',
      password: 'alice',
      profile: { name: 'Alice Allerton'}
    });
    var alice = Meteor.users.findOne(aliceId);

    return {
      bill: bill,
      alice: alice
    };
  },
  createBreweries : function() {
    function addBrewery (name) {
      var id = Breweries.insert({
          name: name
        });
      return Breweries.findOne(id);
    }

    return {
      jackBlack: addBrewery('Jack Black'),
      darlingBrew: addBrewery('Darling Brew'),
      acesBrewWorks: addBrewery('Aces Brew Works')
    };
  },
  createBeerTypes : function() {
    function addBeerType (name) {
      var id = BeerTypes.insert({
          name: name
        });
      return BeerTypes.findOne(id);
    }

    return {
      ale: addBeerType('Ale'),
      ipa: addBeerType('India Pale Ale'),
      lager: addBeerType('Lager'),
      stout: addBeerType('stout')
    };
  },
  createBeers: function(users, breweries, beerTypes) {
    function addBeer (beer) {
      var id = Meteor.call('beerInsert', beer);
      console.log('Beer:', id);
      return Beers.findOne(id);
    }

    var now = new Date().getTime();

    var jackBlackLager = addBeer({
  		name: 'Jack Black Lager',
  		breweryId: breweries.jackBlack._id,  // The ID of the brewery that made this beer
  		alcohol: '5%',
  		servingType: 'Tap',  // Tap, Bottle, Can
      beerTypeId: beerTypes.lager._id, // the ID of the beer type (ale/lager/stout/etc)
   		notes: 'Light tasting'
  	});

    var jackBlackBuchersBlock = addBeer({
  		name: 'Jack Black Butchers Block',
  		breweryId: breweries.jackBlack._id,  // The ID of the brewery that made this beer
  		alcohol: '5%',
  		servingType: 'Tap',  // Tap, Bottle, Can
      beerTypeId: beerTypes.ale._id, // the ID of the beer type (ale/lager/stout/etc)
   		notes: 'Strong tasting'
  	});

    return {
      jbLager: jackBlackLager,
      jbBuchersBlock: jackBlackBuchersBlock
    };
  },
  createTastings: function(beers) {
    var now = new Date();
    Meteor.call('beerAddTasting',
      beers.jbLager._id,
      {
        tastingDate: new Date(now - (7 * 24 * 3600 * 1000)),
        rating: 10,
        comment: 'Awesome'
      }
    );
    Meteor.call('beerAddTasting',
      beers.jbLager._id,
      {
        tastingDate: new Date(now - (10 * 24 * 3600 * 1000)),
        rating: 5,
        comment: 'Mediocre'
      }
    );
  }
};


// Insert Data
if (Beers.find().count() === 0) {
  var users = Fixture.createUsers(),
    breweries = Fixture.createBreweries(),
    beerTypes = Fixture.createBeerTypes(),
    beers = Fixture.createBeers(users, breweries, beerTypes),
    beersWithTastings = Fixture.createTastings(beers);
}
