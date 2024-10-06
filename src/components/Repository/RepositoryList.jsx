import { FlatList, View, StyleSheet, Pressable } from 'react-native';
import { useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-native';
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

export const RepositoryListContainer = ({
  data,
  error,
  loading,
  onRepositoryPress
}) => {
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error.message} />;
  }

  const repositoryNodes = data.repositories
    ? data.repositories.edges.map((edge) => edge.node)
    : [];

  const renderItem = ({ item }) => (
    <Pressable onPress={() => onRepositoryPress(item.id)}>
      <RepositoryItem item={item} />
    </Pressable>
  );

  return (
    <FlatList
      style={styles.container}
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const navigate = useNavigate();
  const { data, error, loading } = useQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network'
  });

  const onRepositoryPress = (id) => {
    navigate(`/${id}`);
  };

  return (
    <RepositoryListContainer
      data={data}
      error={error}
      loading={loading}
      onRepositoryPress={onRepositoryPress}
    />
  );
};

export default RepositoryList;
