import Ember from "ember";

var ForecastController = Ember.Controller.extend({

	needs: ['location'],

	sortedDays: function(){
		return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
			sortProperties: ['timestamp'],
			content: this.get('model.daily')
		});
	}.property('this.model.daily.@each.timestamp'),

	// forecast.io returns a daily percipitation amount
	// we will add up their values to get the week's total
	rainfall: function(){
		var rain = this.get('model.daily').reduce(function(previousValue, day){
			var precip = day.precipIntensityMax ? day.precipIntensityMax : 0;
			return previousValue + precip;
		},0);
		return Math.round(rain * 100) / 100;
	}.property('this.model.daily.@each.precipIntensityMax'),

	// forecast.io returns a daily average cloudcover value that we can use to calculate average sunshine
	// we will add up their values over the week, dive by 7 and get the average
	cloudCover: function(){
		var length = this.get('model.daily').length;
		var clouds = this.get('model.daily').reduce(function(previousValue, day){
			return previousValue + day.cloudCover;
		},0);
		return Math.round((clouds / length) * 100) / 100;
	}.property('this.model.daily.@each.cloudCover'),

	actions: {
		getForecast: function(){
			var self = this;
			var locationController = this.get('controllers.location');
			var startDay = moment(this.get('startDate'), 'YYYY-MM-DD');
			var endDay = moment(this.get('endDate'), 'YYYY-MM-DD');
			var difference = endDay.diff(startDay, 'days');
			var currently = this.get('model.currently');
			var coords = this.get('model')._coordinates;

			locationController.set('loading', true);

			var days = [];
			for(var i=0; i<=difference; i++){

				var day = "days[]=" + moment(startDay, 'YYYY-MM-DD').add(i, "d").format("X");
				days.push(day);
			}

			if(difference >= 1){
				Ember.$.getJSON('range.php?path=' + coords + '&days=' + days.join('&')).then(function(forecast){
					forecast.daily.removeObject(forecast.daily[0]);
					forecast.daily.forEach(function(day){
						day.timestamp = day.time;
						day.time = moment(day.time, 'X').format('ddd MM-YY');
					});
					forecast.currently = currently;
					forecast._coordinates = coords;
					self.set('model', forecast);
					locationController.set('loading', false);
				});
			}
		}
	}

});

export default ForecastController;