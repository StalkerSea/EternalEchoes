import { Application } from "pixi.js";
import { fadeOut, fadeIn } from "./transitions";
import { initializeScene1 } from "../scenes/1";
import { initializeScene2 } from "../scenes/2";
import { initializeScene3 } from "../scenes/3";
import { initializeScene4 } from "../scenes/4";
import { initializeScene5 } from "../scenes/5";
import { initializeScene6 } from "../scenes/6";
import { initializeScene7 } from "../scenes/7";

export const initializeScene = async (
  app: Application,
  sceneNumber: number,
  option: number = 0
) => {
  window.scene = sceneNumber;
  //console.log("Loading scene: ", window.scene);
  switch (sceneNumber) {
    case 1:
      await initializeScene1(app);
      break;
    case 2:
      await initializeScene2(app);
      break;
    case 3:
      await initializeScene3(app);
      break;
    case 4:
      await initializeScene4(app, option);
      break;
    case 5:
      await initializeScene5(app);
      break;
    case 6:
      await initializeScene6(app);
      break;
    case 7:
      await initializeScene7(app);
      break;
    default:
      console.error(`Scene ${sceneNumber} not found`);
  }
};

export const addButtons = (
  app: Application,
  container: HTMLDivElement,
  currentSceneLimit: number
) => {
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
    console.log("Next button clicked, current scene: ", window.scene);
    // Initialize the next scene based on the current scene
    if (window.scene !== undefined) {
      if (window.scene === currentSceneLimit) {
        console.log("Cannot go further: ", window.scene);
        return;
      }
      // Fade out current scene
      await fadeOut(app, 500); // 500ms duration

      // Clear the stage
      app.stage.removeChildren();

      window.scene++;
      await initializeScene(app, window.scene);

      // Fade in new scene
      await fadeIn(app, 500); // 500ms duration
    } else {
      console.error("Scene number is undefined");
    }
  });

  previousButton.addEventListener("click", async () => {
    console.log("Previous button clicked, current scene: ", window.scene);
    // Initialize the previous scene based on the current scene
    if (window.scene !== undefined) {
      if (window.scene === 1) {
        console.log("Cannot go back further: ", window.scene);
        return;
      }
      // Fade out current scene
      await fadeOut(app, 500); // 500ms duration

      // Clear the stage
      app.stage.removeChildren();

      window.scene--;
      await initializeScene(app, window.scene);

      // Fade in new scene
      await fadeIn(app, 500); // 500ms duration
    } else {
      console.error("Scene number is undefined");
    }
  });
};
