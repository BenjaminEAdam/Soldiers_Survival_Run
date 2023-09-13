import { Assets, Graphics, Text} from "pixi.js";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { MenuScene } from "./MenuScene";
import { manifest } from "../assets";

export class LoaderScene extends SceneBase {
    
    private throbber: Graphics;
    private loadingText: Text;
  
    constructor() {
      super();
  
      // Crea un throbber y un mensaje de carga
      this.throbber = new Graphics();
      this.throbber.position.set(SceneManager.WIDTH*0.5, SceneManager.HEIGHT*0.9);
      this.throbber.scale.set(3,3);
      this.addChild(this.throbber);
      //this.createThrobber();

      this.loadingText = new Text("Soldier's Survival Run", 
      { fontSize:200,
        fill: 0xdbe7db,
        fontFamily:"Arial Black",
        dropShadow: true,
        dropShadowAngle: Math.PI/6,
        dropShadowColor: 0xAAAAAA,
        dropShadowDistance: 3,
      });
      this.loadingText.anchor.set(0.5,0.5);
      this.loadingText.position.set(SceneManager.WIDTH*0.5, SceneManager.HEIGHT*0.3);
      this.addChild(this.loadingText);
  
      this.loadingText = new Text("Cargando", 
      { fontSize:100,
        fill: 0xdbe7db,
        fontFamily:"Arial",
        //dropShadow: true,
        //dropShadowAngle: Math.PI/6,
        //dropShadowColor: 0xAAAAAA,
        //dropShadowDistance: 3,
      });
      this.loadingText.anchor.set(0.5,0.5);
      this.loadingText.position.set(SceneManager.WIDTH*0.5, SceneManager.HEIGHT*0.77);
      this.addChild(this.loadingText);

  
      // Inicia la carga de activos y la animación del throbber
      this.simulateAssetLoadDelay();
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
      await Assets.init({ manifest: manifest });
      const bundleIds = manifest.bundles.map(bundle => bundle.name);
      await Assets.loadBundle(bundleIds);
    }
  
    // Función para realizar acciones después de que se carguen los activos
    private whenLoadFinished() {
      SceneManager.changeScene(new MenuScene());
    }

    private async simulateAssetLoadDelay() {
        // Simular una demora de 5 segundos antes de la carga de activos
        await new Promise(resolve => setTimeout(resolve, 100000));
      
        // Llamar a la función de descarga de activos después de la demora
        this.downloadAssets().then(() => {
             // Cuando la carga esté completa, llama a la función whenLoadFinished
            this.whenLoadFinished();
        });
    }

}