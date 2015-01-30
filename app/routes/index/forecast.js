import Ember from "ember";

var ForecastRoute = Ember.Route.extend({
	model: function(){

		var geoLocation = this.modelFor('index');

		return Ember.$.getJSON('proxy.php?path=' + geoLocation.coords.latitude + ',' + geoLocation.coords.longitude);
		
	},
});

export default ForecastRoute;