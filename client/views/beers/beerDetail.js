Template.beerDetail.helpers({
  newTastingDate : function () {
    return moment(new Date()).format("YYYY-MM-DD");
  },
  firstTastedDate : function () {
    if (this.beer.firstTasted)
      return moment(this.beer.firstTasted).format("YYYY-MM-DD");
    else
      return 'Not yet tasted';
  },
  imageUrl : function() {

    if (this.image) {
      return this.image.url;
    }
    return null;
  }
});

Template.beerDetail.events({
  'submit form' : function (e) {
    e.preventDefault();

    var currentBeerId = this.beer._id,
      tastingDate = new Date(Date.parse($(e.target).find('#tastingDate').val())),
      rating = parseInt($(e.target).find('#tastingRating').val());

    var tastingAttributes = {
      tastingDate: tastingDate,
      rating: rating,
      comment: $(e.target).find('#tastingComment').val()
    };

    Meteor.call('beerAddTasting',
      currentBeerId,
      tastingAttributes
    );
  }
});
