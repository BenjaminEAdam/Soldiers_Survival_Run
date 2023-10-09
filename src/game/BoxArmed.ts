import { Graphics, Rectangle, Sprite } from "pixi.js";
import { Spearheads } from "./Spearheads";
import { DynamicObject } from "./DynamicObject";

export class BoxArmed extends DynamicObject{
    
    private hitbox: Graphics;
    
    constructor(number : number){
        super(false);

        this.hitbox = new Graphics();
        const box = Sprite.from("caja");
        box.scale.set(0.09,0.09);
        const pinches_izquierdos = new Spearheads(5);
        pinches_izquierdos.scale.set(-1,-1);
        pinches_izquierdos.position.set(-5, 80);
        const pinches_derechos = new Spearheads(5);
        pinches_derechos.scale.set(1,-1);
        pinches_derechos.position.set(87, 80);
        const pinches_superiores = new Spearheads(8);
        pinches_superiores.scale.set(1.2,-1.2);
        pinches_superiores.position.set(15,-13);
        const pinche_esquina_izquierda = new Spearheads(1);
        pinche_esquina_izquierda.position.set(-10,3);
        pinche_esquina_izquierda.angle = 225;
        const pinche_esquina_derecha = new Spearheads(1);
        pinche_esquina_derecha.position.set(78,-10);
        pinche_esquina_derecha.angle = 315;

        switch(number){
            case 1:
                this.hitbox.beginFill(0x0000FF, 0.1);
                this.hitbox.drawRect(-10, 0, 105, 80);
                this.hitbox.endFill();
                break;
            case 2:
                this.hitbox.beginFill(0x0000FF, 0.1);
                this.hitbox.drawRect(-10, -10, 105, 90);
                this.hitbox.endFill();
                this.addChild(pinches_superiores);
                this.addChild(pinche_esquina_izquierda);
                this.addChild(pinche_esquina_derecha);
                break;
            default:
                console.log("INGRESE EL NUMERO 1 O EL 2 para crear un BoxArmed");
                break;
        }
        

        this.addChild(pinches_derechos);
        this.addChild(pinches_izquierdos);
        this.addChild(box);
        this.addChild(this.hitbox);
    }
    
    
    
    
    override getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }
    
}