import { Application } from "pixi.js";
import "./styles.scss";
import { addButtons, initializeScene } from "./helpers/reusableFunctions";
import bgm from "../assets/sounds/Lonely Heart.mp3";

declare global {
  interface Window {
    pixiApp?: Application;
    scene?: number;
    choices: Array<boolean>;
    bgmSound?: HTMLAudioElement;
  }
}

declare const module: {
  hot?: {
    accept(callback?: () => void): void;
    dispose(callback?: () => void): void;
  };
};

// Create a PixiJS application.
const app: Application = new Application();

// Function to initialize the PixiJS application
const initializeApp = async () => {
  // Store the application instance in the global window object
  window.pixiApp = app;

  // Pre-set all the choices to false
  window.choices = new Array(2).fill(false);

  // Initialize the application.
  await app.init({ background: "#000000", width: 1280, height: 720 });

  // Create a container for the canvas and button
  const container = document.createElement("div");
  container.className = "canvas-container";
  document.body.appendChild(container);

  // Then adding the application's canvas to the container.
  container.appendChild(app.canvas);

  // Start the bgm
  const bgmSound = new Audio(bgm);
  bgmSound.play();
  window.bgmSound = bgmSound;

  // Initialize Scene 1
  window.scene = 1;
  await initializeScene(app, window.scene);
  // addButtons(app, container, 7);
};

// Create a button to start the application
const startButton = document.createElement("button");
startButton.innerText = "Start";
startButton.className = "button start-button";
document.body.appendChild(startButton);

startButton.addEventListener("click", async () => {
  // Remove the start button
  document
    .querySelectorAll(".button.start-button")
    .forEach((button) => button.remove());

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
