import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BOX_SIZE = SCREEN_WIDTH * 0.6;

export const styles = StyleSheet.create({
  box: {
    width: BOX_SIZE,
    height: BOX_SIZE,
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
});
