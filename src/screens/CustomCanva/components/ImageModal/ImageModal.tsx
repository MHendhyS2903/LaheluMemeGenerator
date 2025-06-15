import React from 'react';
import { View, Text, Modal, TouchableOpacity, Image } from 'react-native';
import { styles } from './styles';
import { ImageModalProps } from './types';

const ImageModal: React.FC<ImageModalProps> = ({
  visible,
  onClose,
  onDelete,
  onDuplicate,
  imageUri,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Edit Gambar</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Tutup</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.imageContainer}>
            {imageUri && (
              <Image
                source={{ uri: imageUri }}
                style={styles.image}
                resizeMode="contain"
              />
            )}
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.duplicateButton]}
              onPress={onDuplicate}
            >
              <Text style={styles.buttonText}>Duplikat</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.deleteButton]}
              onPress={onDelete}
            >
              <Text style={styles.buttonText}>Hapus</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ImageModal;
