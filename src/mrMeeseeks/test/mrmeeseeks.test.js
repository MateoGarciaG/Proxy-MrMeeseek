/**
 * Test done by @dfleta
 */

const { expect } = require('@jest/globals');

// mrmeeseks configurado como paquete
const factory = require('../mrmeeseeks');

test('Creo un meeseeks usando su factoria', () => {
    expect(factory.singleMrMeeseeks.get()).toBeTruthy;
  });

test('Los meeseeks creados son el mismo (singleton)', () => {
    let meeseeks_primer = factory.singleMrMeeseeks.get();
    let meeseeks_post = factory.singleMrMeeseeks.get();

    expect(meeseeks_post === meeseeks_primer).toBe(true);
});


/**
 * SCOPING
 * 
 * SETUP y TEARDOWN
 */ 

describe('scoping de beforeEach', () => {

    // variable local en este scope
    let meeseeks = null;
    let box = {};

    // SETUP

    beforeEach( () => {
        // inicialización de la variable local antes de cada caso test
        // de poco sirve porque el closure ya se ha ejecutado
        meeseeks = factory.singleMrMeeseeks.get();

        // MOCK FUNCTION

        /** 
         * Creo una funcion mock para emular el comportamiento de 
         * box.pressButton() que crea clones de meeseeks a partir
         * de su prototype con Object.create().
         * Así eliminamos la dependencia a box en los test. 
         */

        const boxMock = jest
                  .fn()
                  .mockImplementation( () => Object.create(meeseeks) )
                  .mockName('boxMock');

        box.pressButton = boxMock;
    })

    // TESTS

    test('this implícito esta funcionando en la funcion constructora', () => {

        // STRING_MATCHING

        expect(meeseeks.messageOnCreate).toEqual(expect.stringMatching("I'm Mr Meeseeks! Look at meeee!"));
    });

    test('El mensaje de speakOnRequest se genera de manera aleatoria', () => {

        // REGULAR EXPRESSIONS + TO_MATCH

        // regular expressions para chequear posibles valores del string
        const expected = /^Oooh\b|\ssireee!$|\sma'am!$/;
        expect(meeseeks.speakOnRequest()).toMatch(expected);
    });

    test('makeRequest añade una nueva propiedad accion al objeto meeseeks', () => {

        // OBJECT TO_HAVE_PROPERTY

        meeseeks.makeRequest("open", "Jerry's stupid mayonnaise jar");

        // chequeamos si el objeto posee la nueva propiedad que crea makeRequest
        expect(meeseeks).toHaveProperty('accion')
        expect(meeseeks.accion()).toEqual(expect.stringMatching("open" + " " + "Jerry's stupid mayonnaise jar"));

        // El prototype de meeseeks no tiene accion().
        // En un nuevo meeseeks busco accion() y delega
        // hasta su prototipo (que es MrMeeseeks.prototype).
        let mrmeeseeks = Object.create(meeseeks);
        expect(mrmeeseeks.hasOwnProperty('accion')).toBeFalsy();
        // => expect(mrmeeseeks).not.toHaveProperty('accion');

        // Acceder directamente al prototipo de meeseeks
        let meeseeksProto = Object.getPrototypeOf(meeseeks);
        expect(meeseeksProto).not.toHaveProperty('accion');
    })

    test('fullfillRequest ejecuta this.accion()', () => {

        // MOCK FUNCTIONS con IMPLEMENTATIONS

        /**
         * La funcion accion que necesita fulfillRequest
         * ha de ser creada previamente por makeRequest()
         * e inyectada en el objeto meeseeks.
         * No podemos depender de la implementacion de makeRequest()
         * para pasar este test => mockear la funcion accion() que
         * inyecta makeRequest() e inyectarla a mano en el objeto meeseeks 
         */

        const accionMock = jest
                            .fn()
                            .mockImplementation( () => "open" + " " + "Jerry's head")
                            .mockName('accionMock') // mensajes especificos en test errors outputs

        // inyecto en el objeto la funcion mock
        meeseeks.accion = accionMock;
        expect(meeseeks).toHaveProperty('accion');
        
        // el objeto meeseeks invoca a la funcion mock
        expect(meeseeks.fulfillRequest()).toEqual(expect.stringMatching("open" + " " + "Jerry's head" + " All done!!"))

        // accionMock ha debido ser llamada desde fulfillRequest()
        expect(accionMock).toHaveBeenCalled();
    });

    test('Cambiar messageOnCreate del prototipo meeseeks', () => {

        // mrmeeseeks tendra como prototipo a meeseeks 
        // por Object.create() en pressButton()
        let clon = box.pressButton();
        
        Object.getPrototypeOf(clon).messageOnCreate = "Hi!!";

        expect(meeseeks.messageOnCreate).toEqual(expect.stringMatching("Hi!!"));
        // busqueda en la cadena de prototipos de la propiedad messageOnCreate
        expect(clon.messageOnCreate).toEqual(expect.stringMatching("Hi!!"));

        // busqueda en la cadena de prototipos de la propiedad messageOnCreate
        expect(clon).toHaveProperty('messageOnCreate');
        // la propiedad messageOnCreate pertenece al prototipo, no a clon:
        expect(clon.hasOwnProperty('messageOnCreate')).toBeFalsy();
    })
});