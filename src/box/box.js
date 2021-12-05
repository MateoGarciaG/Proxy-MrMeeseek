
/**
 * Prototipo Box
 */

// Import singlenton of MrMeeseeks
let moduleMrMeeseeks = require('../mrMeeseeks/mrmeeseeks');

// * Creation of Box's Prototype
function Box() {
  this.name = "Rick's Box";
  // In function Constructor set mrMeeseeks's object 
  //to null because the creation of mrMeeseeks will be done by a method
  this.mrMeeseeks = null;
}

// * Creaction of "methods" of Prototype Box

// ? create a new object MrMeeseeks from the MrMeeseeks's prototype 
Box.prototype.createMrMeeseeks = function() {

  // We can use "this" inside a method of a prototype because the prototype has a property call "constructor" which in this case it's link to Box constructor's function which has these properties, so the Box prototype can access to them too.
  this.mrMeeseeks = !this.mrMeeseeks ? moduleMrMeeseeks.singletonMrMeeseeks.get() : null ;

  // Creation of new Object which it's link to MrMeeseeks prototype, this object is created "empty"
  return Object.create(this.mrMeeseeks);

}

Box.prototype.pressButton = function(reality) {
  // Parameter "reality" is the collection of MrMeeseks

  // Create the "clone" of MrMeeseeks
  let mrMeeseeksClon = this.createMrMeeseeks();
  mrMeeseeksClon.speakOnCreate();
  // Add MrMeeseeks's clon to array
  reality.push(mrMeeseeksClon);

}

Box.prototype.getProtoMrMeeseeks = function() {
  // Return the "original" MrMeeseeks, in this case it's the MrMeeseeks prototype
  return this.mrMeeseeks;
}

// Creation of Box's Singleton

// Using of IIFE to execute createSingletonBox()
var factorySingleton = (function createSingletonBox() {
  const singletonBox = new Box();

  function getBox() {
    return singletonBox;
  }

  // Return OpenApi of Box's module to get and respect POLE rules
  return {
    getBox
  }
})();

// Export the OpenApi object in a new property "singletonBox" of "exports" object
exports.singletonBox = factorySingleton;