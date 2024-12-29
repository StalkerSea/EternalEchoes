import { Application } from "pixi.js";

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