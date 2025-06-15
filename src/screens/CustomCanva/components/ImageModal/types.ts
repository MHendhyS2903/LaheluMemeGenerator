export interface ImageModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
  onDuplicate: () => void;
  imageUri?: string;
}
