import Ember from "ember";

var ForecastRoute = Ember.Route.extend({
	model: function(){

		var geoLocation = this.modelFor('index');

		var blah = Ember.$.getJSON('proxy.php?path=' + geoLocation.coords.latitude + ',' + geoLocation.coords.longitude);
		console.log(blah);
		return blah;
		
	},
});

export default ForecastRoute;