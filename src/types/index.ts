export interface MemeTemplate {
  id: string;
  name: string;
  url: string;
}

export interface TextElement {
  id: string;
  text: string;
  position: {
    x: number;
    y: number;
  };
  scale: number;
  rotation: number;
  color: string;
  fontSize: number;
  fontFamily: string;
}

export interface ImageElement {
  id: string;
  uri: string;
  position: {
    x: number;
    y: number;
  };
  scale: number;
  rotation: number;
  opacity: number;
}

export interface MemeCanvas {
  template: MemeTemplate;
  textElements: TextElement[];
  imageElements: ImageElement[];
}
