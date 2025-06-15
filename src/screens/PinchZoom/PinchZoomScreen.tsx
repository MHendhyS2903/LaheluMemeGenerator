import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from './components/Box/Box';

export const PinchZoomScreen: React.FC = () => {
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const savedTranslateX = useSharedValue(0);
  const savedTranslateY = useSharedValue(0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Gesture: Pinch to Zoom</Text>
      <Text style={styles.info}>
        transformX: {Math.round(translateX.value)}
      </Text>
      <Text style={styles.info}>
        transformY: {Math.round(translateY.value)}
      </Text>
      <Text style={styles.info}>scale: {scale.value.toFixed(2)}</Text>
      <View style={styles.centerContainer}>
        <Box
          scale={scale}
          savedScale={savedScale}
          translateX={translateX}
          translateY={translateY}
          savedTranslateX={savedTranslateX}
          savedTranslateY={savedTranslateY}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f3f6',
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 8,
    color: '#222',
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PinchZoomScreen;
