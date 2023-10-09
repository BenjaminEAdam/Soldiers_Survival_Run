import { ObservablePoint, Rectangle } from "pixi.js";
import { IHitbox } from "./IHitbox";
import { PhysicsContainer } from "./PhysicsContainer";

export abstract class DynamicObject extends PhysicsContainer implements IHitbox{
    
    public isFloor : Boolean;
    private static readonly GRAVITY = 30000; //Gravedad con la que caen los objetos

    constructor(isFloor : Boolean){
        super();

        if(!isFloor){
            this.acceleration.y = DynamicObject.GRAVITY;
        }

        this.isFloor = isFloor;
    }
    
    getHitbox(): Rectangle {
        console.log("Método getHitbox no implementadao en la clase padre");
        throw new Error("Method not implemented.");
    }

    public separate(overlap: Rectangle, plataform: ObservablePoint<any>) {
        
        if(overlap.width <= overlap.height){
            this.speed.x = 0;
            if(this.x >= plataform.x){
                this.x += overlap.width;
            }
            else if(this.x <= plataform.x){
                this.x -= overlap.width;
            }
        }
        else{ 
            this.speed.y = 0;
            if(this.y > plataform.y){
                this.y += overlap.height;
            }
            else if(this.y < plataform.y){
                this.y -= overlap.height;
            }
        }
    }
}