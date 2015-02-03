import Ember from 'ember';
import { test, moduleFor } from 'ember-qunit';

// bring in the desired controller
moduleFor('controller:location/forecast', "forecast controller", {

  needs: ['controller:location'],
  setup: function () {},
  teardown: function () {}
});

test("average rainfall can handle unexpected number formats from api", function(){

  // this is what a model could look like with whole numbers, nulls and decimals
  var forecast = { daily: [
    {"precipIntensityMax": 0.75},
    {"precipIntensityMax": 1},
    {"precipIntensityMax": 0.7},
    {"precipIntensityMax": 0},
    {"precipIntensityMax": null}
  ]};
  var controller = this.subject();
  controller.set('model', forecast);

  
  // let's check that our computed property can handle all that
  ok(typeof controller.get('rainfall') === "number");
});