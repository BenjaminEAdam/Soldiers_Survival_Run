import { Rectangle } from "pixi.js";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";

export abstract class DynamicObject extends PhysicsContainer implements IHitbox{
    
    public abstract isFloor : Boolean;

    constructor(){
        super();

    }
    
    getHitbox(): Rectangle {
        console.log("Método getHitbox no implementadao en la clase padre");
        throw new Error("Method not implemented.");
    }
}