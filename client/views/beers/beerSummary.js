Template.beerSummary.helpers({
  breweryName : function () {
    console.log(this.breweryId);
    var brewery = Breweries.findOne({ _id: this.breweryId });
    return brewery ? brewery.name : 'Unknown Brewer';
  }
});

Template.beerSummary.events({
  'click div' : function (){
    Router.go('beerDetail', {beerId: this._id} );
  }
});
