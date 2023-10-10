import { Container, Texture, TilingSprite, Text, Sprite, Graphics } from "pixi.js";
import { IActualizable } from "../utils/IActualizable";
import { Player } from "../game/Player";
import { DynamicObject } from "../game/DynamicObject";
import { Plataform } from "../game/Plataform";
import { checkCollision } from "../game/IHitbox";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { BoxArmed } from "../game/BoxArmed";
import { Coffer } from "../game/Coffer";
import { BoxAmmunition } from "../game/BoxAmmunition";
import { Bullet } from "../game/Bullet";
import { Keyboard } from "../utils/Keyboard";
import { DefeatPopUp } from "../ui/DefeatPopUp";
import { Star } from "../game/Star";

export class GameScene extends SceneBase implements IActualizable{

    private playerSoldier: Player;
    private dynamicObjects: DynamicObject[];
    private world: Container;
    private background: TilingSprite;
    private gameSpeed: number = 300;
    private timePased: number = 0;
    private timePased2: number = 0;
    private timePased3: number = 0;
    private timePased4: number = 0;
    private textScoreNumber: Text;
    private textCoinsNumber: Text;
    private textBulletNumber: Text;
    private balas: Bullet[];
    private estrellasList: Star[];
    private isPaused: Boolean;
    private isVictory: Boolean;
    private isDefeat: Boolean;
    private level: number;
    private score: number;
    private coins: number;
    private estrellas: number;
    private balasCount: number;
    private ui: DefeatPopUp | null = null;

    constructor(level: number){
        super();

        this.level=level;
        this.score = 0;
        this.coins = 0;
        this.estrellas = 0;
        this.balasCount = 100;
        this.isPaused = false;
        this.isVictory = false;
        this.isDefeat = false;

        this.world = new Container();
        this.background = new TilingSprite(Texture.from("fondoCiudad"), 2979, 1080);
        this.addChild(this.background);

        this.dynamicObjects = [];
        this.balas = [];
        this.estrellasList = [];

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

        this.ui = new DefeatPopUp(this.level);
        this.ui.position.set(SceneManager.WIDTH / 2 - this.ui.width / 2, SceneManager.HEIGHT / 2 - this.ui.height / 2);
        this.addChild(this.ui);
        this.ui.visible = false;

        const roundedRect3 = new Graphics();

        const rectWidth3 = 200; // Ancho del rectángulo
        const rectHeight3 = 120; // Alto del rectángulo
        const cornerRadius3 = 20; // Radio de las esquinas redondeadas
        const fillColor3 = '#f0f0f0'; // Color de relleno
        const fillAlpha3 = 0.21; // Transparencia del relleno (0 es completamente transparente)
        const lineColor3 = '#f0f0f0'; // Color del borde
        const lineWidth3 = 3; // Ancho del borde

        roundedRect3.lineStyle(lineWidth3, lineColor3); // Establecer el estilo del borde
        roundedRect3.beginFill(fillColor3, fillAlpha3); // Establecer el estilo de relleno (totalmente transparente)
        roundedRect3.drawRoundedRect(0, 0, rectWidth3, rectHeight3, cornerRadius3); // Dibujar el rectángulo redondeado
        roundedRect3.endFill(); // Finalizar el relleno
        roundedRect3.position.set(1700, 20);

        this.addChild(roundedRect3);

        const textScore = new Text('Score', {
            fontSize: 40,
            fill:'#3c303c',
            fontFamily: "Bahnschrift",
            fontWeight: "bold",
        });
        textScore.anchor.set(0.5,0.5);
        textScore.position.set(80,50);
        this.addChild(textScore);

        this.textScoreNumber = new Text(this.score.toString().concat(' '), {
            fontSize: 40,
            fill:'#9a7a89',
            fontFamily: "Bahnschrift",
            fontWeight: "bold",
            dropShadow: true,
            dropShadowAngle: Math.PI/6,
            dropShadowColor: 0xAAAAAA,
            dropShadowDistance: 3
        });
        this.textScoreNumber.anchor.set(0.5,0.5);
        this.textScoreNumber.position.set(200,52.5);
        this.addChild(this.textScoreNumber);

        this.textCoinsNumber = new Text(this.coins.toString(), {
            fontSize: 40,
            fill:'#fda237',
            fontFamily: "Bahnschrift",
            fontWeight: "bold",
        });
        this.textCoinsNumber.anchor.set(0.5,0.5);
        this.textCoinsNumber.position.set(1770, 55);
        this.addChild(this.textCoinsNumber);

        const picCoins = Sprite.from("monedas");
        picCoins.height = 70;
        picCoins.width = 70;
        picCoins.position.set(1825,20);
        this.addChild(picCoins);

        this.textBulletNumber = new Text(this.balasCount.toString(), {
            fontSize: 40,
            fill:'#866229',
            fontFamily: "Bahnschrift",
            fontWeight: "bold",
        });
        this.textBulletNumber.anchor.set(0.5,0.5);
        this.textBulletNumber.position.set(1770, 110);
        this.addChild(this.textBulletNumber);

        const picBullet = Sprite.from("balas");
        picBullet.height = 70;
        picBullet.width = 70;
        picBullet.position.set(1825,70);
        this.addChild(picBullet);

    }

