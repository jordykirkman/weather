import Ember from "ember";

var DateView = Ember.TextField.extend({

	didInsertElement: function(){
		var today = moment().format("YYYY-MM-DD");
		this.set('max', today);
	},

});

export default DateView;