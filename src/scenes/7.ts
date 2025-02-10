import { Application, Assets, Sprite } from "pixi.js";
import {
  createDecision,
  createTextContainer,
  longerTextBloodyStyle,
  longerTextWhiteStyle,
} from "../helpers/reusableAssets";
import scene7 from "../../assets/scenes/4.png";
import { addTimer, initializeScene } from "../helpers/reusableFunctions";
import {
  fadeIn,
  fadeInElement,
  fadeOut,
  fadeOutElement,
  fadeOutSound,
} from "../helpers/transitions";

export const initializeScene7 = async (app: Application) => {
  // Fade out the screen and remove all children
  await fadeOut(app, 50);
  app.stage.removeChildren();

  // Prepare the text for the scene
  const startingText = await createTextContainer({
    text: "My name was Hanako.\nI didn't have freedom...\nWhen I tried to escape, he stopped me",
    x: app.canvas.width / 2,
    y: app.canvas.height / 2,
    anchor: 0.5,
    style: longerTextBloodyStyle,
    removeBg: true,
  });
  // Add the text to the stage, fade it in, wait for 2.5 seconds, then fade it out
  app.stage.addChild(startingText);
  await fadeIn(app, 1000);
  await new Promise((resolve) => setTimeout(resolve, 2500));
  await fadeOutElement(startingText, 1000);

  await Assets.load(scene7);
  const scene7Image = Sprite.from(scene7);
  scene7Image.width = app.screen.width;
  scene7Image.height = app.screen.height;

  const timer = addTimer(
    app,
    5,
    async () => {
      const text1 = await lostText(
        true,
        app.canvas.width / 2,
        app.canvas.height / 2
      );
      await new Promise((resolve) => setTimeout(resolve, 3000));
      await fadeOutElement(text1, 1000);
      const text2 = await lostText(
        false,
        app.canvas.width / 2,
        app.canvas.height / 2
      );
      await fadeInElement(text2, 1000);
    },
    true
  );

  // Prepare the startDecision text for the scene
  const startDecision = await createTextContainer({
    text: "I have to make\n my choice, now!",
    x: app.canvas.width / 2,
    y: app.canvas.height / 2,
    anchor: 0.5,
    style: longerTextBloodyStyle,
    removeBg: true,
  });

  const decision1 = await createDecision({
    text: "Hide in the theater",
    x: app.canvas.width / 2,
    y: app.canvas.height / 2,
    action: async () => {
      timer.stop();
      await fadeOutElement(text1, 1000);
      const text2 = await lostText(
        false,
        app.canvas.width / 2,
        app.canvas.height / 2
      );
    },
    style: longerTextBloodyStyle,
  });

  const decision2 = await createDecision({
    text: "Confront him",
    x: app.canvas.width / 2,
    y: app.canvas.height / 2,
    action: async () => {
      timer.stop();
      await fadeOutElement(text1, 1000);
      const text2 = await lostText(
        false,
        app.canvas.width / 2,
        app.canvas.height / 2
      );
    },
    style: longerTextBloodyStyle,
  });

  const decision3 = await createDecision({
    text: "Run through the back door",
    x: app.canvas.width / 2,
    y: app.canvas.height / 2,
    action: async () => {
      timer.stop();
      await fadeOutElement(text1, 1000);
      const text2 = await lostText(
        false,
        app.canvas.width / 2,
        app.canvas.height / 2
      );
    },
    style: longerTextBloodyStyle,
  });

  app.stage.addChild(
    scene7Image,
    startDecision,
    decision1,
    decision2,
    decision3
  );
};

const lostText = (messedUp: boolean, x: number, y: number) => {
  if (messedUp) {
    return createTextContainer({
      text: "You lost your chance to escape.\nYou are now trapped in the theater with him.",
      x: x,
      y: y,
      anchor: 0.5,
      style: longerTextWhiteStyle,
      removeBg: true,
    });
  }
  return createTextContainer({
    text: "I'VE GOT YOU!",
    x: x,
    y: y,
    anchor: 0.5,
    style: longerTextBloodyStyle,
    removeBg: true,
  });
};
