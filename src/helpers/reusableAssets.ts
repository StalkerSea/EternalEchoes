import {
  TextStyle,
  Text,
  Container,
  Assets,
  Sprite,
  Application,
} from "pixi.js";
import optionImage from "../../assets/elements/option.png";
import { initializeScene } from "..";
import { fadeOut, fadeIn } from "./transitions";
import bTextImage from "../../assets/elements/normalText.png";

export const decisionStyle = new TextStyle({
  fontFamily: "Jolly Lodger",
  fontSize: 36,
  fill: 0x000000,
  align: "center",
});

interface OptionConfig {
  stage: Container;
  text: string;
  x: number;
  y: number;
  action?: () => void;
}

export const createOptionWithText = async ({
  stage,
  text,
  x,
  y,
  action,
}: OptionConfig): Promise<void> => {
  // Load the option texture
  const optionTexture = await Assets.load(optionImage);

  // Create a new Sprite from an image path
  const option: Sprite = new Sprite(optionTexture);

  // Create a Text object using the decision style
  const basicText: Text = new Text({ text: text, style: decisionStyle });

  // Position the Sprite and Text
  option.scale.set(0.75);
  option.x = x;
  option.y = y;
  basicText.x = x + 50;
  basicText.y = y + 40;

  // Create a Container to group the Sprite and Text
  const optionContainer: Container = new Container();
  optionContainer.addChild(option);
  optionContainer.addChild(basicText);

  // Make the Container interactive and clickable
  optionContainer.interactive = true;
  optionContainer.cursor = "pointer";
  optionContainer.on("pointerdown", () => {
    if (action) {
      action();
    }
    // Add your click handling logic here
  });

  stage.addChild(optionContainer);
  //return optionContainer;
};
export const normalStyleWhite = new TextStyle({
  fontFamily: "Jolly Lodger",
  fontSize: 36,
  fill: 0x000000,
  align: "center",
});

export const normalStyleBlack = new TextStyle({
  fontFamily: "Jolly Lodger",
  fontSize: 36,
  fill: 0xffffff,
  align: "center",
});

const textShadow = {
  //alpha: number;
  angle: Math.PI / 6,
  blur: 4,
  color: "#000000",
  distance: 6,
};

export const bloodyStyle = new TextStyle({
  fontFamily: "Jolly Lodger",
  fontSize: 36,
  fill: 0xff0000, // Red color to signify blood and war
  align: "center",
  dropShadow: textShadow,
});

export const createText = async ({
  app,
  text,
  x,
  y,
  style,
  anchor,
}: {
  app: Application;
  text: string;
  x: number;
  y: number;
  style?: TextStyle;
  anchor?: number;
}): Promise<Container> => {
  // Load the bText texture
  const bTextTexture = await Assets.load(bTextImage);

  // Create a new Sprite from an image path
  const bText: Sprite = new Sprite(bTextTexture);

  // Create a Text object using the decision style
  const basicText: Text = new Text({
    text: text,
    style: style || decisionStyle,
  });

  // Position the Sprite and Text
  bText.scale.set(0.75);
  if (anchor) {
    bText.anchor.set(anchor);
    basicText.anchor.set(anchor);
  }
  bText.x = x;
  bText.y = y;
  basicText.x = x;
  basicText.y = y;

  // Create a Container to group the Sprite and Text
  const bTextContainer: Container = new Container();
  bTextContainer.addChild(bText);
  bTextContainer.addChild(basicText);
  return bTextContainer;
};
