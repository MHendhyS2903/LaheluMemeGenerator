export type Template = {
  id: string;
  name: string;
  image: string;
  textPositions: {
    type: 'text';
    id: string;
    text: string;
    x: number;
    y: number;
    color: string;
    fontSize: number;
    fontFamily: string;
  }[];
};

export interface TemplateModalProps {
  visible: boolean;
  onClose: () => void;
  templates: Template[];
  onSelectTemplate: (template: Template) => void;
}
