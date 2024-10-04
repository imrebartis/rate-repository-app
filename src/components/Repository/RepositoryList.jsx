import { FlatList, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../../graphql/queries';
import RepositoryItem from './RepositoryItem';
import Loading from '../Loading';
import Error from '../Error';
import theme from '../../theme';

const styles = StyleSheet.create({
  separator: {
    height: 10
  },
  container: {
    backgroundColor: theme.colors.backgroundSecondary
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ data, error, loading }) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const repositoryNodes = data.repositories
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  return (
    <FlatList
      style={styles.container}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  return <RepositoryListContainer data={data}
    error={error}
    loading={loading} />;
};

export default RepositoryList;
