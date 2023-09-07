import { Assets} from 'pixi.js'
import { assets } from './assets';
import { MenuScene } from './scenes/MenuScene';
import { SceneManager } from './utils/SceneManager';

Assets.addBundle("myAssets", assets);

Assets.loadBundle(["myAssets"]).then(() => {
	const myScene = new MenuScene;
	SceneManager.initialize();
	SceneManager.changeScene(myScene)
});