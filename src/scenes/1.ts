// filepath: /Users/luckyazumi/Projects/Games/EternalEchoes/src/scene1.ts
import { Application, Assets, Sprite, Text } from "pixi.js";
import { fadeOut, fadeIn } from "../helpers/transitions";
import scene1Image from "../../assets/scenes/1.png";
import {
  bloodyStyle,
  createText,
  normalStyleWhite,
} from "../helpers/reusableAssets";
import { initializeScene } from "../helpers/reusableFunctions";

export const initializeScene1 = async (app: Application) => {
  app.stage.removeChildren();
  const basicText = new Text({
    text: "Just the weak ones choose the wrong side of the war",
    style: bloodyStyle,
  });

  // Center the text
  basicText.anchor.set(0.5);
  basicText.x = app.screen.width / 2;
  basicText.y = app.screen.height / 2;
  app.stage.addChild(basicText);

  // Wait for 2000ms before proceeding
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Fade out current scene
  await fadeOut(app, 1000); // 500ms duration

  // Clear the stage
  app.stage.removeChildren();

  const scene1Texture = await Assets.load(scene1Image);
  const scene1: Sprite = new Sprite(scene1Texture);
  app.stage.addChild(scene1);

  const text = createText({
    text: "We always choose the good side",
    x: app.screen.width / 2,
    y: app.screen.height / 2,
    style: normalStyleWhite,
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
  let nextSceneNumber = window.scene;

  // Initialize the next scene
  initializeScene(app, nextSceneNumber);

  // Fade in the next scene
  await fadeIn(app, 1500);
};
