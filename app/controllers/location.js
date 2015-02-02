import Ember from "ember";

var LocationController = Ember.Controller.extend({
	locationSearch: null,
	actions: {
		changeLocation: function(){
			var zip = encodeURIComponent(this.get('locationSearch')).toLowerCase();
			this.transitionToRoute('location', zip);
		}
	}

});

export default LocationController;