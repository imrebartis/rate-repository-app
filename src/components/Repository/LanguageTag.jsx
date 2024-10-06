import { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import Text from '../Text';
import theme from '../../theme';

const styles = StyleSheet.create({
  languageContainer: {
    backgroundColor: theme.colors.primary,
    padding: 10,
    borderRadius: 4,
    alignSelf: 'flex-start'
  },
  languageText: {
    color: theme.colors.textWhite
  }
});

const LanguageTag = ({ language }) => {
  return (
    <View style={styles.languageContainer}>
      <Text style={styles.languageText}>{language}</Text>
    </View>
  );
};

export default memo(LanguageTag);
