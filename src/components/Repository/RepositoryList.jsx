import { useState, memo, useCallback } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import {
  Provider as PaperProvider,
} from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import useRepositories from '../../hooks/useRepositories';
import RepositoryListItem from './RepositoryListItem';
import Loading from '../Loading';
import Error from '../Error';
import theme from '../../theme';
import ItemSeparator from './ItemSeparator';
import SortingMenu from './SortingMenu/SortingMenu';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundWhite,
    flex: 1
  },
  menuContainer: {
    zIndex: 1
  }
});

const RepositoryList = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [sorting, setSorting] = useState('LATEST');

  const { repositories, loading, error, setSorting: setRepositoriesSorting } = useRepositories();

  const handleSortingChange = useCallback(async (newSorting) => {
    setSorting(newSorting);
    await setRepositoriesSorting(newSorting);
    setMenuVisible(false);
  }, [setRepositoriesSorting]);

  const openMenu = useCallback(() => setMenuVisible(true), []);
  const closeMenu = useCallback(() => setMenuVisible(false), []);

  const renderItem = useCallback(({ item }) => (
    <RepositoryListItem
      item={item}
      onPress={() => navigate(`/repository/${item.id}`)}
    />
  ), [navigate]);

  const keyExtractor = useCallback((item) => item.id, []);

  if (error) return <Error message={error.message} />;

  return (
    <PaperProvider>
      <View style={styles.container}>
        <View style={styles.menuContainer}>
          <SortingMenu
            visible={menuVisible}
            closeMenu={closeMenu}
            openMenu={openMenu}
            currentSorting={sorting}
            setSorting={handleSortingChange}
            loading={loading}
          />
        </View>
        {loading && repositories.length === 0 ? (
          <Loading />
        ) : (
          <FlatList
            data={repositories}
            ItemSeparatorComponent={ItemSeparator}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
          />
        )}
      </View>
    </PaperProvider>
  );
};

export default memo(RepositoryList);
