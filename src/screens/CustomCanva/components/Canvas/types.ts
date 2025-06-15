import { PanResponderInstance } from 'react-native';

export interface CanvasElement {
  id: string;
  type: 'text' | 'image';
  text?: string;
  image?: string;
  uri?: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  scale?: number;
  color?: string;
  fontSize?: number;
  fontFamily?: string;
}

export interface CanvasProps {
  elements: CanvasElement[];
  selectedId: string | null;
  onElementSelect: (id: string | null) => void;
  onElementDoubleTap: (id: string) => void;
  createPanResponder: (el: CanvasElement) => PanResponderInstance;
  onPinchGesture: (id: string, scale: number) => void;
}
