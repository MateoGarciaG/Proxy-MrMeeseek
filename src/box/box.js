
/**
 * Prototipo Box
 */

// Import singlenton of MrMeeseeks
let singlentonMrMeeseeks = require('../mrMeeseeks/mrmeeseeks');

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
  return "MrMeeseeks";
}

Box.prototype.pressButton = function(reality) {
  // Parameter "reality" is the collection of MrMeeseks

  return "Press";
}

Box.prototype.getProtoMrMeeseeks = function() {
  return "proto";
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