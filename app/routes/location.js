import Ember from "ember";

var LocationRoute = Ember.Route.extend({

	model: function(params){

		// if we were sent to this route and there is a postal code in the url, lets geolocate by it
		// then send to the google location api then to fetch our addess
		return Ember.$.getJSON('lookup.php?path=' + params._postalCode).then(function(response){
			var coordinates = response.results[0].geometry.location.lat + "," + response.results[0].geometry.location.lng;
			var locationModel = {_coordinates: coordinates};
			response.results[0].address_components.forEach(function(addressComponent){
				// we want a few things specific here, lets specify some conditions
				if(addressComponent.types[0] === "postal_code"){
					locationModel._postalCode = addressComponent.short_name;
				} else if(addressComponent.types[0] === "locality"){
					locationModel.locality = addressComponent.long_name;
				} else {
					locationModel[addressComponent.types[0]] = addressComponent.short_name;
				}
			});
			return locationModel;
		});

	},
	setupController: function(controller, model) {
		this._super(controller, model);
		// auto transition to the forcast route when this model has fulfilled
		var today = moment().format('X');
		this.transitionTo('location.forecast', model._coordinates);
	}
});

export default LocationRoute;