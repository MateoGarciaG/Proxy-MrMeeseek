/**
 * MrMeeseeks's Prototype
 *
 */

// Creation MrMeeseeks's Constructor Function which will have a "prototype" property that will
// be link to MrMeeseeks's Prototype
function MrMeeseeks() {
  // These properties can be also used by the
  // MrMeeseeks's prototype due to THIS
  this.messageOnCreate = "I'm Mr Meeseeks! Look at meeee!";
  this.messagesOnRequest = [
    "Oooh yeah! Can do!",
    "Yes sireee!",
    "Oh, yeah!, Yes, ma'am!",
  ];
}

// Message when a new MrMeeseeks is created
MrMeeseeks.prototype.speakOnCreate = function () {
  console.log(this.messageOnCreate);
};

//
MrMeeseeks.prototype.speakOnRequest = function () {
  // Get a random element from "this.messagesOnRequest" array
  let message = this.messagesOnRequest[
      Math.floor(Math.random() * this.messagesOnRequest.length)
    ];
  console.log(message);

  return message;
};

MrMeeseeks.prototype.makeRequest = function(desire, thing) {

  let closure = function(thingAction) {
    // closure
    function executeDesire() {
      // This closure will store the desire value
      // from "makeRequest()" and thingAction value
      // from "this.action()"
      return `${desire} ${thingAction}`;
    }
    // return closure
    return executeDesire;
  };

  // Creation of new property "this.action" which will have a
  // closure, remember that
  // closures stores/remember the variables/data from
  // its outside scopes
  this.action = closure(thing);

  this.speakOnCreate();


}

// Get finish the desire where this method
// will use this.action to get and execute the closure
MrMeeseeks.prototype.fulfillRequest = function() {
  // Execute closure
    return this.action() + " All done!!";
}

MrMeeseeks.prototype.learnRequest = function(desireFunction, thingToAccomplish) {
  // desireFunction is a function with a closure inside
  this.action = desireFunction(thingToAccomplish);
};

// MrMeeseeks's singleton
// Use a IIFE to get an OpenAPI and respect POLE rules
var factorySingleton = (function singletonMrMeeseeks() {

  const mrMeeseeksFromPrototype = new MrMeeseeks();

  return {
      get: function() {
          return mrMeeseeksFromPrototype;
      }
  };
})();

// Export MrMeeseeks's Singleton
exports.singletonMrMeeseeks = factorySingleton;