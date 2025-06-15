import React from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import { BoxProps } from './types';
import { styles } from './styles';

export const Box: React.FC<BoxProps> = ({ translateX, translateY }) => {
  const panGesture = Gesture.Pan()
    .onUpdate(e => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd(() => {});

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.box, animatedStyle]} />
    </GestureDetector>
  );
};
