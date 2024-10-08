import { View, TextInput } from 'react-native';
import Text from './Text';
import formStyles from '../utils/formStyles';
import theme from '../theme';

const FormInput = ({
  field,
  form,
  placeholder,
  multiline = false,
  secureTextEntry = false,
  inputMode,
  onChangeText,
  onKeyPress,
  ariaLabel,
  ...props
}) => {
  const hasError = form.touched[field] && form.errors[field];
  const inputStyle = multiline ? formStyles.multilineInput : formStyles.input;

  return (
    <View style={formStyles.inputContainer}>
      <TextInput
        style={[inputStyle, hasError && formStyles.errorInput]}
        onChangeText={onChangeText || form.handleChange(field)}
        onBlur={form.handleBlur(field)}
        value={form.values[field]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.secondary}
        multiline={multiline}
        secureTextEntry={secureTextEntry}
        inputMode={inputMode}
        onKeyPress={onKeyPress}
        aria-label={ariaLabel || placeholder}
        {...props}
      />
      {hasError && <Text color='tertiary'>{form.errors[field]}</Text>}
    </View>
  );
};

export default FormInput;
