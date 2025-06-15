import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PADDING = 16;
export const BUTTON_WIDTH = SCREEN_WIDTH - PADDING * 4;

export const styles = StyleSheet.create({
  container: {
    padding: PADDING,
    backgroundColor: '#F8FAFC',
    marginHorizontal: PADDING,
    marginBottom: PADDING,
    borderRadius: 12,
  },
  button: {
    marginVertical: 4,
  },
  buttonContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
