var beerData = [
	{
		name: 'ABC',
		brewery: 'def',
		notes: 'ghi',
		alcohol: '5%',
		firstTasted: new Date()
	},
	{
		name: 'ABC',
		brewery: 'def',
		notes: 'ghi',
		alcohol: '5%',
		firstTasted: new Date()
	},
	{
		name: 'ABC',
		brewery: 'def',
		notes: 'ghi',
		alcohol: '5%',
		firstTasted: new Date()
	}
];

Template.beersList.helpers({
	beers : beerData
});