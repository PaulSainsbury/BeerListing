BeerTypes = new Meteor.Collection("beerTypes"); 
BeerTypes.allow({
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
