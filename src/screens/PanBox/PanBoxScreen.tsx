import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box } from './components/Box/Box';

export const PanBoxScreen: React.FC = () => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Text style={styles.title}>Gesture: Panning</Text>
      <View style={styles.centerContainer}>
        <Box translateX={translateX} translateY={translateY} />
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
    marginBottom: 24,
    color: '#222',
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PanBoxScreen;
