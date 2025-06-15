import React, { useCallback, useRef } from 'react';
import { View, Text, Image } from 'react-native';
import { styles } from './styles';
import { CanvasElement, CanvasProps } from './types';

export const Canvas: React.FC<CanvasProps> = ({
  elements,
  selectedId,
  onElementSelect,
  onElementDoubleTap,
  createPanResponder,
  onPinchGesture,
}) => {
  const lastTapRef = useRef<number>(0);

  const handleTap = useCallback(
    (id: string) => {
      const now = Date.now();
      const DOUBLE_TAP_DELAY = 300;

      if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
        onElementDoubleTap(id);
        lastTapRef.current = 0;
      } else {
        onElementSelect(id);
        lastTapRef.current = now;
      }
    },
    [onElementDoubleTap, onElementSelect],
  );

  const renderElement = useCallback(
    (el: CanvasElement) => {
      const isSelected = el.id === selectedId;
      const panResponder = createPanResponder(el);

      const elementStyle = {
        ...styles.element,
        left: el.x,
        top: el.y,
        width: el.type === 'text' ? undefined : el.width || 200,
        height: el.type === 'text' ? undefined : el.height || 200,
        transform: [{ scale: el.scale || 1 }],
        borderWidth: isSelected ? 2 : 0,
        borderColor: '#007AFF',
      };

      if (el.type === 'text') {
        return (
          <View
            key={el.id}
            style={[elementStyle, { backgroundColor: 'transparent' }]}
            {...panResponder.panHandlers}
            onTouchEnd={() => handleTap(el.id)}
          >
            <Text
              style={[
                styles.textElement,
                {
                  color: el.color,
                  fontSize: el.fontSize,
                  fontFamily: el.fontFamily,
                },
              ]}
              numberOfLines={0}
            >
              {el.text}
            </Text>
          </View>
        );
      }

      return (
        <View
          key={el.id}
          style={elementStyle}
          {...panResponder.panHandlers}
          onTouchEnd={() => handleTap(el.id)}
          onTouchMove={event => {
            if (event.nativeEvent.touches.length === 2) {
              const touch1 = event.nativeEvent.touches[0];
              const touch2 = event.nativeEvent.touches[1];
              const distance = Math.hypot(
                touch2.pageX - touch1.pageX,
                touch2.pageY - touch1.pageY,
              );
              const scale = distance / 200;
              onPinchGesture(el.id, scale);
            }
          }}
        >
          <Image
            source={{ uri: el.uri || el.image }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="contain"
          />
        </View>
      );
    },
    [selectedId, handleTap, createPanResponder, onPinchGesture],
  );

  return <View style={styles.canvas}>{elements.map(renderElement)}</View>;
};
