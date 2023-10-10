import { Container, DisplayObjectEvents, Graphics, Sprite, Text, Texture, Ticker } from "pixi.js";
import { Button } from "../utils/Button";
import { SceneManager } from "../utils/SceneManager";
import { MenuScene } from "../scenes/MenuScene";
import { GameScene } from "../scenes/GameScene";

export class DefeatPopUp extends Container{

    private botonContinuar: Button;
    private botonReintentar: Button;
    private level: number;
    private score: number;
    private coins: number;
    private estrellas: number;
    private isVictory: Boolean;
    private title: Text;
    private textNext: Text;
    private textScoreNumber: Text;
    private textCoinsNumber: Text;
    private textRetry: Text;
    private textPause: Text;
    private myStarLeft: Sprite;
    private myStarCentral: Sprite;
    private myStarRight: Sprite;
    
    constructor(level: number){
        super();

        this.level = level;
        this.score = 0;
        this.coins = 0;
        this.estrellas = 0;
        this.isVictory = false;

        const roundedRect = new Graphics();

        const rectWidth = 500; // Ancho del rectángulo
        const rectHeight = 550; // Alto del rectángulo
        const cornerRadius = 20; // Radio de las esquinas redondeadas
        const fillColor = '#987989'; // Color de relleno
        const fillAlpha = 0.5; // Transparencia del relleno (0 es completamente transparente)
        const lineColor = '#987989'; // Color del borde
        const lineWidth = 7; // Ancho del borde

        roundedRect.lineStyle(lineWidth, lineColor); // Establecer el estilo del borde
        roundedRect.beginFill(fillColor, fillAlpha); // Establecer el estilo de relleno (totalmente transparente)
        roundedRect.drawRoundedRect(0, 0, rectWidth, rectHeight, cornerRadius); // Dibujar el rectángulo redondeado
        roundedRect.endFill(); // Finalizar el relleno

        this.addChild(roundedRect);

        this.title = new Text('Defeat', {
            fontSize: 70,
            //fill: ['#d2d2d2', '#dcbdcd', '#d1a28f', '#ecaf79', '#fd9e68', '#fd7c46', '#fe5a24', '#fe5a24'],
            fill:'#f0f0f0',
            fontFamily: "My Special Font",
            fontWeight: "bold",
            dropShadow: true,
            dropShadowAngle: Math.PI/6,
            dropShadowColor: 0xAAAAAA,
            dropShadowDistance: 3
        });
        this.title.anchor.set(0.5,0.5);
        this.title.position.set(roundedRect.width/2,this.title.height/2);
        this.addChild(this.title);

        const roundedRect2 = new Graphics();

        const rectWidth2 = 460; // Ancho del rectángulo
        const rectHeight2 = 450; // Alto del rectángulo
        const cornerRadius2 = 20; // Radio de las esquinas redondeadas
        const fillColor2 = '#f0f0f0'; // Color de relleno
        const fillAlpha2 = 0.5; // Transparencia del relleno (0 es completamente transparente)
        const lineColor2 = '#f0f0f0'; // Color del borde
        const lineWidth2 = 3; // Ancho del borde

        roundedRect2.lineStyle(lineWidth2, lineColor2); // Establecer el estilo del borde
        roundedRect2.beginFill(fillColor2, fillAlpha2); // Establecer el estilo de relleno (totalmente transparente)
        roundedRect2.drawRoundedRect(0, 0, rectWidth2, rectHeight2, cornerRadius2); // Dibujar el rectángulo redondeado
        roundedRect2.endFill(); // Finalizar el relleno
        roundedRect2.position.set(20, 80);

        this.addChild(roundedRect2);

        this.myStarCentral = Sprite.from("estrella");
        this.myStarCentral.height = 110;
        this.myStarCentral.width = 110;
        this.myStarCentral.position.set(200,100);
        this.addChild(this.myStarCentral);
        
        this.myStarLeft = Sprite.from("estrella");
        this.myStarLeft.height = 110;
        this.myStarLeft.width = 110;
        this.myStarLeft.position.set(75,100);
        this.addChild(this.myStarLeft);

        this.myStarRight = Sprite.from("estrella");
        this.myStarRight.height = 110;
        this.myStarRight.width = 110;
        this.myStarRight.position.set(325,100);
        this.addChild(this.myStarRight);

        //Todas las estrellas comienzan oscuras
        this.myStarLeft.alpha = 0.1;
        this.myStarLeft.tint = '#987989';
        this.myStarCentral.alpha = 0.1;
        this.myStarCentral.tint = '#987989';
        this.myStarRight.alpha = 0.1;
        this.myStarRight.tint = '#987989';

        const textLevel = new Text('Level '.concat(this.level.toString()), {
            fontSize: 40,
            //fill: ['#d2d2d2', '#dcbdcd', '#d1a28f', '#ecaf79', '#fd9e68', '#fd7c46', '#fe5a24', '#fe5a24'],
            fill:'#3c303c',
            fontFamily: "My Special Font",
            fontWeight: "bold",
            dropShadow: true,
            dropShadowAngle: Math.PI/6,
            dropShadowColor: 0xAAAAAA,
            dropShadowDistance: 3
        });
        textLevel.anchor.set(0.5,0.5);
        textLevel.position.set(roundedRect.width/2,250);
        this.addChild(textLevel);

        const roundedRect3 = new Graphics();

        const rectWidth3 = 400; // Ancho del rectángulo
        const rectHeight3 = 120; // Alto del rectángulo
        const cornerRadius3 = 20; // Radio de las esquinas redondeadas
        const fillColor3 = '#f0f0f0'; // Color de relleno
        const fillAlpha3 = 0.5; // Transparencia del relleno (0 es completamente transparente)
        const lineColor3 = '#f0f0f0'; // Color del borde
        const lineWidth3 = 3; // Ancho del borde

        roundedRect3.lineStyle(lineWidth3, lineColor3); // Establecer el estilo del borde
        roundedRect3.beginFill(fillColor3, fillAlpha3); // Establecer el estilo de relleno (totalmente transparente)
        roundedRect3.drawRoundedRect(0, 0, rectWidth3, rectHeight3, cornerRadius3); // Dibujar el rectángulo redondeado
        roundedRect3.endFill(); // Finalizar el relleno
        roundedRect3.position.set(50, 300);

        this.addChild(roundedRect3);

        const textScore = new Text('Score', {
            fontSize: 40,
            fill:'#3c303c',
            fontFamily: "Bahnschrift",
            fontWeight: "bold",
        });
        textScore.anchor.set(0.5,0.5);
        textScore.position.set(130,330);
        this.addChild(textScore);

        this.textScoreNumber = new Text(this.score.toString().concat(' '), {
            fontSize: 40,
            fill:'#9a7a89',
            fontFamily: "Bahnschrift",
            fontStyle: 'italic',
            fontWeight: "bold",
            dropShadow: true,
            dropShadowAngle: Math.PI/6,
            dropShadowColor: 0xAAAAAA,
            dropShadowDistance: 3
        });
        this.textScoreNumber.anchor.set(0.5,0.5);
        this.textScoreNumber.position.set(roundedRect3.width/2 + this.textScoreNumber.width,330);
        this.addChild(this.textScoreNumber);

        const textCoins = new Text('Coins', {
            fontSize: 40,
            fill:'#3c303c',
            fontFamily: "Bahnschrift",
            fontWeight: "bold",
        });
        textCoins.anchor.set(0.5,0.5);
        textCoins.position.set(130,385);
        this.addChild(textCoins);

        this.textCoinsNumber = new Text(this.coins.toString(), {
            fontSize: 40,
            fill:'#fda237',
            fontFamily: "Bahnschrift",
            fontWeight: "bold",
        });
        this.textCoinsNumber.anchor.set(0.5,0.5);
        this.textCoinsNumber.position.set(roundedRect3.width/2 + this.textCoinsNumber.width,385);
        this.addChild(this.textCoinsNumber);

        const picCoins = Sprite.from("monedas");
        picCoins.height = 70;
        picCoins.width = 70;
        picCoins.position.set(370,350);
        this.addChild(picCoins);

        const buttonClick = "buttonClick" as keyof DisplayObjectEvents
        
        this.botonContinuar = new Button(
            Texture.from("botonGris"), 
            Texture.from("botonGrisPresionado"), 
            Texture.from("botonGrisSeleccionado")
        );
        this.botonContinuar.on(buttonClick, this.onButtonClickContinuar, this);
        this.botonContinuar.height=60;
        this.botonContinuar.width=180;
        this.botonContinuar.position.set(270,450);
        this.addChild(this.botonContinuar);

        this.botonReintentar = new Button(
            Texture.from("botonNaranja"),
            Texture.from("botonNaranjaPresionado"),
            Texture.from("botonNaranjaSeleccionado")
        );
        this.botonReintentar.on(buttonClick, this.onButtonClickReintentar, this);
        this.botonReintentar.height=60;
        this.botonReintentar.width=180;
        this.botonReintentar.position.set(50,450);
        this.addChild(this.botonReintentar);

        this.textNext = new Text("Continue", {
            fontSize:30, 
            fill: 0x000000,
            fontFamily:"Bahnschrift",
        });
        this.textNext.position.set(297,462);
        this.addChild(this.textNext);

        this.textRetry = new Text("Retry", {
            fontSize:30, 
            fill: 0x000000,
            fontFamily:"Bahnschrift",
        });
        this.textRetry.position.set(100,462);
        this.addChild(this.textRetry);

        this.textPause = new Text('Press the "P" key to unpause', {
            fontSize: 30,
            fill: ['#3c303c'],
            fontFamily: "My Special Font",
            fontWeight: "bold",
        });
        this.textPause.anchor.set(0.5,0.5);
        this.textPause.position.set(250,480);
        this.addChild(this.textPause);
        this.textPause.visible = false;
    }

