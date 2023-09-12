import { Assets, Graphics } from "pixi.js";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";
import { MenuScene } from "./MenuScene";
import { manifest } from "../assets";

export class LoaderScene extends SceneBase{

    private bar: Graphics;

    constructor(){
        super();
        this.bar = new Graphics();
        this.bar.beginFill(0xef9b43, 1);
        this.bar.drawRoundedRect(0,0,SceneManager.WHIDTH * 0.7, SceneManager.HEIGHT * 0.07, 100);
        this.bar.endFill();

        const borderBar = new Graphics();
        borderBar.lineStyle(20,0xc64724, 1);
        borderBar.beginFill(0x000000, 0);
        borderBar.drawRoundedRect(0,0,SceneManager.WHIDTH * 0.7, SceneManager.HEIGHT * 0.07, 100);
        borderBar.endFill();

        this.bar.x = SceneManager.WHIDTH * 0.5 - this.bar.width / 2;
        this.bar.y = SceneManager.HEIGHT * 0.87;

        borderBar.x = SceneManager.WHIDTH * 0.5 - borderBar.width / 2;
        borderBar.y = SceneManager.HEIGHT * 0.87;

        this.addChild(this.bar);
        this.addChild(borderBar);
        this.simulateAssetLoadDelay();   
        
    }

    private async downloadAssets(){
        await Assets.init({ manifest: manifest });
        const bundleIds =  manifest.bundles.map(bundle => bundle.name);
        await Assets.loadBundle(bundleIds, this.setBarPercent.bind(this));
    }

    private setBarPercent(percent:number) {
        this.bar.scale.x = percent;
    }

    private whenLoadFinished(){
        SceneManager.changeScene(new MenuScene);
    }

    private async simulateAssetLoadDelay() {
        // Simular una demora de 5 segundos antes de la carga de activos
        await new Promise(resolve => setTimeout(resolve, 5000));
      
        // Llamar a la función de descarga de activos después de la demora
        this.downloadAssets().then(() => {
            this.whenLoadFinished();
        });
    }

    public override update(): void {}

}