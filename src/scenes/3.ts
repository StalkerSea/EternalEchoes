import { Application, Assets, Sprite } from "pixi.js";
import { createDecision, createTextContainer } from "../helpers/reusableAssets";
import scene3 from "../../assets/scenes/3.png";
import { initializeScene } from "../helpers/reusableFunctions";

export const initializeScene3 = async (app: Application) => {
  if (!app.stage.children.length) {
    await Assets.load(scene3);
    const scene3Image = Sprite.from(scene3);
    scene3Image.width = app.screen.width;
    scene3Image.height = app.screen.height;
    app.stage.addChild(scene3Image);
  }

  const text = await createTextContainer({
    text: "Was it just a dream, or could it be a memory?",
    x: app.canvas.width / 3,
    y: app.canvas.height / 2,
    anchor: 0.5,
  });
  app.stage.addChild(text);
  const decision1 = await createDecision({
    text: "I don't think so",
    x: app.canvas.width / 8,
    y: (app.canvas.height / 3) * 2,
    action: () => initializeScene(app, 4, 1),
  });
  const decision2 = await createDecision({
    text: "But if...?",
    x: app.canvas.width / 3,
    y: (app.canvas.height / 3) * 2,
    action: () => initializeScene(app, 4, 2),
  });
  app.stage.addChild(decision1, decision2);
};
