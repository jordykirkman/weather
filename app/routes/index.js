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
			var geoModel = {coordinates: position.coords.latitude + "," + position.coords.longitude, postalCode: {postalCode: undefined}};
			controller.set('model',  geoModel);

			Ember.$.getJSON('location.php?path=' + geoModel.coordinates).then(function(response){
				var locationModel = {coordinates: geoModel.coordinates};
				response.results[0].address_components.forEach(function(addressComponent){
					if(addressComponent.types[0] === "postal_code"){
						locationModel._postalCode = addressComponent.short_name;
					}
					locationModel[addressComponent.types[0]] = addressComponent.short_name;
				});
				self.transitionTo('location', locationModel);
			});
			
		}

		function routeWithoutPosition(){
			var geoModel = {coordinates: undefined, postalCode: {postalCode: undefined}};
			controller.set('model', geoModel);
		}
		
	}
});

export default IndexRoute;