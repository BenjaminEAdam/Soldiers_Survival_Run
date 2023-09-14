import { Text, Assets } from "pixi.js";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";

export class PressKeyScene extends SceneBase{

    constructor() {
        super();
        Assets.add("MyFont", "./fonts/ISOCP.ttf", { "family": "My Special Font" });
        Assets.load("MyFont").then(() => {
            const t = new Text('Press a key to continue', {
            fontSize: 70,
            fill: 0xdbe7db,
            fontFamily: "My Special Font",
            fontWeight: "bold",
            dropShadow: true,
            dropShadowAngle: Math.PI/6,
            dropShadowColor: 0xAAAAAA,
            dropShadowDistance: 3
            });
            t.anchor.set(0.5,0.5);
            t.position.set(SceneManager.WIDTH*0.5, SceneManager.HEIGHT*0.77);
            this.addChild(t);
        })

        Assets.add("fontSwiss", "./fonts/Swiss721BoldOutlineBT.ttf", { "family": "My Swiss721BoldOutlineBT" });
        Assets.load("fontSwiss").then(() => {
        const titleText = new Text('Survival run',{
            fontSize:150,
            fill: 0xdbe7db,
            fontFamily:"My Swiss721BoldOutlineBT",
            dropShadow: true,
            dropShadowAngle: Math.PI/6,
            dropShadowColor: 0xAAAAAA,
            dropShadowDistance: 3,
        })
        titleText.anchor.set(0.5,0.5);
        titleText.position.set(SceneManager.WIDTH*0.5, SceneManager.HEIGHT*0.3);
        this.addChild(titleText);
        })
    }
    
    
    public override update(){}
    
}