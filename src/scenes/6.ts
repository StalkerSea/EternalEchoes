import { Application, Assets, Sprite } from "pixi.js";
import {
  createDecision,
  createText,
  longerTextBloodyStyle,
} from "../helpers/reusableAssets";
import scene6 from "../../assets/scenes/3.png";
import { initializeScene } from "../helpers/reusableFunctions";
import { fadeIn, fadeInElement, fadeOutElement } from "../helpers/transitions";

export const initializeScene6 = async (app: Application) => {
  await Assets.load(scene6);
  const scene6Image = Sprite.from(scene6);
  scene6Image.width = app.screen.width;
  scene6Image.height = app.screen.height;
  app.stage.addChild(scene6Image);

  const text = await createText({
    text: "These memories... Are they truly mine?",
    x: app.canvas.width / 3,
    y: app.canvas.height / 2,
    anchor: 0.5,
  });

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
      await fadeOutElement({ decision1, decision2, text, scene6Image }, 500);
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
      console.log("After fadeInElement");
      await new Promise((resolve) => setTimeout(resolve, 2500));
      console.log("After timeout 2500");
      await fadeOutElement(text, 2500);
      console.log("After fadeOut 2500");
      await new Promise(async (resolve) => {
        setTimeout(resolve, 2500);
        await initializeScene(app, 7);
      });
      console.log("After initialize");
    },
  });
  app.stage.addChild(text, decision1, decision2);
  fadeInElement([scene6Image, text, decision1, decision2], 500);
};
