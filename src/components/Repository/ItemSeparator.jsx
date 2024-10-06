import { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundSecondary
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export default memo(ItemSeparator);
