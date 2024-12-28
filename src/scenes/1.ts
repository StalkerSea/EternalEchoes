// filepath: /Users/luckyazumi/Projects/Games/EternalEchoes/src/scene1.ts
import { Application, Text, Assets, Sprite, Container, TextStyle } from 'pixi.js';
import { createOptionWithText } from '../reusableAssets';

export const initializeScene1 = async (app: Application) => {
    await createOptionWithText({ stage: app.stage, text: 'Investigar', x: 200, y: 60 });
};