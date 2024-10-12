import { useState, memo, useCallback } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import useRepositories from '../../hooks/useRepositories';
import RepositoryListItem from './RepositoryListItem';
import Loading from '../Loading';
import Error from '../Error';
import theme from '../../theme';
import ItemSeparator from './ItemSeparator';
import SortingMenu from './SortingMenu/SortingMenu';
import Text from '../Text';
import Search from './Search';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroundWhite,
    flex: 1
  },
  menuContainer: {
    zIndex: 1
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noRepositoriesText: {
    textAlign: 'center',
    marginTop: 20
  }
});

const RepositoryList = () => {
  const navigate = useNavigate();
  const [menuVisible, setMenuVisible] = useState(false);
  const [sorting, setSorting] = useState('LATEST');

  const {
    repositories,
    loading,
    error,
    setSorting: setRepositoriesSorting,
    searchQuery,
    setSearchQuery,
    refetch
  } = useRepositories();

  const handleSortingChange = useCallback(
    async (newSorting) => {
      setSorting(newSorting);
      await setRepositoriesSorting(newSorting);
      setMenuVisible(false);
    },
    [setRepositoriesSorting]
  );

  const openMenu = useCallback(() => setMenuVisible(true), []);
  const closeMenu = useCallback(() => setMenuVisible(false), []);

  const renderItem = useCallback(
    ({ item }) => (
      <RepositoryListItem
        item={item}
        onPress={() => navigate(`/${item.id}`)}
      />
    ),
    [navigate]
  );

  const handleSetSearchQuery = useCallback(
    (query) => {
      setSearchQuery(query);
    },
    [setSearchQuery]
  );

  const keyExtractor = useCallback((item) => item.id, []);

  if (error) return <Error message={error.message} />;

  return (
    <>
      <Search searchQuery={searchQuery}
        setSearchQuery={handleSetSearchQuery} />
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
            <View style={styles.loadingContainer}>
              <Loading />
            </View>
          ) : repositories.length === 0 ? (
            <Text
              style={styles.noRepositoriesText}
              color='textSecondary'
              fontSize='subheading'
            >
              No repository found
            </Text>
          ) : (
            <FlatList
              data={repositories}
              ItemSeparatorComponent={ItemSeparator}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              onRefresh={refetch}
              refreshing={loading}
            />
          )}
        </View>
      </PaperProvider>
    </>
  );
};

export default memo(RepositoryList);
