import { Application, Assets, Sprite } from "pixi.js";
import {
  createDecision,
  createTextContainer,
  decisionStyleBlack,
} from "../helpers/reusableAssets";
import a from "../../assets/scenes/4.png";
import b from "../../assets/scenes/4B.png";
import { fadeIn, fadeOut, glitch } from "../helpers/transitions";
import { initializeScene } from "../helpers/reusableFunctions";

export const initializeScene4 = async (app: Application, choice: number) => {
  await fadeOut(app, 500);
  app.stage.removeChildren();
  if (choice === 1) {
    loadSceneA(app);
  } else {
    loadSceneB(app);
  }
};

const loadSceneA = async (app: Application) => {
  await Assets.load(a);
  const aImage = Sprite.from(a);
  aImage.width = app.screen.width;
  aImage.height = app.screen.height;
  app.stage.addChild(aImage);
  const text = await createTextContainer({
    text: "You'll never escape from here",
    x: app.canvas.width / 3,
    y: app.canvas.height / 2,
    anchor: 0.5,
  });
  app.stage.addChild(text);
  await fadeIn(app, 500);
  setTimeout(() => {
    initializeScene(app, 5);
  }, 2000);
  //Play sound which we don't have yet
  //"¿Por qué sigues aferrándote a lo que no entiendes?";
};

const loadSceneB = async (app: Application) => {
  await Assets.load(b);
  const SceneB = Sprite.from(b);
  SceneB.width = app.screen.width;
  SceneB.height = app.screen.height;
  app.stage.addChild(SceneB);
  await fadeIn(app, 500);
  glitch(app, b, SceneB);
  //setTimeout(() => {}, 5000);

  const text = await createTextContainer({
    text: "How could I have human memories?",
    x: app.canvas.width / 3,
    y: app.canvas.height / 2,
    anchor: 0.5,
  });
  app.stage.addChild(text);
  const decision1 = await createDecision({
    text: "Investigate further\nabout the memories",
    x: app.canvas.width / 8,
    y: (app.canvas.height / 3) * 2,
    style: decisionStyleBlack,
    action: () => {
      if (!window.choices) {
        window.choices = new Array<boolean>(2).fill(false);
      }
      window.choices[0] = true;
      initializeScene(app, 5);
    },
  });
  const decision2 = await createDecision({
    text: "Ignore the memories\n and move on",
    x: app.canvas.width / 3,
    y: (app.canvas.height / 3) * 2,
    style: decisionStyleBlack,
    action: () => {
      initializeScene(app, 5);
    },
  });
  app.stage.addChild(decision1, decision2);
};
