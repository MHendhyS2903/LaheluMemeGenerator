export interface EditModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  inputText: string;
  onTextChange: (text: string) => void;
  onColorChange: (color: string) => void;
  onFontSizeChange: (size: number) => void;
  onFontFamilyChange: (fontFamily: string) => void;
  colors: string[];
  fontSizes: number[];
  fontFamilies: { name: string; value: string }[];
  selectedFontFamily?: string;
}
