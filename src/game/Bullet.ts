import { Graphics, Rectangle, Sprite } from "pixi.js";
import { DynamicObject } from "./DynamicObject";

export class Bullet extends DynamicObject{
    
    private hitbox: Graphics;
    private static readonly SPEED_X = 250;
    
    constructor(){
        super(false);

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x0000FF, 0.2);
        this.hitbox.drawRect(13, 4, 35, 6);
        this.hitbox.endFill(); 

        const bala = Sprite.from("bala");
        bala.scale.set(0.05,0.05);

        this.acceleration.y = 0;
        this.speed.x = Bullet.SPEED_X;

        this.addChild(bala);
        this.addChild(this.hitbox);
        
    }


    override getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

}