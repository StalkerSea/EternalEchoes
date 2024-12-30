import { Application, Assets, Sprite } from "pixi.js";
import { fadeInImage, glitch } from "../helpers/transitions";
import slash from "../../assets/sounds/slash.mp3";
import scene3 from "../../assets/scenes/3.png";
import { initializeScene } from "../helpers/reusableFunctions";

export const initializeScene2 = async (app: Application) => {
  const slashSound = new Audio(slash);
  slashSound.play();

  await Assets.load(scene3);
  const scene3Image = Sprite.from(scene3);
  scene3Image.width = app.screen.width;
  scene3Image.height = app.screen.height;
  app.stage.addChild(scene3Image);
  fadeInImage(scene3Image, 500);

  glitch(app, scene3, scene3Image);
  window.scene = 3;
  initializeScene(app, 3);
};
