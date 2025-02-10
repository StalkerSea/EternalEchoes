import { Application, Assets, Sprite } from "pixi.js";
import {
  createDecision,
  createTextContainer,
  longerTextBloodyStyle,
  longTextStyle,
  smallTextStyle,
} from "../helpers/reusableAssets";
import scene5 from "../../assets/scenes/1.png";
import { initializeScene } from "../helpers/reusableFunctions";
import {
  fadeIn,
  fadeInElement,
  fadeOut,
  fadeOutElement,
} from "../helpers/transitions";

export const initializeScene5 = async (app: Application) => {
  await fadeOut(app, 500);
  app.stage.removeChildren();

  await Assets.load(scene5);
  const scene5Image = Sprite.from(scene5);
  scene5Image.width = app.screen.width;
  scene5Image.height = app.screen.height;
  app.stage.addChild(scene5Image);

  const part1 = await createTextContainer({
    text: "My name is Kimiko. I am an onna-bugeisha\nfighting in the civil war of 1467 in Japan.",
    x: app.canvas.width / 3,
    y: app.canvas.height / 2,
    anchor: 0.5,
    style: longTextStyle,
  });
  app.stage.addChild(part1);
  await fadeIn(app, 1000);
  await new Promise((resolve) => setTimeout(resolve, 2500));
  await fadeOutElement(part1, 1000);

  const part2 = await createTextContainer({
    text: "My destiny depends on my choice,\nI need to think carefully.",
    x: app.canvas.width / 3,
    y: app.canvas.height / 2,
    anchor: 0.5,
    style: smallTextStyle,
  });
  part2.alpha = 0;
  app.stage.addChild(part2);

  const decision1 = await createDecision({
    text: "Run away\nfrom the war",
    x: app.canvas.width / 8,
    y: (app.canvas.height / 3) * 2,
    action: () => die(app, 1),
  });
  const decision2 = await createDecision({
    text: "Join the war\nand fight",
    x: app.canvas.width / 3,
    y: (app.canvas.height / 3) * 2,
    action: () => die(app, 2),
  });
  app.stage.addChild(decision1, decision2);
  fadeInElement(part2, 250);
  fadeInElement([decision1, decision2], 500);
  window.scene = 6;
};

const die = async (app: Application, choice: number) => {
  let dieTextBase =
    "I chose to run away from the war,\nbut I was killed by a samurai.";
  if (choice == 2) {
    dieTextBase =
      "I chose to join the war and fight,\nbut I was killed by a samurai.";
  }
  await fadeOut(app, 500);
  app.stage.removeChildren();
  const dieText = await createTextContainer({
    text: dieTextBase,
    x: app.canvas.width / 2,
    y: app.canvas.height / 2,
    anchor: 0.5,
    style: longerTextBloodyStyle,
    removeBg: true,
  });
  app.stage.addChild(dieText);
  await fadeIn(app, 1000);
  await new Promise((resolve) => setTimeout(resolve, 2500));
  await fadeOutElement(dieText, 1000);

  const next = await createTextContainer({
    text: "The cycle started here...",
    x: app.canvas.width / 2,
    y: app.canvas.height / 2,
    anchor: 0.5,
    style: longerTextBloodyStyle,
    removeBg: true,
  });
  app.stage.addChild(next);
  await fadeIn(app, 1000);
  await new Promise((resolve) => setTimeout(resolve, 1500));
  await fadeOutElement(next, 1000);

  const next2 = await createTextContainer({
    text: "Will you break it?",
    x: app.canvas.width / 2,
    y: app.canvas.height / 2,
    anchor: 0.5,
    style: longerTextBloodyStyle,
    removeBg: true,
  });
  app.stage.addChild(next2);
  await fadeIn(app, 1000);
  await new Promise((resolve) => setTimeout(resolve, 2500));
  await fadeOutElement(next2, 1000);
  initializeScene(app, 6);
};
