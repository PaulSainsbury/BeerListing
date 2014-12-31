Breweries = new Meteor.Collection("breweries"); 
Breweries.allow({
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
