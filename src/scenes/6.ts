import { Application, Assets, Sprite } from "pixi.js";
import {
  createDecision,
  createTextContainer,
  longerTextBloodyStyle,
} from "../helpers/reusableAssets";
import scene6 from "../../assets/scenes/3.png";
import { initializeScene } from "../helpers/reusableFunctions";
import { fadeInElement, fadeOutElement } from "../helpers/transitions";

export const initializeScene6 = async (app: Application) => {
  await Assets.load(scene6);
  const scene6Image = Sprite.from(scene6);
  scene6Image.width = app.screen.width;
  scene6Image.height = app.screen.height;
  app.stage.addChild(scene6Image);

  const text = await createTextContainer({
    text: "These memories... Are they truly mine?",
    x: app.canvas.width / 3,
    y: app.canvas.height / 2,
    anchor: 0.5,
  });

  const decision1 = await createDecision({
    text: "Search for\nmore memories",
    x: app.canvas.width / 8,
    y: (app.canvas.height / 3) * 2,
    action: () => initializeScene(app, 7),
  });

  const decision2 = await createDecision({
    text: "Interrupt\nconnection",
    x: app.canvas.width / 3,
    y: (app.canvas.height / 3) * 2,
    action: async () => {
      await fadeOutElement({ decision1, decision2, text, scene6Image }, 500);
      const textVerify = await createTextContainer({
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
      await fadeOutElement(text, 2500);
      await new Promise(async (resolve) => {
        setTimeout(resolve, 2500);
        await initializeScene(app, 7);
      });
    },
  });
  app.stage.addChild(text, decision1, decision2);
  fadeInElement([scene6Image, text, decision1, decision2], 500);
};
