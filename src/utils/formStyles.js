import { StyleSheet } from 'react-native';
import theme from '../theme';

const formStyles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1
  },
  container: {
    padding: 16,
    backgroundColor: theme.colors.backgroundWhite
  },
  inputContainer: {
    marginBottom: 16
  },
  input: {
    height: 40,
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8
  },
  multilineInput: {
    height: 80,
    borderColor: theme.colors.secondary,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingTop: 12,
    textAlignVertical: 'top'
  },
  errorInput: {
    borderColor: theme.colors.tertiary
  },
  buttonContainer: {
    marginTop: 16
  }
});

export default formStyles;
