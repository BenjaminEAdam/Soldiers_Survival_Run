import { Container, Texture, TilingSprite } from "pixi.js";
import { IActualizable } from "../utils/IActualizable";
import { Player } from "../game/Player";
import { DynamicObject } from "../game/DynamicObject";
import { Plataform } from "../game/Plataform";
import { checkCollision } from "../game/IHitbox";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";

export class GameScene extends SceneBase implements IActualizable{

    private playerSoldier: Player;
    private dynamicObjects: DynamicObject[];
    private world: Container;
    private background: TilingSprite;
    private gameSpeed: number = 200;
    private timePased: number = 0;

    constructor(){
        super();

        this.world = new Container();
        this.background = new TilingSprite(Texture.from("fondoCiudad"), 2979, 1080);
        this.addChild(this.background);

        this.dynamicObjects = [];

        let piso = new Plataform("piso_piedra");
        piso.position.set(0, SceneManager.HEIGHT*0.92);
        this.world.addChild(piso);
        this.dynamicObjects.push(piso);

        piso = new Plataform("piso_piedra");
        piso.position.set(piso.width, SceneManager.HEIGHT*0.92);
        this.world.addChild(piso);
        this.dynamicObjects.push(piso);

        piso = new Plataform("piso_piedra");
        piso.position.set(piso.width*2, SceneManager.HEIGHT*0.92);
        this.world.addChild(piso);
        this.dynamicObjects.push(piso);

        this.playerSoldier = new Player();
        this.playerSoldier.position.set(400, 800);
        this.playerSoldier.pivot.set(Math.trunc(this.playerSoldier.width)/3, 0);
        this.world.addChild(this.playerSoldier);

        this.addChild(this.world);

        /*const caja_armada1 = new BoxArmed(1);
        caja_armada1.position.set(600,555);
        this.addChild(caja_armada1);

        const caja_armada2 = new BoxArmed(2);
        caja_armada2.position.set(800,555);
        this.addChild(caja_armada2);

        const caja_municion1 = new BoxAmmunition(1);
        caja_municion1.position.set(587, 300);
        this.addChild(caja_municion1);

        const caja_municion2 = new BoxAmmunition(2);
        caja_municion2.position.set(787, 450);
        this.addChild(caja_municion2);

        const cofre1 = new Coffer();
        cofre1.position.set(600, 493);
        this.addChild(cofre1);

        const cofre2 = new Coffer();
        cofre2.position.set(800, 300);
        this.addChild(cofre2);

        const bala = new Bullet();
        bala.position.set(467, 551);
        this.addChild(bala);*/

    }

    public update(deltaTime: number, _deltaFrame: number): void {
        
        this.playerSoldier.update(deltaTime/2);
        
        this.timePased += deltaTime;
        if(this.timePased>(10000*(50/this.gameSpeed))){
            this.timePased = 0;
            
            //Ir agregando obstáculos

            /*const caja_armada1 = new BoxArmed(1);
            caja_armada1.position.set(1280,555);
            this.world.addChild(caja_armada1);
            this.dynamicObjects.push(caja_armada1);

            const cofre1 = new Coffer();
            cofre1.position.set(1280, 493);
            this.world.addChild(cofre1);
            this.dynamicObjects.push(cofre1);*/


        }

        let countExitPlat = 0;
        for (let plataform of this.dynamicObjects){
            plataform.speed.x = -this.gameSpeed;
            plataform.update(deltaTime/1000);
            const overlap = checkCollision(this.playerSoldier, plataform);
            if( overlap != null){
                this.playerSoldier.separate(overlap, plataform.position);
            }else{
                countExitPlat++;
            }
            // Si la plataforma sale de pantalla entonces destruirla
            if(plataform.getHitbox().right < 0){
                plataform.destroy();
            }
        }
        // Si está fuera de TODAS las plataformas entonces está fuera de plataforma.
        if(countExitPlat==this.dynamicObjects.length){
            this.playerSoldier.inPlataform = false;
        }
        // Si la plataforma fué destruida sacarla de la lista de plataformas
        this.dynamicObjects = this.dynamicObjects.filter((elem) => !elem.destroyed);

        const plataformsFloors = this.dynamicObjects.filter((elem) => elem.isFloor);
        if(plataformsFloors.length == 3){
            const piso = new Plataform("piso_piedra");
            piso.position.set(piso.width*3, SceneManager.HEIGHT*0.92);
            this.world.addChild(piso);
            this.dynamicObjects.push(piso);
        }

        // Player
        
        /*if(this.playerSoldier.x >= (index.screenWidth - 2*(this.playerSoldier.width/3))){
            this.playerSoldier.x = index.screenWidth - 2*(this.playerSoldier.width/3);
        }
        if(this.playerSoldier.x <= 0 - 2*(this.playerSoldier.width/3)){
            this.playerSoldier.x = 0 - 2*(this.playerSoldier.width/3);
        }*/
        if(this.playerSoldier.y <= -25){
            this.playerSoldier.y = -25;
            this.playerSoldier.speed.y=0;
        }

        //Efecto parallax
        //this.world.x = -this.playerSoldier.x * this.worldTransform.a + index.screenWidth/4;
        //this.background.tilePosition.x = this.world.x * 0.5;
        this.background.tilePosition.x -= this.gameSpeed * deltaTime/3000;
        this.background.y = -this.playerSoldier.y * 0.1;

        this.playerSoldier.update(deltaTime/2);

    }
}