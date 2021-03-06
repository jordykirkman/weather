# Weather

Check out the actual app here: [Cloudy Day](https://cloudyday.herokuapp.com)

This is a small application that fetches your local forecast.
You can change the forecast date range to find historical weather data for your location.
You can also search for a new location by City, Zip or any locality keyword

The app uses HTML5 Geolocation, [Google Geolocate API](https://developers.google.com/maps/documentation/geocoding/) and [Forecast.io](https://developer.forecast.io/docs/v2/).

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/)
* [Ember CLI](http://www.ember-cli.com/)
* [PhantomJS](http://phantomjs.org/)

* [PHP proxy repo for weather](https://github.com/jordykirkman/weather-proxy)

## Installation

* `git clone <repository-url>` this repository
* change into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server --proxy http://127.0.0.1:8080` the proxy should point to an apache server pointed at the php repo, i use MAMP
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

