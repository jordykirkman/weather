import Ember from "ember";

var LocationController = Ember.Controller.extend({
	locationSearch: null,

	// this toggles a little loading spinner in the header
	// seemed nice to have when loading non-model data
	loading: false,

	actions: {

		// this just forwards to the same route with a different url param
		// ember routing gets our model for us
		changeLocation: function(){
			var search = encodeURIComponent(this.get('locationSearch')).toLowerCase();
			this.transitionToRoute('location', search);
		}
	}

});

export default LocationController;