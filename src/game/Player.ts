import { AnimatedSprite, Graphics, ObservablePoint, Rectangle, Texture } from "pixi.js";
import { PhysicsContainer } from "./PhysicsContainer";
import { Keyboard } from "../utils/Keyboard";
import { IHitbox } from "./IHitbox";

export class Player extends PhysicsContainer implements IHitbox{

    public playerAnimated: AnimatedSprite;
    private static readonly GRAVITY = 1800;
    private static readonly HEADWIND = 0;
    private static readonly SPEED_X = 0;
    private static readonly SPEED_Y = 900;
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
        this.playerAnimated.animationSpeed = 0.12;
        this.playerAnimated.scale.set(0.5, 0.5);
        this.playerAnimated.play();
        this.addChild(this.playerAnimated);
        
        this.acceleration.x = Player.HEADWIND;
        this.acceleration.y = Player.GRAVITY;

        this.hitbox = new Graphics();
        this.hitbox.beginFill(0x0000FF, 0.2);
        this.hitbox.drawRect(50, 30, 110, 250);
        this.hitbox.endFill();
        this.playerAnimated.addChild(this.hitbox);

    }

    public override update(deltaMS: number){
        
        super.update(deltaMS/1000);
        
        this.playerAnimated.update(deltaMS / (1000/60));

        //Movimiento horizantal
        if(Keyboard.state.get("ArrowRight") && this.inPlataform){
            this.speed.x = Player.SPEED_X;
            this.scale.set(1, 1);
            this.playerAnimated.play();
        }else if(Keyboard.state.get("ArrowLeft") && this.inPlataform){
            this.speed.x = -Player.SPEED_X;
            this.scale.set(-1, 1);
            this.playerAnimated.play();
        }else{
            if(this.inPlataform){
                this.speed.x = 0;
            }
            //this.playerAnimated.stop();
        }
        //Movimiento vertical
        if(Keyboard.state.get("ArrowUp") && this.inPlataform){
            this.inPlataform = false;
            this.speed.y = -Player.SPEED_Y;
            
        }

        if(!this.inPlataform){
            this.playerAnimated.gotoAndStop(5);
            this.jumped = true;
        }
        if(this.inPlataform && this.jumped){
            this.playerAnimated.gotoAndPlay(0);
            this.jumped = false;
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