import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import { styles } from './styles';
import { TemplateModalProps } from './types';

const TemplateModal: React.FC<TemplateModalProps> = ({
  visible,
  onClose,
  onSelectTemplate,
  templates,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, styles.templateModalContent]}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Choose Template</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
          <ScrollView style={styles.templateScrollView}>
            {templates.map(template => (
              <TouchableOpacity
                key={template.id}
                style={styles.templateItem}
                onPress={() => onSelectTemplate(template)}
              >
                <Image
                  source={{ uri: template.image }}
                  style={styles.templateImage}
                />
                <Text style={styles.templateName}>{template.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default TemplateModal;
