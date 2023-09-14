import { Assets, Graphics, Text} from "pixi.js";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { manifest } from "../assets";
//import { PressKeyScene } from "./PressKeyScene";

export class LoaderScene extends SceneBase {
    
  private throbber: Graphics;
  

  constructor() {
    super();

    // Crea un throbber
    this.throbber = new Graphics();
    this.throbber.position.set(SceneManager.WIDTH*0.5, SceneManager.HEIGHT*0.9);
    this.throbber.scale.set(3,3);
    this.addChild(this.throbber);

    Assets.add("MyFont", "./fonts/ISOCP.ttf", { "family": "My Special Font" });
    Assets.load("MyFont").then(() => {
        const t = new Text('Loading...', {
          fontSize: 70,
          fill: ['#00ff00', '#00ff00', '#00ff00', '#e2e2e2', '#e2e2e2', '#9fb09e', '#9fb09e'],
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
        fontSize:200,
        fill: ['#e2e2e2','#c0c0c0','#9fb09e','#ff0000'],
        fontFamily:"My Swiss721BoldOutlineBT",
        dropShadow: true,
        dropShadowColor: '#000000',
        dropShadowBlur: 4,
        dropShadowAngle: Math.PI/4,
        dropShadowDistance: 7,
        lineJoin: 'round',
    })
    titleText.anchor.set(0.5,0.5);
    titleText.position.set(SceneManager.WIDTH*0.5, SceneManager.HEIGHT*0.3);
    this.addChild(titleText);
    })

    // Inicia la carga de activos y la animación del throbber
    this.downloadAssets().then(() => {
      // Cuando la carga esté completa, llama a la función whenLoadFinished
      this.whenLoadFinished();
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
      this.throbber.beginFill(0x9fb09e);
      this.throbber.drawRoundedRect(x - 5, y - 5, 10, 10, 5);
      this.throbber.endFill();
      }

      // Rota el throbber
      this.throbber.rotation += 0.05;
      console.log("Estoy siendo llamada");
  }

  // Función para cargar activos
  private async downloadAssets() {
    Assets.add("fontISOCP", "./fonts/ISOCP.ttf", { "family": "My Special Font" });
    Assets.load("fontISOCP");
    const bundleId = manifest.bundles.find(bundle => bundle.name = "mainScene");
    if(bundleId){
      await Assets.init({ manifest: manifest });
      await Assets.loadBundle(["mainScene"]);
    }else{console.error("No se encontró -mainScene- en manifest");}
  }

  // Función para realizar acciones después de que se carguen los activos
  private whenLoadFinished() {
    console.log("Ya terminé la carga de assets");
    //SceneManager.changeScene(new PressKeyScene);
  }
}