var fs = require('fs');

var restaurants = JSON.parse(fs.readFileSync('../json/restaurants.json'));
var hotels = JSON.parse(fs.readFileSync('../json/hotels.json'));

function addStarredProperty() {
  hotels.forEach(function(hotel) {
    var starred = false;
    hotel.restaurants.forEach(function(restaurant) {
      if (restaurants.includes(restaurant))
        starred = true;
      hotel.starred = starred;
    });
  });
}

(async function() {
  addStarredProperty();
  const starredHotels = hotels.filter(hotel => hotel.starred);
  console.log(starredHotels);
  fs.writeFile('../json/starred_hotels.json', JSON.stringify(starredHotels, null, 2), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
})();
