import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {

		this.resource('index', {path: ""}, function(){
			this.resource('location', {path: "/location/:_postalCode"}, function(){
				this.route('forecast', {path: "/forecast/:_coordinates"});
			});
		});

});

export default Router;
