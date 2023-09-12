import { SceneManager } from './utils/SceneManager';
import { LoaderScene } from './scenes/LoaderScene';

SceneManager.initialize();
SceneManager.changeScene(new LoaderScene);