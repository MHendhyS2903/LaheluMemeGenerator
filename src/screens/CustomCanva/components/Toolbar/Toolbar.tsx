import React, { useCallback } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { styles, BUTTON_WIDTH } from './styles';
import { ToolbarProps } from './types';

const Toolbar: React.FC<ToolbarProps> = ({
  onAddText,
  onAddImage,
  onTemplate,
}) => {
  const renderButton = useCallback(
    (label: string, onPress: () => void, color: string = '#6366F1') => (
      <TouchableOpacity
        style={[styles.button, { width: BUTTON_WIDTH }]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={[styles.buttonContent, { backgroundColor: color }]}>
          <Text style={styles.buttonText} numberOfLines={1}>
            {label}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      {renderButton('Template', onTemplate, '#8B5CF6')}
      {renderButton('Tambah Teks', onAddText, '#10B981')}
      {renderButton('Tambah Gambar', onAddImage, '#3B82F6')}
    </View>
  );
};

export default Toolbar;
