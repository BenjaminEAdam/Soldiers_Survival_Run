import { Graphics, Rectangle, Sprite } from "pixi.js";
import { DynamicObject } from "./DynamicObject";

export class Plataform extends DynamicObject{
    
    public override isFloor: Boolean;
    private hitbox : Graphics;
    
    constructor(typePlat : string){
        super();
        
        this.hitbox = new Graphics();
        
        switch(typePlat){
            case "piso_piedra":
                this.isFloor = true;
                const piso = Sprite.from("pisoPiedra");
                piso.scale.set(0.5,0.3);
                this.addChild(piso);

                this.hitbox.beginFill(0x0000FF, 0.2);
                this.hitbox.drawRect(0, 0, piso.width, piso.height);
                this.hitbox.endFill();
                this.addChild(this.hitbox);
                break;
                
            default:
                this.isFloor = false;
                console.log("EL STRING INGRESADO EN EL CONSTRUCTOR DE PLATAFORMA NO ES VALIDO");
                this.hitbox.beginFill(0x0000FF, 0.2);
                this.hitbox.drawRect(0, 0, 0, 0);
                this.hitbox.endFill();
                this.addChild(this.hitbox);
                break;
        }
    }

    override getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }
}