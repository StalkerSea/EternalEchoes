import {
  TextStyle,
  Text,
  Container,
  Assets,
  Sprite,
  Application,
  ContainerChild,
} from "pixi.js";
import decisionImage from "../../assets/elements/decision.png";
import bTextImage from "../../assets/elements/text.png";

export const decisionStyleBlack = new TextStyle({
  fontFamily: "Jolly Lodger",
  fontSize: 36,
  fill: 0x000000,
  align: "center",
  wordWrap: true,
  wordWrapWidth: 250,
});

export const decisionStyleWhite = new TextStyle({
  fontFamily: "Jolly Lodger",
  fontSize: 36,
  fill: 0xffffff,
  align: "center",
});

interface DecisionConfig {
  text: string;
  x: number;
  y: number;
  action?: () => void;
  style?: TextStyle;
}

export const normalStyleWhite = new TextStyle({
  fontFamily: "Jolly Lodger",
  fontSize: 36,
  fill: 0xffffff,
  align: "center",
  dropShadow: true,
});

export const normalStyleBlack = new TextStyle({
  fontFamily: "Jolly Lodger",
  fontSize: 36,
  fill: 0x000000,
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

export const smallDecisionStyle = new TextStyle({
  fontFamily: "Jolly Lodger",
  fontSize: 28,
  fill: "black",
  align: "center",
  wordWrap: true,
  wordWrapWidth: 200,
});

export const smallTextStyle = new TextStyle({
  fontFamily: "Jolly Lodger",
  fontSize: 32,
  fill: "white",
  dropShadow: textShadow,
  align: "center",
  wordWrap: true,
  wordWrapWidth: 350,
});

export const longTextStyle = new TextStyle({
  fontFamily: "Jolly Lodger",
  fontSize: 32,
  fill: "white",
  dropShadow: textShadow,
  align: "center",
  wordWrap: true,
  wordWrapWidth: 500,
});

export const longerTextBloodyStyle = new TextStyle({
  fontFamily: "Jolly Lodger",
  fontSize: 36,
  fill: "red",
  dropShadow: textShadow,
  align: "center",
  wordWrap: true,
  wordWrapWidth: 750,
});

export const longerTextWhiteStyle = new TextStyle({
  fontFamily: "Jolly Lodger",
  fontSize: 36,
  fill: "white",
  dropShadow: textShadow,
  align: "center",
  wordWrap: true,
  wordWrapWidth: 750,
});

export const longerTextBlackStyle = new TextStyle({
  fontFamily: "Jolly Lodger",
  fontSize: 36,
  fill: "black",
  dropShadow: textShadow,
  align: "center",
  wordWrap: true,
  wordWrapWidth: 750,
});

export const createTextContainer = async ({
  text,
  x,
  y,
  style,
  anchor,
  removeBg = false,
}: {
  text: string;
  x: number;
  y: number;
  style?: TextStyle;
  anchor?: number;
  removeBg?: boolean;
}): Promise<Container> => {
  // Create a Container to group the Sprite and Text
  const bTextContainer: Container = new Container();

  // Create a Text object using the decision style
  const basicText: Text = new Text({
    text: text,
    style: style || normalStyleWhite,
  });
  basicText.x = x;
  basicText.y = y;

  if (!removeBg) {
    // Load the bText texture
    const bTextTexture = await Assets.load(bTextImage);
    // Create a new Sprite from an image path
    const bText: Sprite = new Sprite(bTextTexture);
    // Position the Sprite and Text
    bText.scale.set(0.75);

    // Calculate the width based on text length
    const minWidth = 1; // minimum scale
    const textWidth = basicText.width;
    const widthScale = Math.max(
      minWidth,
      (textWidth / (bText.width / 0.75)) * 0.75
    );

    bText.scale.x = widthScale;

    bText.x = x;
    bText.y = y;
    if (anchor) {
      bText.anchor.set(anchor);
      bTextContainer.addChild(bText);
    }
  }
  // Add the Text to the Container
  bTextContainer.addChild(basicText);
  if (anchor) {
    basicText.anchor.set(anchor);
  }

  return bTextContainer;
};

export const createText = ({
  text,
  x,
  y,
  style,
  anchor,
}: {
  text: string;
  x: number;
  y: number;
  style?: TextStyle;
  anchor?: number;
}): Text => {
  // Create a Text object using the decision style
  const basicText: Text = new Text({
    text: text,
    style: style || normalStyleWhite,
  });
  basicText.x = x;
  basicText.y = y;

  if (anchor) {
    basicText.anchor.set(anchor);
  }

  return basicText;
};

export const createDecision = async ({
  text,
  x,
  y,
  action,
  style,
}: DecisionConfig): Promise<Container> => {
  // Load the decision texture
  const decisionTexture = await Assets.load(decisionImage);

  // Create a new Sprite from an image path
  const decision: Sprite = new Sprite(decisionTexture);

  // Create a Text object using the decision style
  const basicText: Text = new Text({
    text: text,
    style: style || decisionStyleBlack,
  });

  // Position the Sprite and Text
  decision.scale.set(0.75);

  // Calculate the width based on text length (adjust multiplier as needed)
  const minWidth = 1; // minimum scale
  const textWidth = basicText.width;
  const widthScale = Math.max(
    minWidth,
    (textWidth / (decision.width / 0.75)) * 0.75
  );

  decision.scale.x = widthScale;
  decision.x = x;
  decision.y = y;
  basicText.x = x + decision.width / 2;

  // Adjust Y position based on number of lines
  const lineCount = text.split("\n").length;
  const yOffset = lineCount > 1 ? 20 : 40; // Decrease Y offset for multiple lines
  basicText.y = y + yOffset;

  basicText.anchor.x = 0.5; // Center the text horizontally

  // Create a Container to group the Sprite and Text
  const decisionContainer: Container = new Container();
  decisionContainer.addChild(decision);
  decisionContainer.addChild(basicText);

  // Make the Container interactive and clickable
  decisionContainer.interactive = true;
  decisionContainer.cursor = "pointer";
  decisionContainer.on("pointerdown", () => {
    if (action) {
      action();
    }
  });

  return decisionContainer;
};
