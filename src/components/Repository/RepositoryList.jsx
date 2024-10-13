import { useState, memo, useCallback } from 'react';
import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { useNavigate } from 'react-router-native';
import useRepositories from '../../hooks/useRepositories';
import RepositoryListItem from './RepositoryListItem';
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
  loadingIndicator: {
    marginTop: 20
  },
  noRepositoriesText: {
    textAlign: 'center',
    marginTop: 20
  }
});

export const RepositoryListContainer = ({
  repositories,
  loading,
  error,
  setSorting: setRepositoriesSorting,
  searchQuery,
  setSearchQuery,
  refetch,
  onRepositoryPress
}) => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [sorting, setSorting] = useState('LATEST');

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
        onPress={() => onRepositoryPress(item.id)}
      />
    ),
    [onRepositoryPress]
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
            <ActivityIndicator style={styles.loadingIndicator}
              size='large' />
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

const RepositoryList = () => {
  const navigate = useNavigate();
  const {
    repositories,
    loading,
    error,
    setSorting: setRepositoriesSorting,
    searchQuery,
    setSearchQuery,
    refetch
  } = useRepositories();

  const handleRepositoryPress = useCallback(
    (id) => {
      navigate(`/${id}`);
    },
    [navigate]
  );

  return (
    <RepositoryListContainer
      repositories={repositories}
      loading={loading}
      error={error}
      setSorting={setRepositoriesSorting}
      setSearchQuery={setSearchQuery}
      searchQuery={searchQuery}
      refetch={refetch}
      onRepositoryPress={handleRepositoryPress}
    />
  );
};

export default memo(RepositoryList);
