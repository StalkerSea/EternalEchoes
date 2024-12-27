var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Application, Assets, Sprite } from 'pixi.js';
// Asynchronous IIFE
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Create a PixiJS application.
    const app = new Application();
    // Initialize the application.
    yield app.init({ background: '#1099bb', resizeTo: window });
    // Then adding the application's canvas to the DOM body.
    document.body.appendChild(app.canvas);
    // Load the bunny texture.
    const texture = yield Assets.load('https://pixijs.com/assets/bunny.png');
    // Create a new Sprite from an image path.
    const bunny = new Sprite(texture);
    // Add to stage.
    app.stage.addChild(bunny);
    // Center the sprite's anchor point.
    bunny.anchor.set(0.5);
    // Move the sprite to the center of the screen.
    bunny.x = app.screen.width / 2;
    bunny.y = app.screen.height / 2;
    // Add an animation loop callback to the application's ticker.
    app.ticker.add((ticker) => {
        /**
         * Just for fun, let's rotate mr rabbit a little.
         * Time is a Ticker object which holds time related data.
         * Here we use deltaTime, which is the time elapsed between the frame callbacks
         * to create frame-independent transformation. Keeping the speed consistent.
         */
        bunny.rotation += 0.1 * ticker.deltaMS;
    });
}))();
