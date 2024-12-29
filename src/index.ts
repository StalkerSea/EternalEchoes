import { Application } from "pixi.js";
import "./styles.scss";
import { initializeScene1 } from "./scenes/1";
import { initializeScene2 } from "./scenes/2";

declare global {
  interface Window {
    pixiApp?: Application;
    scene?: number;
  }
}

declare const module: {
  hot?: {
    accept(callback?: () => void): void;
    dispose(callback?: () => void): void;
  };
};

export const initializeScene = async (
  app: Application,
  sceneNumber: number
) => {
  switch (sceneNumber) {
    case 1:
      await initializeScene1(app);
      break;
    case 2:
      await initializeScene2(app);
      break;
    default:
      console.error(`Scene ${sceneNumber} not found`);
  }
};

// Create a PixiJS application.
const app: Application = new Application();

// Function to initialize the PixiJS application
const initializeApp = async () => {
  // Store the application instance in the global window object
  window.pixiApp = app;

  // Initialize the application.
  await app.init({ background: "#000000", width: 1280, height: 720 });

  // Create a container for the canvas and button
  const container = document.createElement("div");
  container.className = "canvas-container";
  document.body.appendChild(container);

  // Then adding the application's canvas to the container.
  container.appendChild(app.canvas);

  // Initialize Scene 1
  await initializeScene(app, 1);
  window.scene = 1;

  // Create a button to transition to the next scene
  const nextButton = document.createElement("button");
  nextButton.innerText = "Next";
  nextButton.className = "button next-button";
  container.appendChild(nextButton);

  // Create a button to transition to the previous scene
  const previousButton = document.createElement("button");
  previousButton.innerText = "Previous";
  previousButton.className = "button previous-button";
  container.appendChild(previousButton);

  nextButton.addEventListener("click", async () => {
    // Initialize next scene
    let nextSceneNumber = (window.scene || 1) + 1;
    await initializeScene(app, nextSceneNumber);
    window.scene = (window.scene || 1) + 1;
  });

  previousButton.addEventListener("click", async () => {
    // Initialize Scene 1
    let nextSceneNumber = (window.scene || 2) - 1;
    await initializeScene(app, nextSceneNumber);
    window.scene = (window.scene || 2) - 1;
  });
};

// Create a button to start the application
const startButton = document.createElement("button");
startButton.innerText = "Start";
startButton.className = "button start-button";
document.body.appendChild(startButton);

startButton.addEventListener("click", async () => {
  // Remove the start button
  startButton.remove();

  // Initialize the application
  await initializeApp();
});

// Handle Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.dispose(() => {
    if (window.pixiApp) {
      window.pixiApp.destroy(true, { children: true, texture: true });
      delete window.pixiApp;
    }
  });

  module.hot.accept(() => {
    if (!window.pixiApp) {
      initializeApp();
    }
  });
}
