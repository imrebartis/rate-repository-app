import { memo, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Menu, Portal, Modal } from 'react-native-paper';
import theme from '../../../theme';
import MenuItem from './MenuItem';
import Text from '../../Text';

const styles = StyleSheet.create({
  menu: {
    top: 60,
    left: 0,
    right: 0,
    marginHorizontal: 16
  },
  menuContent: {
    backgroundColor: theme.colors.backgroundWhite,
    marginTop: 0,
    paddingTop: 0,
    borderRadius: 0
  },
  headerText: {
    padding: 10,
    paddingLeft: 16,
    backgroundColor: theme.colors.backgroundWhite,
    color: theme.colors.textPrimary,
    fontWeight: 'bold',
    textAlign: 'center',
    cursor: 'default'
  },
  modalOverlay: {
    backgroundColor: `rgba(${theme.colors.backgroundBlack}, 0.5)`,
    flex: 1
  },
  sortButton: {
    borderRadius: 0,
    backgroundColor: theme.colors.backgroundSecondary,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sortButtonLabel: {
    color: theme.colors.textPrimary
  }
});

const sortingOptions = [
  { title: 'Latest repositories', value: 'LATEST' },
  { title: 'Highest rated repositories', value: 'HIGHEST_RATED' },
  { title: 'Lowest rated repositories', value: 'LOWEST_RATED' }
];

const SortingMenu = memo(
  ({ visible, closeMenu, openMenu, currentSorting, setSorting, loading }) => {
    const menuItems = useMemo(
      () =>
        sortingOptions.map((option) => (
          <MenuItem
            key={option.value}
            title={option.title}
            onPress={() => setSorting(option.value)}
            selected={currentSorting === option.value}
            loading={loading}
          />
        )),
      [currentSorting, setSorting, loading]
    );

    return (
      <View>
        <Portal>
          <Modal visible={visible}
            onDismiss={closeMenu}
            transparent>
            <View style={styles.modalOverlay} />
          </Modal>
        </Portal>
        <Menu
          contentStyle={styles.menuContent}
          visible={visible}
          onDismiss={closeMenu}
          anchor={
            <Button
              icon='menu-down'
              mode='text'
              onPress={openMenu}
              style={styles.sortButton}
              labelStyle={styles.sortButtonLabel}
              contentStyle={{ flexDirection: 'row-reverse' }}
            >
              {sortingOptions.find((option) => option.value === currentSorting)
                ?.title || 'Latest repositories'}
            </Button>
          }
          style={styles.menu}
        >
          <View style={styles.headerText}>
            <Text color='textSecondary'>Select an item...</Text>
          </View>
          {menuItems}
        </Menu>
      </View>
    );
  }
);

SortingMenu.displayName = 'SortingMenu';

export default SortingMenu;
