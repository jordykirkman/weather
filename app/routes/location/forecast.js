import Ember from "ember";

var ForecastRoute = Ember.Route.extend({
	model: function(params){

		return new Ember.RSVP.Promise(function(resolve) {
			Ember.$.getJSON('proxy.php?path=' + params._coordinates).then(function(forecast){
				resolve({daily: forecast.daily.data, currently: forecast.currently, _coordinates: params._coordinates});
			});
		});

	},
	setupController: function(controller, model){
		this._super(controller, model);

		// set the default date range for out forecast
		var today = moment().format("YYYY-MM-DD");
		var week = moment().add(7, 'days').format("YYYY-MM-DD");
		controller.set('startDate', today);
		controller.set('endDate', week);
		if(model){
			model.daily.removeObject(model.daily[0]);
			model.daily.forEach(function(day){
				day.timestamp = day.time;
				day.time = moment(day.time, 'X').format('dddd');
			});
			model.currently.time = moment(model.currently.time, 'X').format('dddd');
		}
	}
});

export default ForecastRoute;