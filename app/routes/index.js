import Ember from "ember";

var IndexRoute = Ember.Route.extend({
	setupController: function(controller, model) {
		var self = this;
		
		// auto transition to the forcast route when this model has fulfilled
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(routeWithPosition);
		} else {
			routeWithoutPosition();
		}

		function routeWithPosition(position){

			// the HTML5 geolocation object will update iteslf, if we try to use it as a mode, it re-fetches itself over and over
			// so we need to set a flag to disallow it from triggering the location request more than once
			if(controller.get('geolocationCaptured') === false){
				controller.set('geolocationCaptured', true);
				var geoModel = {_coordinates: position.coords.latitude + "," + position.coords.longitude, postalCode: {postalCode: undefined}};
				controller.set('model',  geoModel);

				// lets fetch the location object from google since the browser suppots geolocation
				Ember.$.getJSON('location.php?path=' + geoModel._coordinates).then(function(response){
					var locationModel = {_coordinates: geoModel._coordinates};
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
					self.transitionTo('location', locationModel);
				});
			}
		}

		function routeWithoutPosition(){
			var geoModel = {_coordinates: undefined, postalCode: {postalCode: undefined}};
			controller.set('model', geoModel);
		}
		
	}
});

export default IndexRoute;