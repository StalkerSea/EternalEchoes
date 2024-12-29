import { Application, Assets, Sprite, Text, TextStyle } from "pixi.js";
import { bloodyStyle } from "../helpers/reusableAssets";
import { fadeInImage } from "../helpers/transitions";
import slash from "../../assets/sounds/slash.mp3";
import scene2 from "../../assets/scenes/2.png";

export const initializeScene2 = async (app: Application) => {
  console.log("Initializing Scene 2");
  console.log("scene: ", window.scene);
  const slashSound = new Audio(slash);
  slashSound.play();

  await Assets.load(scene2);
  const scene2Image = Sprite.from(scene2);
  scene2Image.width = app.screen.width;
  scene2Image.height = app.screen.height;
  app.stage.addChild(scene2Image);
  fadeInImage(scene2Image, 500);

  // Create glitch overlay using the same scene
  const glitchOverlay = Sprite.from(scene2);
  glitchOverlay.width = app.screen.width;
  glitchOverlay.height = app.screen.height;
  glitchOverlay.visible = false;
  glitchOverlay.tint = 0xff0000; // Red tint for variation
  app.stage.addChild(glitchOverlay);

  let glitchCount = 0;
  const glitchInterval = setInterval(() => {
    glitchCount++;

    scene2Image.tint = 0x00ff00;
    scene2Image.alpha = 0.75 + glitchCount * 0.01; // Gradually increase opacity
    scene2Image.position.x += Math.random() * 10 - 5;
    scene2Image.position.y += Math.random() * 10 - 5;

    if (glitchCount % 2 === 0) {
      glitchOverlay.visible = true;
      glitchOverlay.position.x = Math.random() * 20 - 10;
      glitchOverlay.position.y = Math.random() * 20 - 10;
    }

    setTimeout(() => {
      scene2Image.tint = 0xffffff;
      scene2Image.position.x = 0;
      scene2Image.position.y = 0;
      glitchOverlay.visible = false;
    }, 50);
  }, 200);

  // After glitch effect ends, ensure scene2 is displayed properly
  setTimeout(() => {
    clearInterval(glitchInterval);
    scene2Image.tint = 0xffffff;
    scene2Image.alpha = 1;
    scene2Image.position.set(0);
    app.stage.removeChild(glitchOverlay);
  }, 2000);
  window.scene = 2;
};
