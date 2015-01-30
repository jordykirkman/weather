import Ember from "ember";

var IndexRoute = Ember.Route.extend({
	model: function(){

	    return new Ember.RSVP.Promise(function(resolve) {

		      	navigator.geolocation.getCurrentPosition(showPosition);
				function showPosition(position){
					resolve(position);
				}

	    });

	},
	setupController: function(controller, model) {
		this._super(controller, model);
		this.transitionTo('index.forecast');
	}
});

export default IndexRoute;