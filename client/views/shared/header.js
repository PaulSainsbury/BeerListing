Template.header.events({
  'submit form': function(e) {
    e.preventDefault();

    var searchTerm = $(e.target).find('[name=header-search]').val();

    check(searchTerm, String);

    if (searchTerm === '') {
      throwError('Please enter a value before searching.');
      return;
    }

    Router.go('beersListSearch', {searchBeerName: searchTerm});
  }
});
