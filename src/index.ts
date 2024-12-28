import { Application } from 'pixi.js';
import './styles.scss';
import { initializeScene1 } from './scenes/1';
import { initializeScene2 } from './scenes/2';

const currentSceneLimit = 2;
// Check if the application is already initialized
declare global {
    interface Window {
        pixiApp?: Application;
        scene?: number;
    }
}

export const initializeScene = async (app: Application, sceneNumber: number) => {
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
    await app.init({ background: '#1099bb', width: 1280, height: 720 });

    // Create a container for the canvas and button
    const container = document.createElement('div');
    container.className = 'canvas-container';
    document.body.appendChild(container);

    // Then adding the application's canvas to the container.
    container.appendChild(app.canvas);

    // Initialize Scene 1
    await initializeScene(app, 1);
    window.scene = 1;

    // Create a button to transition to the next scene
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.className = 'button next-button';
    container.appendChild(nextButton);

    // Create a button to transition to the previous scene
    const previousButton = document.createElement('button');
    previousButton.innerText = 'Previous';
    previousButton.className = 'button previous-button';
    container.appendChild(previousButton);

    const fadeOut = (app: Application, duration: number) => {
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

    const fadeIn = (app: Application, duration: number) => {
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

    nextButton.addEventListener('click', async () => {
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
            console.error('Scene number is undefined');
        }

    });

    previousButton.addEventListener('click', async () => {
        // Initialize the previous scene based on the current scene
        if (window.scene !== undefined) {
            if (window.scene === 1) {
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
            console.error('Scene number is undefined');
        }

    });
};

// Check if the application is already initialized
if (!window.pixiApp) {
    initializeApp();
}