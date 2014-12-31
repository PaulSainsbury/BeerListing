Router.configure({
  layoutTemplate: 'layout',
  //loadingTemplate: 'loading',
  //notFoundTemplate: 'notFound',
  waitOn: function() {
    return [Meteor.subscribe('beerTypes'), Meteor.subscribe('breweries')];
  }
});

Router.route('/',
  {
    name: 'home',
    template: 'beersList',
    waitOn: function() {
      return [Meteor.subscribe('findBeerByName', '')];
    },
    data: function() {
      return {beers: Beers.find({}, { sort: { averageRating: -1} })};
    }
});

Router.route('/beers/search/:searchBeerName?', {
  name: 'beersListSearch',
  template: 'beersList',
  waitOn: function() {
    return [Meteor.subscribe('findBeerByName', this.params.searchBeerName)];
  },
  data: function() {
    return {
      beers: Beers.helpers.searchByBeerName(this.params.searchBeerName)
    };
  }
});

Router.route('/beers/:beerId', {
    name: 'beerDetail',
    template: 'beerDetail',
    waitOn: function() {
      return [Meteor.subscribe('findBeerById', this.params.beerId)];
    },
    data: function() {
      if (!this.ready()) {
        return;
      }

      var beer = Beers.findOne({ _id: this.params.beerId }),
        brewery = Breweries.findOne({ _id: beer.breweryId}),
        beerType = BeerTypes.findOne({ _id: beer.beerTypeId });

      return {
        beer: beer,
        brewery: brewery,
        beerType: beerType
      };
    }
});
