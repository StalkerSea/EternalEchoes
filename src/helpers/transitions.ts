import { Application, Container, Sprite } from "pixi.js";

export const fadeOut = (app: Application, duration: number) => {
  return new Promise<void>((resolve) => {
    const start = performance.now();
    const fade = () => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      app.stage.alpha = 1 - progress;
      if (progress < 1) {
        requestAnimationFrame(fade);
      } else {
        resolve();
      }
    };
    fade();
  });
};

export const fadeIn = (app: Application, duration: number) => {
  return new Promise<void>((resolve) => {
    const start = performance.now();
    const fade = () => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      app.stage.alpha = progress;
      if (progress < 1) {
        requestAnimationFrame(fade);
      } else {
        resolve();
      }
    };
    fade();
  });
};

export const fadeInImage = (image: any, duration: number) => {
  return new Promise<void>((resolve) => {
    const start = performance.now();
    const fade = () => {
      const elapsed = performance.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      image.alpha = progress;
      if (progress < 1) {
        requestAnimationFrame(fade);
      } else {
        resolve();
      }
    };
    fade();
  });
};

export const glitch = (app: Application, scene: any, sceneImage: Sprite) => {
  // Create glitch overlay using the same scene
  const glitchOverlay = Sprite.from(scene);
  glitchOverlay.width = app.screen.width;
  glitchOverlay.height = app.screen.height;
  glitchOverlay.visible = false;
  glitchOverlay.tint = 0xff0000; // Red tint for variation
  app.stage.addChild(glitchOverlay);

  let glitchCount = 0;
  const glitchInterval = setInterval(() => {
    glitchCount++;

    sceneImage.tint = 0x00ff00;
    sceneImage.alpha = 0.75 + glitchCount * 0.01; // Gradually increase opacity
    sceneImage.position.x += Math.random() * 10 - 5;
    sceneImage.position.y += Math.random() * 10 - 5;

    if (glitchCount % 2 === 0) {
      glitchOverlay.visible = true;
      glitchOverlay.position.x = Math.random() * 20 - 10;
      glitchOverlay.position.y = Math.random() * 20 - 10;
    }

    setTimeout(() => {
      sceneImage.tint = 0xffffff;
      sceneImage.position.x = 0;
      sceneImage.position.y = 0;
      glitchOverlay.visible = false;
    }, 50);
  }, 200);

  // After glitch effect ends, ensure scene2 is displayed properly
  setTimeout(() => {
    clearInterval(glitchInterval);
    sceneImage.tint = 0xffffff;
    sceneImage.alpha = 1;
    sceneImage.position.set(0);
    app.stage.removeChild(glitchOverlay);
  }, 2000);
};

export const fadeOutElement = async (
  elements: Container | { [key: string]: Container },
  duration: number = 1000
) => {
  const fadeSteps = 20;
  const alphaStep = 1 / fadeSteps;
  const elementArray = Array.isArray(elements) 
    ? elements 
    : elements instanceof Container 
      ? [elements] 
      : Object.values(elements);

  for (let i = fadeSteps; i >= 0; i--) {
    elementArray.forEach((element) => (element.alpha = i * alphaStep));
    await new Promise((resolve) => setTimeout(resolve, duration / fadeSteps));
  }
  elementArray.forEach((element) => element.destroy());
};

export const fadeInElement = async (
  elements: Container | Container[],
  duration: number = 1000
) => {
  const fadeSteps = 20;
  const alphaStep = 1 / fadeSteps;
  const elementArray = Array.isArray(elements) ? elements : [elements];
  
  elementArray.forEach(element => element.alpha = 0);

  for (let i = 0; i <= fadeSteps; i++) {
    elementArray.forEach(element => element.alpha = i * alphaStep);
    await new Promise((resolve) => setTimeout(resolve, duration / fadeSteps));
  }
};