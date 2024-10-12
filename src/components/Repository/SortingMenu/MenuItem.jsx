import { memo } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Menu } from 'react-native-paper';
import Text from '../../Text';

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  menuItemText: {
    flex: 1
  },
  checkmark: {
    marginLeft: 8
  }
});

const MenuItem = memo(({ title, onPress, selected, loading }) => (
  <Menu.Item
    onPress={onPress}
    disabled={loading}
    title={
      <View style={styles.menuItem}>
        <View style={styles.menuItemText}>
          {loading ? <ActivityIndicator size={16} /> : <Text>{title}</Text>}
        </View>
        {selected && <Text style={styles.checkmark}>✓</Text>}
      </View>
    }
  />
));

MenuItem.displayName = 'MenuItem';

export default MenuItem;
