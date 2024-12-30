import { Application, Assets, Sprite } from "pixi.js";
import {
  createDecision,
  createText,
  longerTextBloodyStyle,
} from "../helpers/reusableAssets";
import scene7 from "../../assets/scenes/4.png";
import { initializeScene } from "../helpers/reusableFunctions";
import {
  fadeIn,
  fadeInElement,
  fadeOut,
  fadeOutElement,
} from "../helpers/transitions";

export const initializeScene7 = async (app: Application) => {
  app.stage.removeChildren();
  const text = await createText({
    text: "What is this... \nWas I actually human..?\n\nEND\n(currently in development, first game!).",
    x: app.canvas.width / 2,
    y: app.canvas.height / 2,
    anchor: 0.5,
    style: longerTextBloodyStyle,
    removeBg: true,
  });
  app.stage.addChild(text);
  fadeInElement(text, 500);
  /*await fadeOut(app, 50);
  await Assets.load(scene7);
  const scene7Image = Sprite.from(scene7);
  scene7Image.width = app.screen.width;
  scene7Image.height = app.screen.height;
  app.stage.addChild(scene7Image);

  const text = await createText({
    text: "These memories... Are they truly mine?",
    x: app.canvas.width / 3,
    y: app.canvas.height / 2,
    anchor: 0.5,
  });
  app.stage.addChild(text);
  const decision1 = await createDecision({
    stage: app.stage,
    text: "Search for\nmore memories",
    x: app.canvas.width / 8,
    y: (app.canvas.height / 3) * 2,
    action: () => initializeScene(app, 7),
  });
  const decision2 = await createDecision({
    stage: app.stage,
    text: "Interrupt\nconnection",
    x: app.canvas.width / 3,
    y: (app.canvas.height / 3) * 2,
    action: async () => {
      await fadeOutElement({ decision1, decision2, text, scene7Image }, 500);
      const textVerify = await createText({
        text: "Are you sure you want to unplug?",
        x: app.canvas.width / 2,
        y: app.canvas.height / 2,
        style: longerTextBloodyStyle,
        anchor: 0.5,
        removeBg: true,
      });
      app.stage.addChild(textVerify);
      await fadeInElement(textVerify, 500);
      await new Promise((resolve) => setTimeout(resolve, 2500));
      await fadeOutElement(text, 1500);
      await initializeScene(app, 7);
    },
  });
  app.stage.addChild(decision1, decision2);
  fadeIn(app, 500);*/
};