    public update(deltaTime: number, _deltaFrame: number): void {
        
        this.textBulletNumber.text = this.balasCount.toString();
        this.textCoinsNumber.text = this.coins.toString();
        this.textScoreNumber.text = this.score.toString();
        
        if (this.ui) {
            this.ui.updateScores(this.score, this.coins, this.estrellas);
        }

        if(Keyboard.state.get("Space") && !this.isVictory && !this.isDefeat){
            this.isPaused=true;
            if (this.ui) {
                this.ui.setPaused();
                this.ui.visible = true; // Haz visible la ventana ui
            }
        }

        if(Keyboard.state.get("KeyP") && !this.isVictory && !this.isDefeat){
            this.isPaused=false;
            if (this.ui) {
                this.ui.visible = false; // Oculta la ventana ui
            }
        }
        
        if(this.isPaused){
            return;
        }

        this.timePased4 += deltaTime;
        if(this.timePased4>200){
            this.timePased4 = 0;
            this.score = this.score + 1;
        }
        
        this.playerSoldier.update(deltaTime/2);
        
        this.timePased += deltaTime;
        if(this.timePased>(30000*(50/this.gameSpeed))){
            this.timePased = 0;
            
            //Ir agregando obstáculos
            
            const random = Math.floor(Math.random()*8) + 1;

            const posYBoxArmed = SceneManager.HEIGHT*0.845;
            const posYCoffer = SceneManager.HEIGHT*0.8625;
            const posYBoxAmmunition = SceneManager.HEIGHT*0.875;

            switch(random){
                case 1:
                    // 1 Caja de madera con pinches arriba
                    const caja_armada1 = new BoxArmed(2);
                    caja_armada1.position.set(SceneManager.WIDTH,posYBoxArmed);
                    this.world.addChild(caja_armada1);
                    this.dynamicObjects.push(caja_armada1);
                    break;
                case 2:
                    // 1 Caja de madera sin pinches arriba y 1 caja de municion con pinches arriba
                    const caja_armada2 = new BoxArmed(1);
                    caja_armada2.position.set(SceneManager.WIDTH,posYBoxArmed);
                    this.world.addChild(caja_armada2);
                    this.dynamicObjects.push(caja_armada2);
                    const caja_municion2 = new BoxAmmunition(2);
                    caja_municion2.position.set(SceneManager.WIDTH,posYBoxAmmunition-caja_armada2.height);
                    this.world.addChild(caja_municion2);
                    this.dynamicObjects.push(caja_municion2);
                    break;
                case 3:
                    // 1 Caja de madera sin pinches arriba y 1 cofre con pinches arriba
                    const caja_armada3 = new BoxArmed(1);
                    caja_armada3.position.set(SceneManager.WIDTH,posYBoxArmed);
                    this.world.addChild(caja_armada3);
                    this.dynamicObjects.push(caja_armada3);
                    const cofre3 = new Coffer();
                    cofre3.position.set(SceneManager.WIDTH,posYCoffer-caja_armada3.height);
                    this.world.addChild(cofre3);
                    this.dynamicObjects.push(cofre3);
                    break;
                case 4:
                    // 1 Caja de madera sin pinches arriba y 1 caja de madera con pinches arriba
                    const caja_armada4 = new BoxArmed(1);
                    caja_armada4.position.set(SceneManager.WIDTH,posYBoxArmed);
                    this.world.addChild(caja_armada4);
                    this.dynamicObjects.push(caja_armada4);
                    const caja_armada5 = new BoxArmed(2);
                    caja_armada5.position.set(SceneManager.WIDTH,posYBoxArmed-caja_armada4.height);
                    this.world.addChild(caja_armada5);
                    this.dynamicObjects.push(caja_armada5);
                    break;
                case 5:
                    // 1 Caja de madera sin pinches arriba, 1 caja de madera sin pinches arriba y 1 cofre con pinches arriba
                    const caja_armada6 = new BoxArmed(1);
                    caja_armada6.position.set(SceneManager.WIDTH,posYBoxArmed);
                    this.world.addChild(caja_armada6);
                    this.dynamicObjects.push(caja_armada6);
                    const caja_armada7 = new BoxArmed(1);
                    caja_armada7.position.set(SceneManager.WIDTH,posYBoxArmed-caja_armada6.height);
                    this.world.addChild(caja_armada7);
                    this.dynamicObjects.push(caja_armada7);
                    const cofre5 = new Coffer();
                    cofre5.position.set(SceneManager.WIDTH,posYCoffer-caja_armada7.height-caja_armada6.height);
                    this.world.addChild(cofre5);
                    this.dynamicObjects.push(cofre5);
                    break;
                case 6:
                    // 1 Caja de madera sin pinches arriba, 1 caja de madera sin pinches arriba y 1 caja de municion con pinches arriba
                    const caja_armada8 = new BoxArmed(1);
                    caja_armada8.position.set(SceneManager.WIDTH,posYBoxArmed);
                    this.world.addChild(caja_armada8);
                    this.dynamicObjects.push(caja_armada8);
                    const caja_armada9 = new BoxArmed(1);
                    caja_armada9.position.set(SceneManager.WIDTH,posYBoxArmed-caja_armada8.height);
                    this.world.addChild(caja_armada9);
                    this.dynamicObjects.push(caja_armada9);
                    const caja_municion6 = new BoxAmmunition(2);
                    caja_municion6.position.set(SceneManager.WIDTH,posYBoxAmmunition-caja_armada9.height-caja_armada8.height);
                    this.world.addChild(caja_municion6);
                    this.dynamicObjects.push(caja_municion6);
                    break;
                case 7:
                    // 1 Caja de madera sin pinches arriba, 1 caja de madera sin pinches arriba y 1 caja de municion con pinches arriba
                    const caja_armada10 = new BoxArmed(1);
                    caja_armada10.position.set(SceneManager.WIDTH,posYBoxArmed);
                    this.world.addChild(caja_armada10);
                    this.dynamicObjects.push(caja_armada10);
                    const caja_armada11 = new BoxArmed(1);
                    caja_armada11.position.set(SceneManager.WIDTH,posYBoxArmed-caja_armada10.height);
                    this.world.addChild(caja_armada11);
                    this.dynamicObjects.push(caja_armada11);
                    const caja_armada12 = new BoxArmed(2);
                    caja_armada12.position.set(SceneManager.WIDTH,posYBoxArmed-caja_armada11.height-caja_armada10.height);
                    this.world.addChild(caja_armada12);
                    this.dynamicObjects.push(caja_armada12);
                    break;
                case 8:
                    // 1 Caja de madera sin pinches arriba, 1 caja de municion sin pinches arriba y 1 cofre con pinches arriba
                    const caja_armada13 = new BoxArmed(1);
                    caja_armada13.position.set(SceneManager.WIDTH,posYBoxArmed);
                    this.world.addChild(caja_armada13);
                    this.dynamicObjects.push(caja_armada13);
                    const caja_municion8 = new BoxAmmunition(1);
                    caja_municion8.position.set(SceneManager.WIDTH,posYBoxAmmunition-caja_armada13.height);
                    this.world.addChild(caja_municion8);
                    this.dynamicObjects.push(caja_municion8);
                    const cofre8 = new Coffer();
                    cofre8.position.set(SceneManager.WIDTH,(posYCoffer-caja_municion8.height-caja_armada13.height)*1.007);
                    this.world.addChild(cofre8);
                    this.dynamicObjects.push(cofre8);
                    break;
            }
            
        }
        
        this.timePased2 += deltaTime;
        if(this.timePased2>25000){
            this.timePased2 = 0;
            const estrella = new Star();
            estrella.position.set(SceneManager.WIDTH,SceneManager.HEIGHT/2);
            this.world.addChild(estrella);
            this.estrellasList.push(estrella);
        }
        for (let estrella of this.estrellasList){
            estrella.speed.x = -this.gameSpeed;
            estrella.update(deltaTime/1000);
            const overlap = checkCollision(this.playerSoldier, estrella);
            if( overlap !== null){
                estrella.destroy();
                this.score = this.score + 10;
                this.estrellas = this.estrellas + 1;
                if(this.estrellas == 3){
                    this.isPaused=true;
                    this.isVictory=true;
                    if(this.ui){
                        this.ui.setVictory();
                        this.ui.visible = true;
                    }
                }
            }
        }
        this.estrellasList = this.estrellasList.filter((elem) => !elem.destroyed);
        for(let estrella of this.estrellasList){
            // Si la estrella sale de pantalla entonces destruirla
            if(estrella.position.x < 0){
                console.log("Entro acá estrella")
                estrella.destroy();
            }
        }
        this.estrellasList = this.estrellasList.filter((elem) => !elem.destroyed);

        console.log('estrellas ganadas'.concat(this.estrellas.toString()));
        console.log('estrellas pantalla'.concat(this.estrellasList.length.toString()));

        this.timePased3 += deltaTime;
        if(Keyboard.state.get("KeyS")){
            if(this.timePased3>300 && this.balasCount>0){
                this.balasCount = this.balasCount - 1;
                this.timePased3 = 0;
                const bala = new Bullet();
                //SceneManager.HEIGHT*0.84
                bala.position.set(this.playerSoldier.position.x*1.065, this.playerSoldier.position.y*1.065);
                this.world.addChild(bala);
                this.balas.push(bala);
            }
        }

        let countExitPlat = 0;
        for (let plataform of this.dynamicObjects){
            plataform.speed.x = -this.gameSpeed;
            plataform.update(deltaTime/1000);
            const overlap = checkCollision(this.playerSoldier, plataform);
            if(plataform.isFloor){
                if( overlap !== null){
                    this.playerSoldier.separate(overlap, plataform.position);
                }else{
                    countExitPlat++;
                }
            }
            else{
                if( overlap !== null){
                    this.isPaused=true;
                    this.isDefeat=true;
                    if(this.ui){
                        this.ui.setDefeat();
                        this.ui.visible = true;
                    }
                }else{
                    countExitPlat++;
                }
            }
            
            for(let plataform1 of this.dynamicObjects){
                const overlap1 = checkCollision(plataform, plataform1);
                if(overlap1 !== null){
                    plataform.separate(overlap1, plataform1.position);
                }
            }
            for(let bala of this.balas){
                bala.update(deltaTime/1000);
                const collisionBullet = checkCollision(plataform, bala);
                if(collisionBullet !== null){
                    this.score = this.score + 1;
                    bala.destroy();
                    plataform.destroy();
                }
            }
            //Si la bala ya impactó entonces sacarla de la lista de balas
            this.balas = this.balas.filter((elem) => !elem.destroyed);
            for(let bala of this.balas){
                // Si la bala sale de pantalla entonces destruirla
                if(bala.position.x > SceneManager.WIDTH){
                    console.log("Entro acá 2")
                    bala.destroy();
                }
            }
            this.balas = this.balas.filter((elem) => !elem.destroyed);

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