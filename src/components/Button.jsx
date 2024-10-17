import { memo } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginTop: 10,
    alignItems: 'center'
  }
});

const Button = ({ onPress, title, backgroundColor = theme.colors.primary }) => {
  return (
    <Pressable style={[styles.button, { backgroundColor }]}
      onPress={onPress}>
      <Text color='textWhite'
        fontWeight='bold'>
        {title}
      </Text>
    </Pressable>
  );
};

export default memo(Button);
