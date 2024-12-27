import * as PIXI from 'pixi.js';

// Create a PixiJS Application with the new type signature
const app = new PIXI.Application<PIXI.Renderer<HTMLCanvasElement>>({
    width: 800, // Width of the canvas
    height: 600, // Height of the canvas
    backgroundColor: 0x1099bb, // Background color
});

// Add the canvas to the DOM
document.body.appendChild(app.view);

// Create a sprite using the updated texture loading method
const sprite = new PIXI.Sprite(PIXI.Texture.from('assets/character.png'));

// Set the position of the sprite to the center of the canvas
sprite.x = app.renderer.width / 2;
sprite.y = app.renderer.height / 2;

// Set the anchor point to the center of the sprite
sprite.anchor.set(0.5);

// Add the sprite to the stage for rendering
app.stage.addChild(sprite);

// Game loop using ticker to update sprite rotation
app.ticker.add(() => {
    sprite.rotation += 0.01; // Rotate the sprite
});
