import Ember from "ember";

var LocationRoute = Ember.Route.extend({

	model: function(params){
		console.log("got to location route");
		console.log(params);
		// if we were sent to this route and there is a postal code in the url, lets geolocate by it
		// then send to the google location api then to fetch our addess

		return Ember.$.getJSON('lookup.php?path=' + params._postalCode).then(function(response){
			var coordinates = response.results[0].geometry.location.lat + "," + response.results[0].geometry.location.lng;
			var locationModel = {coordinates: coordinates};
			response.results[0].address_components.forEach(function(addressComponent){
				if(addressComponent.types[0] === "postal_code"){
					locationModel._postalCode = addressComponent.short_name;
				}
				locationModel[addressComponent.types[0]] = addressComponent.short_name;
			});
			return locationModel;
		});

	},
	setupController: function(controller, model) {
		this._super(controller, model);
		// auto transition to the forcast route when this model has fulfilled
		console.log(model);
		console.log("location setupController");
		this.transitionTo('location.forecast', model.coordinates);
	}
});

export default LocationRoute;