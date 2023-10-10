import { Container, DisplayObjectEvents, Graphics, Text, Texture, Ticker} from "pixi.js";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { Button } from "../utils/Button";
import { GameScene } from "./GameScene";

export class MenuScene extends SceneBase{

    private botonContinuar: Button;
    private botonNextLevel: Button;
    private botonPreviousLevel: Button;
    private level: number;

    constructor(level: number){
        super();
        
        this.level = level;

        // Crea el contenedor para añadir los componentes del título
        const titleGame = new Container();

        const subTitle = new Text('Level '.concat(level.toString()), {
            fontSize: 70,
            fill: ['#d2d2d2', '#dcbdcd', '#d1a28f', '#ecaf79', '#fd9e68', '#fd7c46', '#fe5a24', '#fe5a24'],
            fontFamily: "My Special Font",
            fontWeight: "bold",
            dropShadow: true,
            dropShadowAngle: Math.PI/6,
            dropShadowColor: 0xAAAAAA,
            dropShadowDistance: 3
        });
        subTitle.anchor.set(0.5,0.5);
        subTitle.position.set(SceneManager.WIDTH*0.5, SceneManager.HEIGHT*0.5);
        this.addChild(subTitle);


        const titleText = new Text('urvival     un',{
        fontSize:210,
        fill: ['#d2d2d2', '#dcbdcd', '#d1a28f', '#ecaf79', '#fd9e68', '#fd7c46', '#fe5a24', '#fe3802'],
        fontFamily:"My Swiss721BoldOutlineBT",
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI/4,
        dropShadowDistance: 7,
        lineJoin: 'round',
        });
        titleText.anchor.set(0.5,0.5);
        titleText.position.set(SceneManager.WIDTH*0.5, SceneManager.HEIGHT*0.3);
        titleGame.addChild(titleText);
        const titleTextMayus = new Text('S          R',{
        fontSize:280,
        fill: ['#d2d2d2', '#dcbdcd', '#d1a28f', '#ecaf79', '#fd9e68', '#fd7c46', '#fe5a24', '#fe3802'],
        fontFamily:"My Swiss721BoldOutlineBT",
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI/4,
        dropShadowDistance: 7,
        lineJoin: 'round',
        });
        titleTextMayus.anchor.set(0.5,0.5);
        titleTextMayus.position.set(SceneManager.WIDTH*0.38, SceneManager.HEIGHT*0.3);
        titleGame.addChild(titleTextMayus);
        
        // Crea la señal de electrocardiograma
        const signalECG = new Graphics();
        signalECG.moveTo(SceneManager.WIDTH*0.14, SceneManager.HEIGHT*0.39);
        const startX_Line1 = SceneManager.WIDTH * 0.14;
        const endX_Line1 = SceneManager.WIDTH * 0.82;
        for (let i = 0; i <= 100; i++) {
        const x = startX_Line1 + (endX_Line1 - startX_Line1) * (i / 100);
        signalECG.lineStyle(10, 0xff1600, i / 100);
        signalECG.lineTo(x, SceneManager.HEIGHT * 0.39);
        }
        signalECG.lineTo(SceneManager.WIDTH*(0.82+0.03), SceneManager.HEIGHT*(0.39-0.2));
        signalECG.lineTo(SceneManager.WIDTH*(0.82+0.06), SceneManager.HEIGHT*(0.39+0.2));
        signalECG.lineTo(SceneManager.WIDTH*(0.82+0.09), SceneManager.HEIGHT*(0.39));
        const startX_Line2 = SceneManager.WIDTH * 0.908;
        const endX_Line2 = SceneManager.WIDTH * 1.06;
        for (let i = 0; i <= 100; i++) {
        const x = startX_Line2 + (endX_Line2 - startX_Line2) * (i / 100);
        signalECG.lineStyle(10, 0xff1600, 1-(i / 100));
        signalECG.lineTo(x, SceneManager.HEIGHT * 0.39);
        }
        signalECG.endFill();
        titleGame.addChild(signalECG);

        titleGame.scale.set(0.5,0.5);
        titleGame.pivot.set(titleGame.width, 0);
        titleGame.position.set((SceneManager.WIDTH/2),0);
        this.addChild(titleGame);

        const buttonClick = "buttonClick" as keyof DisplayObjectEvents

        this.botonContinuar = new Button(
            Texture.from("botonGris"),
            Texture.from("botonGrisPresionado"),
            Texture.from("botonGrisSeleccionado")
        );
        this.botonContinuar.on(buttonClick, this.onButtonClickContinuar, this);
        this.botonContinuar.height=80;
        this.botonContinuar.width=240;
        this.botonContinuar.position.set(SceneManager.WIDTH*0.5-this.botonContinuar.width/2,SceneManager.HEIGHT*0.77);
        this.addChild(this.botonContinuar);

        const textPlay = new Text("Play", {
            fontSize:50, 
            fill: 0x111111,
            fontFamily:"Bahnschrift",
            dropShadow: true,
            dropShadowAngle: Math.PI/6,
            dropShadowColor: 0xAAAAAA,
            dropShadowDistance: 1,
        });
        textPlay.position.set(SceneManager.WIDTH*0.5 - textPlay.width/2, SceneManager.HEIGHT*0.78);
        this.addChild(textPlay);

        this.botonNextLevel = new Button(
            Texture.from("botonNavegacionSiguiente"),
            Texture.from("botonNavegacionSiguientePresionado"),
            Texture.from("botonNavegacionSiguienteSeleccionado")
        );
        this.botonNextLevel.on(buttonClick, this.onButtonClickNextLevel, this);
        this.botonNextLevel.height=80;
        this.botonNextLevel.width=80;
        this.botonNextLevel.position.set(SceneManager.WIDTH*0.9,SceneManager.HEIGHT*0.5 - this.botonNextLevel.height/2);
        this.addChild(this.botonNextLevel);

        this.botonPreviousLevel = new Button(
            Texture.from("botonNavegacionAnterior"),
            Texture.from("botonNavegacionAnteriorPresionado"),
            Texture.from("botonNavegacionAnteriorSeleccionado")
        );
        this.botonPreviousLevel.on(buttonClick, this.onButtonClickPreviousLevel, this);
        this.botonPreviousLevel.height=80;
        this.botonPreviousLevel.width=80;
        this.botonPreviousLevel.position.set(SceneManager.WIDTH*0.1,SceneManager.HEIGHT*0.5 - this.botonPreviousLevel.height/2);
        this.addChild(this.botonPreviousLevel);


    }

    private onButtonClickContinuar():void{
        console.log("Button click continuar!");
        const myScene = new GameScene(this.level)
        SceneManager.changeScene(myScene);
        Ticker.shared.add(function(deltaFrame){
            myScene.update(Ticker.shared.deltaMS, deltaFrame);
        })
    }

    private onButtonClickNextLevel():void{
        console.log("Button click next!");
        SceneManager.changeScene(new MenuScene(this.level+1));
    }

    private onButtonClickPreviousLevel():void{
        console.log("Button click previous!");
        if(this.level > 1){
            SceneManager.changeScene(new MenuScene(this.level-1));
        }
    }

    public update(): void{}
}