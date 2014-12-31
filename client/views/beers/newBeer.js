Template.newBeer.helpers({
  tastingDate : function () {
    return moment(new Date()).format("YYYY-MM-DD");
  }
});

Template.newBeer.events({
  'click #newBrewery' : function(e) {
    e.preventDefault();
    var newBrewery = prompt('Enter Brewery Name:');
    var breweryId = Breweries.insert({
      name: newBrewery
    });

    $('#breweryId').val(breweryId);
  },
  'click #newBeerType' : function(e) {
    e.preventDefault();
    var newBeerType = prompt('Enter Beer Type:');
    var beerTypeId = BeerTypes.insert({
      name: newBeerType
    });

    $('#beerTypeId').val(beerTypeId);
  },
  'submit form' : function (e) {
    e.preventDefault();

    var form = $(e.target),
      beerName = form.find('#beerName').val(),
      breweryId = form.find('#breweryId').val(),
      alcohol = form.find('#alcohol').val(),
      servingType = form.find('#servingType').val(),
      beerTypeId = form.find('#beerTypeId').val(),
      notes = form.find('#beerNotes').val();

    var beerAttributes = {
  		name: beerName,
  		breweryId: breweryId,
  		alcohol: alcohol,
  		servingType: servingType,
      beerTypeId: beerTypeId,
   		notes: notes
  	};

    console.log(beerAttributes);

    var beerId = Meteor.call('beerInsert', beerAttributes, function(error, result) {
      Router.go('beerDetail', { beerId: result._id });
    });
  }
});
