import Ember from "ember";

var LocationController = Ember.Controller.extend({
	locationSearch: null,

	actions: {
		changeLocation: function(){
			var search = encodeURIComponent(this.get('locationSearch')).toLowerCase();
			this.transitionToRoute('location', search);
		}
	}

});

export default LocationController;