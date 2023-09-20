import { Text, Assets, Container, Graphics } from "pixi.js";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { Keyboard } from "../utils/Keyboard";
import { MenuScene } from "./MenuScene";

export class PressKeyScene extends SceneBase{

    private boundHandleKeyPress: () => void;
    private subTitle: Text;
    private isFadingIn: boolean = true;
    private alphaIncrement: number = 0.001;

    constructor() {
        super();

        this.boundHandleKeyPress = this.handleKeyPress.bind(this);
        this.subTitle = new Text();

        // Crea el constructor para añadir los componentes del título
        const titleGame = new Container();
        titleGame.position.set(-100,0);
        this.addChild(titleGame);

        const fontSwissPromise = Assets.load("fontSwiss");
        const myFontPromise = Assets.load("MyFont");
        
        Promise.all([fontSwissPromise, myFontPromise]).then(() => {
            this.subTitle = new Text('Press enter to continue', {
            fontSize: 70,
            fill: ['#d2d2d2', '#dcbdcd', '#d1a28f', '#ecaf79', '#fd9e68', '#fd7c46', '#fe5a24', '#fe5a24'],
            fontFamily: "My Special Font",
            fontWeight: "bold",
            dropShadow: true,
            dropShadowAngle: Math.PI/6,
            dropShadowColor: 0xAAAAAA,
            dropShadowDistance: 3
          });
          this.subTitle.anchor.set(0.5,0.5);
          this.subTitle.position.set(SceneManager.WIDTH*0.5, SceneManager.HEIGHT*0.77);
          this.addChild(this.subTitle);
    
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
          Keyboard.up.on("Enter", this.boundHandleKeyPress);
        });
    }

    private handleKeyPress() {
        Keyboard.up.off("Enter", this.boundHandleKeyPress);
        SceneManager.changeScene(new MenuScene());
    }

    public override update(_deltaFrame: number, deltaTime: number) {
        // Cambia la transparencia gradualmente
        if (this.isFadingIn) {
            this.subTitle.alpha += this.alphaIncrement * deltaTime;
            if (this.subTitle.alpha >= 1) {
                this.subTitle.alpha = 1;
                this.isFadingIn = false; // Deja de desvanecer y comienza a desvanecer
            }
        } else {
            this.subTitle.alpha -= this.alphaIncrement * deltaTime;
            if (this.subTitle.alpha <= 0) {
                this.subTitle.alpha = 0;
                this.isFadingIn = true; // Deja de desvanecer y comienza a desvanecer
            }
        }
    }
}