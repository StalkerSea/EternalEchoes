// filepath: /Users/luckyazumi/Projects/Games/EternalEchoes/src/scene1.ts
import { Application, Assets, Sprite, Text } from "pixi.js";
import { fadeOut, fadeIn } from "../helpers/transitions";
import scene1Image from "../../assets/scenes/1.png";
import { initializeScene } from "..";
import {
  bloodyStyle,
  normalStyleBlack,
  createText,
} from "../helpers/reusableAssets";

export const initializeScene1 = async (app: Application) => {
  app.stage.removeChildren();
  const basicText = new Text({
    text: "The weak ones always choose the wrong side on the war",
    style: bloodyStyle,
  });

  // Center the text
  basicText.anchor.set(0.5);
  basicText.x = app.screen.width / 2;
  basicText.y = app.screen.height / 2;
  app.stage.addChild(basicText);

  // Wait for 500ms before proceeding
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Fade out current scene
  await fadeOut(app, 1000); // 500ms duration

  // Clear the stage
  app.stage.removeChildren();

  const scene1Texture = await Assets.load(scene1Image);
  const scene1: Sprite = new Sprite(scene1Texture);
  app.stage.addChild(scene1);

  const text = createText({
    app: app,
    text: "We always choose the good side",
    x: app.screen.width / 2,
    y: app.screen.height / 2,
    style: normalStyleBlack,
    anchor: 0.5,
  });
  app.stage.addChild(await text);

  // Fade in new scene
  await fadeIn(app, 1500); // 1500ms duration

  // Wait briefly for 1000ms
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Remove the text
  app.stage.removeChild(await text);

  if (!window.scene) {
    window.scene = 2;
  } else {
    window.scene++;
  }
  console.log("Next scene: ", window.scene);
  let nextSceneNumber = window.scene;

  // Initialize the next scene
  initializeScene(app, nextSceneNumber);

  // Fade in the next scene
  await fadeIn(app, 1500);
};
