import { Application } from "pixi.js";
import { initializeScene } from "..";
import { fadeOut, fadeIn } from "./transitions";

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
