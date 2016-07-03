//variable declaration
var implicit = '';
var explicit : string = null;
let usingLet : string = '';

//any is used to represent any unsafe type
let empty : any = function(){};

//creating interface
interface INamedObject {
    firstName:string,
    lastName:string,
    //optional property does not need to exist
    age?:number
}

//using interface
//interface is implicitly implemented by anything that matches
var objectsImplicitlyImplement : INamedObject = {
    firstName : 'Foo',
    lastName : 'Bar'
}

//creating function interface
interface IFilterFunction {
    (object:any) : boolean
}

//function that conforms to the interface
let isNotNull : IFilterFunction = function(object:any) {
    return object != null;
}

//we can force cast of anything that does not match the interface
let forcedCase : IFilterFunction = <IFilterFunction> empty;

//function's parameter can define expected interface inline
//function receives object of inline type, and returns a string
function getFullName(object: { firstName:string, lastName:string }) : string {
    if (!isNotNull(object)) {
        throw 'Object should not be null!'
    }
    return object.firstName + ' ' + object.lastName;
}

//interfaces are implicitly implemented
getFullName(objectsImplicitlyImplement);
getFullName({firstName:'', lastName:''});

//interface can specify how a constructor should looklike
interface IEngineFactory {
    new (arg1: number, name: string): any
}

//class looks like this
class ElectricEngine {

    //a private property
    private noWatts: number;
    constructor(noWatts: number, name: string) {
        this.noWatts = noWatts;
    }
}

class GasEngine {
    //public and private keyword immediately sets the fields
    constructor(private noPistons: number, public name: string) { }
}

//a function can receive interface of a constructor
function createEngines(factory: IEngineFactory) : Array<any> {
    let engines : Array<any> = [];
    //interface of a constructor is used with new operator
    engines.push(new factory(1, 'first'));
    engines.push(new factory(2, 'second'));
    return engines;
}

//a static constructor definition has to be passed to the function
createEngines(GasEngine);
createEngines(ElectricEngine);

(function() {





})();