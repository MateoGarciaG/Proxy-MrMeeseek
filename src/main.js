/**
 * Las historias de usuario a programar
 * se encuentran aqui:
 * https://www.youtube.com/watch?v=qUYvIAP3qQk
 */

// node.js modules
// importamos el singleton de la clase Box
// Si box es un paquete, es suficiente con
// require del directorio que la contiene
var importaBox = require("./box");

// creamos dos cajas: es la misma por singleton
var factoriaBox = importaBox.singletonBox;
var box = factoriaBox.getBox();
console.log(box.name);

var box2 = factoriaBox.getBox();
console.log(box2.name);

//  las cajas son la misma
console.assert(box === box2);
box2.name = "Jen's box";
console.log(box.name);

// creamos dos Meeseeks
// los Meeseeks son distintos
// el prototipo no cambia
var mrMeeseeks = box.createMrMeeseeks();

var mrMeeseeks2 = box.createMrMeeseeks();
mrMeeseeks2.messageOnCreate = "Caaaan dooooo!!";

console.assert(mrMeeseeks !== mrMeeseeks2);
console.assert(mrMeeseeks.messageOnCreate != mrMeeseeks2.messageOnCreate);

// obtengo el meeseeks proto y compruebo que su mensaje
// onCreate no ha cambiado: shadowing de la variable messageOnCreate
var proto = box.getProtoMeeseks();
console.assert(proto.messageOnCreate == "I'm Mr Meeseeks! Look at meeee!");
console.assert(proto != mrMeeseeks);

// creamos Mr Meeseeks con la caja
// Los meeseeks se añaden a un array
// para practicar este tipo de estructura
var reality = [];

// Historia de usuario: Jerry press button
console.log("\n ### Jerry press button ### \n");

box.pressButton(reality);
console.assert(reality.length == 1);

console.log("Rick: Open Jerry's stupid mayonnaise jar");
var lastMrMeeseeks = reality.length - 1;
reality[lastMrMeeseeks].makeRequest("open", "Jerry's stupid mayonnaise jar");
reality[lastMrMeeseeks].fulfillRequest();
// meeseeks deja de existir
reality.pop();
console.assert(reality.length == 0);

// Historia de usuario: Summer press button
console.log("\n ### Summer press button ### \n");

box.pressButton(reality);
console.assert(reality.length == 1);
console.log("Summer: I wanna be popular at school!");
reality[lastMrMeeseeks].makeRequest("be popular", "at school");
reality[lastMrMeeseeks].fulfillRequest();
reality.pop();
console.assert(reality.length == 0);

// // Historia de usuario: Beth press button
console.log("\n ### Beth press button ### \n");

box.pressButton(reality);
console.log("Beth: I wanna be a more complete woman!");
reality[lastMrMeeseeks].makeRequest("be a more complete", "woman");
reality[lastMrMeeseeks].fulfillRequest();
reality.pop();
console.assert(reality.length == 0);

// el prototipo no se ha visto alterado con accion
// proto.fulfillRequest();  => accion no definido

// // Historia de usuario: Jerry y su Mr Meeseeks press button
console.log("\n ### Jerry and Mr Meeseeks press button ### \n");

box.pressButton(reality);
console.assert(reality.length == 1);

console.log("Jerry: I would like to take two strokes off my golf game.");

reality[lastMrMeeseeks].makeRequest("take two strokes off", "my golf game");

// si cambiamos el "mensaje al crearse" del prototipo,
// cambia el de todos los meeseeks
// proto.messageOnCreate = "Caaaaaan dooooooo!!";
Object.getPrototypeOf(reality[lastMrMeeseeks]).messageOnCreate = "Hi!!";

// Mr Meeseeks creando meeseeks

let meeseeksNum = 3;
// el hoisting de funciones funciona con la declaracion de funciones
createBunchOfMeeseeks(meeseeksNum, reality, box);

console.assert(reality.length == meeseeksNum + 1);

// aprendiendo draw

// Array-Like Objects
var olla = {};

Object.getPrototypeOf(reality[0]).learnRequest(function draw(objeto) {
  function execute() {
    objeto["tomato"] = "";
    return "tomato" in objeto
      ? "That's a lower handycap stroke!!"
      : "I wanna die!!!";
  }
  // la ejecucion de la accion se aplaza hasta que sea invocada
  return execute;
}, olla);

// Todos los meeseeks menos uno dejan de existir
// selecciono todos los elementos del array menos el primero
// slice(start, end) => slice(0, -1) => desde el primero hasta el ultimo sin incluir
let nuMmeseeksToExplode = reality.slice(0, -1).length;

// hoisting de la funcion
explodeMrMeeseeks(nuMmeseeksToExplode, reality);

console.assert(reality.length == 1);

// aprendiendo short game
console.log("\nMr Meeseeks with a knife: What about your short game?");

// Array-Like Objects
var cazo = {};

reality[0].learnRequest(function putt(objeto) {
  function execute() {
    // notacion dot tambien funciona
    objeto.onion = "";
    return "onion" in objeto ? "Ohh, nice!!" : "Samantha is gona die!!!";
  }
  return execute;
}, cazo);

explodeMrMeeseeks(1, reality);
console.assert(reality.length == 0);

/**
 * crear un buen hatajo de meeseeks
 */

// el hoisting de funciones funciona con la declaracion de funciones
function createBunchOfMeeseeks(numMeeseeks, existence, rickBox) {
  for (let i = 1; i <= numMeeseeks; i++) {
    rickBox.pressButton(existence);
    console.log(
      "Mr Meeseeks: Could you help me get two strokes off Jerry's golf swim?"
    );

    // si añadimos accion() con makeRequest, la creamos de manera local en el objeto
    // asi que aunque añadamos accion() mediante learnRequest en el prototipo
    // JS encontrara accion() de make en el espacio de nombres local
    // y no la accion() creada en el prototipo (precedencia resolucion nombres)

    // reality[i].makeRequest("take two strokes off", "my golf game");
  }
}

/**
 * Explotar meeseeks a puñaos
 */

function explodeMrMeeseeks(numMeseeksToBlowOut, existence) {
  for (let i = 0; i < numMeseeksToBlowOut; i++) {
    // el primer meeseeks creado por jerry es el que primero explota
    // for/in no devuelve el array en el orden en el que fue creado
    // for/in necesitaria chequear si la propiedad es hasOwnProperty de reality
    existence.shift().fulfillRequest();
  }
}