    public setVictory():void{
        this.title.text='Victory!'
        this.botonContinuar.visible = true;
        this.botonReintentar.visible = true;
        this.textNext.visible = true;
        this.textRetry.visible = true;
        this.textPause.visible = false;
    }
    
    public setDefeat():void{
        this.title.text='Defeat';
        this.botonContinuar.visible = true;
        this.botonReintentar.visible = true;
        this.textNext.visible = true;
        this.textRetry.visible = true;
        this.textPause.visible = false;
    }

    public setPaused():void{
        this.title.text='Pause';
        this.botonContinuar.visible = false;
        this.botonReintentar.visible = false;
        this.textNext.visible = false;
        this.textRetry.visible = false;
        this.textPause.visible = true;
    }

    public updateScores(score: number, coins: number, estrellas: number):void{
        this.score = score;
        this.textScoreNumber.text = this.score.toString().concat(' ');
        this.coins = coins;
        this.textCoinsNumber.text = this.coins.toString();
        this.estrellas = estrellas;
        switch(this.estrellas){
            case 1:
                this.myStarLeft.alpha = 1;
                this.myStarLeft.tint = '#FFFFFF';
            break;
        
            case 2:
                this.myStarLeft.alpha = 1;
                this.myStarLeft.tint = '#FFFFFF';
                this.myStarCentral.alpha = 1;
                this.myStarCentral.tint = '#FFFFFF';
            break;

            case 3:
                this.myStarLeft.alpha = 1;
                this.myStarLeft.tint = '#FFFFFF';
                this.myStarCentral.alpha = 1;
                this.myStarCentral.tint = '#FFFFFF';
                this.myStarRight.alpha = 1;
                this.myStarRight.tint = '#FFFFFF';
                this.isVictory = true;
            break;

            default:
            break;
        }
    }

    private onButtonClickContinuar():void{
        if(this.isVictory){
            console.log("Entro acá");
            SceneManager.changeScene(new MenuScene(this.level+1));
        }
        else{
            SceneManager.changeScene(new MenuScene(this.level));
        }
    }
    private onButtonClickReintentar():void{
        const myScene = new GameScene(this.level)
        SceneManager.changeScene(myScene);
        Ticker.shared.add(function(deltaFrame){
            myScene.update(Ticker.shared.deltaMS, deltaFrame);
        })
    }
}