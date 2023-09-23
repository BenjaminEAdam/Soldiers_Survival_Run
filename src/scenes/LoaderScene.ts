import { Assets, Container, Graphics, Text} from "pixi.js";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { PressKeyScene } from "./PressKeyScene";
import { assets } from "../assets";

export class LoaderScene extends SceneBase {
    
  private throbber: Graphics;
  

  constructor() {
    super();

    // Crea el contenedor para añadir los componentes del título
    const titleGame = new Container();
    titleGame.position.set(-100,0);
    this.addChild(titleGame);
    
    // Crea un throbber
    this.throbber = new Graphics();
    this.throbber.position.set(SceneManager.WIDTH*0.5, SceneManager.HEIGHT*0.9);
    this.throbber.scale.set(3,3);
    this.addChild(this.throbber);

    Assets.add("MyFont", "./fonts/ISOCP.ttf", { "family": "My Special Font" });
    Assets.add("fontSwiss", "./fonts/Swiss721BoldOutlineBT.ttf", { "family": "My Swiss721BoldOutlineBT" });
    const fontSwissPromise = Assets.load("fontSwiss");
    const myFontPromise = Assets.load("MyFont");
    
    Promise.all([fontSwissPromise, myFontPromise]).then(() => {
      const subTitle = new Text('Loading...', {
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
      subTitle.position.set(SceneManager.WIDTH*0.5, SceneManager.HEIGHT*0.77);
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

      Assets.addBundle("myAssets", assets);
      Assets.loadBundle(["myAssets"]).then(() => { // Inicia la carga de activos
        this.whenLoadFinished(); // Cuando la carga esté completa, llama a la función whenLoadFinished
      });
    });
  }

  public update() {
      // Limpia el gráfico
      this.throbber.clear();

      const centerX = this.throbber.width / 2;
      const centerY = this.throbber.height / 2;
      const radius = 17;

      for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4; // Ángulo en radianes (45 grados)
      const x = centerX + Math.cos(angle) * radius;
      const y = centerY + Math.sin(angle) * radius;

      // Dibuja un rectángulo con esquinas redondeadas en la posición calculada
      this.throbber.beginFill('#fe5a24');
      this.throbber.drawRoundedRect(x - 5, y - 5, 10, 10, 5);
      this.throbber.endFill();
      }

      // Rota el throbber
      this.throbber.rotation += 0.05;
  }

  // Función para realizar acciones después de que se carguen los activos
  private whenLoadFinished() {
    SceneManager.changeScene(new PressKeyScene());
  }
}