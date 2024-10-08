import { View, StyleSheet } from 'react-native';
import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: theme.colors.backgroundSuccess
  }
});

const Notify = ({ message }) => {
  if (!message) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text color='textWhite'>{message}</Text>
    </View>
  );
};

export default Notify;
