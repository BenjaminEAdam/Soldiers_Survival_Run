import { Application, Sprite, Texture, Ticker} from "pixi.js";
import { Keyboard } from "./Keyboard";
import { SceneBase } from "./SceneBase";

export namespace SceneManager{

    export const WIDTH = 1920;
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
            backgroundColor: 0x0,
            width: WIDTH,
            height: HEIGHT,
        });

        // Crea un fondo degradado utilizando una textura personalizada
        const background = createGradientBackground(WIDTH, HEIGHT);
        app.stage.addChild(background);

        //Todo lo que va en la lógica de index viene acá

        Keyboard.initialize();

        window.addEventListener("resize", ()=>{
        
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

    function createGradientBackground(width: number, height: number): Sprite {
        const quality = 256;
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = quality;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            console.log("Error canvas 2d");
            throw new Error("No se pudo obtener el contexto 2D del lienzo.");
        }
    
        // Crea un gradiente lineal en el contexto 2D
        const gradient = ctx.createLinearGradient(0, 0, 0, quality);
        gradient.addColorStop(0, '#ecaf79');
        gradient.addColorStop(0.3, '#c0917f');
        gradient.addColorStop(0.7, '#987989');
        gradient.addColorStop(1, '#50464f');
    
        // Rellena el lienzo con el gradiente
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 1, quality);
    
        // Crea una textura desde el lienzo
        const texture = Texture.from(canvas);
    
        // Crea un sprite con la textura degradada
        const sprite = new Sprite(texture);
    
        // Ajusta el tamaño del sprite para cubrir el fondo completo
        sprite.width = width;
        sprite.height = height;
    
        // Devuelve la textura del sprite
        return sprite;
      }

}