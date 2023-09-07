import { Application, Ticker } from "pixi.js";
import { Keyboard } from "./Keyboard";
import { SceneBase } from "./SceneBase";

export namespace SceneManager{

    export const WHIDTH = 1920;
    export const HEIGHT = 1080;
    let currentScene:SceneBase;

    let app : Application;
    
    export function initialize(){
        if (app != undefined){
            console.error("Don't call initialize twice!");
            return;
        }
            app = new Application({
            view: document.getElementById("pixi-canvas") as HTMLCanvasElement,
            resolution: window.devicePixelRatio || 1,
            autoDensity: true,
            backgroundColor: 0x6495ed,
            width: WHIDTH,
            height: HEIGHT,
        });

        //Todo lo que va en la lógica de index viene acá

        Keyboard.initialize();

        window.addEventListener("resize", ()=>{
        console.log("resize done");
        
        const scaleWidth = window.innerWidth / app.screen.width;
        const scaleHeight = window.innerHeight/app.screen.height;
        const scaleScreen = Math.min(scaleWidth, scaleHeight);

        const gameWhidth = Math.round(app.screen.width * scaleScreen);
        const gameHeight = Math.round(app.screen.height * scaleScreen);

        const marginVertical = Math.floor((window.innerWidth - gameWhidth)/2);
        const marginHorizontal = Math.floor((window.innerHeight - gameHeight)/2);

        const canvas = app.view as HTMLCanvasElement;

        canvas.style.width = gameWhidth + "px";
        canvas.style.height = gameHeight + "px";

        canvas.style.marginLeft = marginVertical + "px";
        canvas.style.marginRight = marginVertical + "px";

        canvas.style.marginTop = marginHorizontal + "px";
        canvas.style.marginBottom = marginHorizontal + "px";
        });
        window.dispatchEvent(new Event("resize"));

        Ticker.shared.add(update);

    }

    export function changeScene(newScene:SceneBase){
        if(currentScene){
            currentScene.destroy();
        }
        currentScene = newScene;
        app.stage.addChild(currentScene);
    }

    function update(framePassed:number){
        //Group.shared.update(); --> Por ahora no lo uso
        currentScene?.update(framePassed, Ticker.shared.elapsedMS);
    }
}