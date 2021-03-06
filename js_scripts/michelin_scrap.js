const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

async function getRestaurants() {
  var restaurants = [];
  for (page = 1; page <= 35; page++) {
    url = `https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-${page}`;
    response = await fetch(url);
    html = await response.text();
    const $ = cheerio.load(html);

    $('.poi_card-display-title').each(function() {
      var restaurantName = $(this).text();
      restaurantName = restaurantName.trim();
      restaurants.push(restaurantName);
    });
  }
  return restaurants;
}

(async function() {
  restaurants = await getRestaurants();
  console.log(restaurants);
  fs.writeFile('../json/restaurants.json', JSON.stringify(restaurants, null, 2), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
})();
