import Ember from "ember";

var ForecastRoute = Ember.Route.extend({
	model: function(){

		var geoLocation = this.modelFor('location');
		return new Ember.RSVP.Promise(function(resolve) {
			Ember.$.getJSON('proxy.php?path=' + geoLocation.coordinates).then(function(forecast){
				resolve({daily: forecast.daily.data, currently: forecast.currently});
			});
		});

	},
	setupController: function(controller, model){
		this._super(controller, model);
		console.log(model);
		model.daily.removeObject(model.daily[0]);
		model.daily.forEach(function(day){
			day.time = moment(day.time, 'X').format('dddd');
		});
		model.currently.time = moment(model.currently.time, 'X').format('dddd');
	}
});

export default ForecastRoute;