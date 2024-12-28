import { Application, Assets, Sprite, Text } from 'pixi.js';
import scene2Image from '../../assets/scenes/2.png';
import { createOptionWithText } from '../reusableAssets';

export const initializeScene2 = async (app: Application) => {
    // Load the scene 2 texture.
    const scene2Texture = await Assets.load(scene2Image);
    
    // Create a new Sprite from an image path.
    const scene2: Sprite = new Sprite(scene2Texture);

    // Scale the sprite.
    //scene2.scale.set(0.75);

    // Add to stage.
    app.stage.addChild(scene2);

    // Center the sprite's anchor point.
    //scene2.anchor.set(1, 0.5);

    // Move the sprite to the center of the screen.
    //scene2.x = app.screen.width / 2;
    //scene2.y = app.screen.height / 2;

    // Add an animation loop callback to the application's ticker.
    /*app.ticker.add((ticker) => {
        scene2.rotation += 0.1 * ticker.deltaTime;
    });*/

    createOptionWithText({ stage: app.stage, text: 'Investigar', x: 200, y: 60 });
};