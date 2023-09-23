import { Container, DisplayObjectEvents, Sprite, Texture } from "pixi.js";

export class Button extends Container{

    private def:Texture;
    private down:Texture;
    private over:Texture;
    private spr:Sprite;
    
    constructor(def:Texture, down:Texture, over:Texture){
        super();

        this.def=def;
        this.down=down;
        this.over=over;

        this.spr = Sprite.from(def);
        this.spr.on("mousedown", this.onMouseDown, this);
        this.spr.on("mouseup", this.onMouseUp, this);
        this.spr.on("mouseover", this.onMouseOver, this);
        this.spr.on("mouseout", this.onMouseOut, this);
        this.spr.interactive = true;
        this.addChild(this.spr);

    }

    private onMouseDown():void{
        this.spr.texture = this.down;
    }

    private onMouseUp():void{
        //Esto me genera dudas
        const buttonClick = "buttonClick" as keyof DisplayObjectEvents
        //Esto me genera dudas
        this.emit(buttonClick);
        this.spr.texture = this.over;
    }

    private onMouseOver():void{
        this.spr.texture = this.over;
    }

    private onMouseOut():void{
        this.spr.texture = this.def;
    }

}