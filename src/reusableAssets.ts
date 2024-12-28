import { TextStyle, Text, Container, Assets, Sprite } from 'pixi.js';
import optionImage from '../assets/elements/option.png';

export const decisionStyle = new TextStyle({
    fontFamily: 'Jolly Lodger',
    fontSize: 36,
    fill: 0x000000,
    align: 'center'
});

interface OptionConfig {
    stage: Container;
    text: string;
    x: number;
    y: number;
    action?: () => void;
}

export const createOptionWithText = async ({ stage, text, x, y, action }: OptionConfig): Promise<void> => {
    // Load the option texture
    const optionTexture = await Assets.load(optionImage);

    // Create a new Sprite from an image path
    const option: Sprite = new Sprite(optionTexture);

    // Create a Text object using the decision style
    const basicText: Text = new Text({text: text, style: decisionStyle});

    // Position the Sprite and Text
    option.scale.set(0.75);
    option.x = x;
    option.y = y;
    basicText.x = x + 50; // Adjust as needed
    basicText.y = y + 40; // Adjust as needed

    // Create a Container to group the Sprite and Text
    const optionContainer: Container = new Container();
    optionContainer.addChild(option);
    optionContainer.addChild(basicText);

    // Make the Container interactive and clickable
    optionContainer.interactive = true;
    optionContainer.cursor = 'pointer';
    optionContainer.on('pointerdown', () => {
        if (action) {
            action();
        }
        // Add your click handling logic here
    });

    stage.addChild(optionContainer);
    //return optionContainer;
};