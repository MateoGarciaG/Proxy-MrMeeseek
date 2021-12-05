/**
 * Test done by @dfleta
 */

const { expect } = require('@jest/globals');

// box configurado como paquete
const factory = require('../box');

test('Creo la caja usando su factoria', () => {
    expect(factory.singletonBox.getBox().name).toBe("Rick's box");
  });

test('Factoria devuelve siempre la misma caja (singleton)', () => {
    let box_primer = factory.singletonBox.getBox();
    let box_post = factory.singletonBox.getBox();
    expect(box_primer === box_post).toBe(true);
    
    // TO_BE_INSTANCE_OF

    function Box() {
        this.name = "Rick's box";
        this.mrMeeseeks = null;
    }
    let box_mocked = new Box();
    expect(box_primer).not.toBeInstanceOf(Box);
    expect(box_primer === box_mocked).toBe(false);
  });


/**
 * SCOPING
 * 
 * SETUP y TEARDOWN
 */ 

describe('scoping de beforeEach', () => {

    let box = null;

    // SETUP

    beforeEach( () => {
        // de poco sirve porque el closure ya se ha ejecutado
        box = factory.singletonBox.getBox();
    } );

    test('shadowing de variable messageOnCreate', () => {

      // OBJECT TO_HAVE_PROPERTY

      let meeseeks = box.createMrMeeseeks();
      expect(meeseeks).toHaveProperty('messageOnCreate');
      // messageOnCreate existe en el prototype de meeseeks
      // no en el objeto actual
      expect(meeseeks.hasOwnProperty('messageOnCreate')).toBeFalsy();

      // shadowing de variable: ahora existe en meeseeks
      meeseeks.messageOnCreate = "Caaaan dooooo!!";
      expect(meeseeks.hasOwnProperty('messageOnCreate')).toBeTruthy();

      // EXPECT.STRING_MATCHING

      // obtengo el meeseeks proto y compruebo que su mensaje
      // onCreate no ha cambiado: shadowing de la variable messageOnCreate
      let proto = box.getProtoMeeseks();
      expect(proto).toHaveProperty('messageOnCreate');
      expect(proto.messageOnCreate).toEqual(expect.stringMatching("I'm Mr Meeseeks! Look at meeee!"));
    });

    test('Presionando boton de la caja se añade meeseeks a la realidad', () => {

        let reality = [];
        box.pressButton(reality);

        // ARRAYS TO_HAVE_LENGHT

        // un meeseeks ha comenzado a existir
        expect(reality).toHaveLength(1);

        // OBJECT TO_HAVE_PROPERTY

        // el nuevo objeto no es nulo y es un meeseek
        expect(reality[0]).toHaveProperty('messageOnCreate', "I'm Mr Meeseeks! Look at meeee!");
          
        let meeseeks = box.getProtoMeeseks();
        expect(reality[0]).toEqual(expect.objectContaining(meeseeks));
        // toBeInstanceOf no puedo utilizarlo porque no tengo acceso
        // a la funcion constructora MrMeeseeks
    })
})