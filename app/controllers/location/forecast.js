import Ember from "ember";

var ForecastController = Ember.Controller.extend({

	// forecast.io returns a daily percipitation amount
	// we will add up their values to get the week's total
	rainfall: function(){
		var rain = this.get('model.daily').reduce(function(previousValue, day){
			return previousValue + day.precipIntensityMax;
		},0);
		return Math.round(rain * 100) / 100;
	}.property('this.model.daily.@each.precipIntensityMax'),

	// forecast.io returns a daily average cloudcover value that we can use to calculate average sunshine
	// we will add up their values over the week, dive by 7 and get the average
	cloudCover: function(){
		var clouds = this.get('model.daily').reduce(function(previousValue, day){
			return previousValue + day.cloudCover;
		},0);
		return Math.round((clouds / 7) * 100) / 100;
	}.property('this.model.daily.@each.cloudCover'),

});

export default ForecastController;