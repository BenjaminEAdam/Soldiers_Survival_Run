import { Sprite} from "pixi.js";
import { SceneBase } from "../utils/SceneBase";
import { SceneManager } from "../utils/SceneManager";

export class MenuScene extends SceneBase{

    constructor(){
        super();

        const clampy: Sprite = Sprite.from("clampy");

        clampy.anchor.set(0.5);

        clampy.x = SceneManager.WHIDTH / 2;
        clampy.y = SceneManager.HEIGHT / 2;

        this.addChild(clampy);

    }

    public update(): void{}
}