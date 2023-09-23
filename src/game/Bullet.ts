import { Graphics, Rectangle, Sprite } from "pixi.js";
import { DynamicObject } from "./DynamicObject";

export class Bullet extends DynamicObject{
    public override isFloor: Boolean;
    private hitbox: Graphics;
    
    constructor(){
        super();

        this.isFloor = false;
        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x0000FF, 0.2);
        this.hitbox.drawRect(13, 4, 35, 6);
        this.hitbox.endFill(); 

        const bala = Sprite.from("bala");
        bala.scale.set(0.05,0.05);

        this.addChild(bala);
        this.addChild(this.hitbox);
    }
    override getHitbox(): Rectangle {
        return this.hitbox.getBounds();
    }

}