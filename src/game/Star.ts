import { Graphics, Rectangle, Sprite } from "pixi.js";
import { DynamicObject } from "./DynamicObject";

export class Star extends DynamicObject{
    
    private hitbox: Graphics;
    
    constructor(){
        super(false);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x0000FF, 0.001);
        this.hitbox.drawRect(5, 5, 40, 40);
        this.hitbox.endFill(); 

        const estrella = Sprite.from("estrella");
        estrella.scale.set(0.05,0.05);

        this.acceleration.y = 0;

        this.addChild(estrella);
        this.addChild(this.hitbox);
        
    }


    override getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

}