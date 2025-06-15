import React from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { styles } from './styles';
import { EditModalProps } from './types';

const EditModal: React.FC<EditModalProps> = ({
  visible,
  onClose,
  onDelete,
  onDuplicate,
  inputText,
  onTextChange,
  onColorChange,
  onFontSizeChange,
  onFontFamilyChange,
  colors,
  fontSizes,
  fontFamilies,
  selectedFontFamily,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Edit Text</Text>
          <View style={styles.modalHeaderButtons}>
            <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.duplicateButton}
              onPress={onDuplicate}
            >
              <Text style={styles.duplicateButtonText}>Duplicate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.modalScrollView}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={onTextChange}
            placeholder="Enter text..."
          />

          <View style={styles.textOptionsContainer}>
            <Text style={styles.optionTitle}>Color</Text>
            <View style={styles.colorOptions}>
              {colors.map(color => (
                <TouchableOpacity
                  key={color}
                  style={[styles.colorButton, { backgroundColor: color }]}
                  onPress={() => onColorChange(color)}
                />
              ))}
            </View>

            <Text style={styles.optionTitle}>Font Size</Text>
            <View style={styles.fontSizeOptions}>
              {fontSizes.map(size => (
                <TouchableOpacity
                  key={size}
                  style={styles.fontSizeButton}
                  onPress={() => onFontSizeChange(size)}
                >
                  <Text style={[styles.fontSizeText, { fontSize: size }]}>
                    {size}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.optionTitle}>Font Family</Text>
            <View style={styles.fontFamilyOptions}>
              {fontFamilies.map(font => (
                <TouchableOpacity
                  key={font.value}
                  style={[
                    styles.fontFamilyButton,
                    selectedFontFamily === font.value &&
                      styles.selectedFontButton,
                  ]}
                  onPress={() => onFontFamilyChange(font.value)}
                >
                  <Text
                    style={[styles.fontFamilyText, { fontFamily: font.value }]}
                  >
                    {font.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default EditModal;
