import { AnimatedSprite, Graphics, ObservablePoint, Rectangle, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { Keyboard } from "../utils/Keyboard";
import { IHitbox } from "./IHitbox";

export class Player extends PhysicsContainer implements IHitbox{

    public playerAnimated: AnimatedSprite;
    private static readonly GRAVITY = 2000;
    private static readonly HEADWIND = 0;
    private static readonly SPEED_Y = 1000;
    public inPlataform = true;
    public jumped = false;
    private hitbox: Graphics;

    constructor(){
        super();

        this.playerAnimated = new AnimatedSprite(
            [
                Texture.from("soldadoCorriendo1"),
                Texture.from("soldadoCorriendo2"),
                Texture.from("soldadoCorriendo3"),
                Texture.from("soldadoCorriendo4"),
                Texture.from("soldadoCorriendo5"),
                Texture.from("soldadoCorriendo6"),
            ], false
        );
        this.playerAnimated.animationSpeed = 0.16;
        this.playerAnimated.scale.set(0.5, 0.5);
        this.playerAnimated.play();
        this.addChild(this.playerAnimated);
        
        this.acceleration.x = Player.HEADWIND;
        this.acceleration.y = Player.GRAVITY;

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x0000FF, 0.001);
        this.hitbox.drawRect(50, 30, 110, 250);
        this.hitbox.endFill();
        this.playerAnimated.addChild(this.hitbox);

    }

    public override update(deltaMS: number){
        
        super.update(deltaMS/1000);
        
        this.playerAnimated.update(deltaMS / (1000/60));

        //Movimiento vertical
        if(Keyboard.state.get("ArrowUp") && this.inPlataform){
            this.inPlataform = false;
            if(Keyboard.state.get("ArrowRight")){
                this.speed.y = -Player.SPEED_Y*1.25;
            }
            else{
                this.speed.y = -Player.SPEED_Y;
            }    
        }

        if(Keyboard.state.get("ArrowDown") && !this.inPlataform){
            this.acceleration.y = Player.GRAVITY*2;
        }

        if(!this.inPlataform){
            this.playerAnimated.gotoAndStop(5);
            this.jumped = true;
        }
        if(this.inPlataform && this.jumped){
            this.playerAnimated.gotoAndPlay(0);
            this.jumped = false;
            this.acceleration.y = Player.GRAVITY;
        }

    }

    getHitbox(): Rectangle {
        return this.hitbox.getBounds();
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
                this.inPlataform = true;
            }
        }
    }
}