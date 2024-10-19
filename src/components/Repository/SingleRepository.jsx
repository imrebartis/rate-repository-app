import React, { useCallback, useMemo } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useParams } from 'react-router-native';
import Error from '../Error';
import Text from '../Text';
import RepositoryInfo from './RepositoryInfo';
import ReviewItem from './Reviews/ReviewItem';
import ItemSeparator from './ItemSeparator';
import useRepository from '../../hooks/useRepository';

const styles = StyleSheet.create({
  noReviewsText: {
    textAlign: 'center'
  },
  loadingIndicator: {
    marginTop: 20
  }
});

const SingleRepository = ({ setSuccess }) => {
  const { id } = useParams();
  const { data, error, loading, fetchMore } = useRepository({
    id
  });

  const repository = data?.repository;
  const reviews = useMemo(
    () => repository?.reviews?.edges.map((edge) => edge.node) || [],
    [repository]
  );

  const onEndReached = useCallback(() => {
    fetchMore();
  }, [fetchMore]);

  const renderItem = useCallback(
    ({ item }) => <ReviewItem review={item}
      setSuccess={setSuccess} />,
    [setSuccess]
  );

  const ListHeaderComponent = useCallback(
    () => (
      <>
        <RepositoryInfo repository={repository} />
        {reviews.length === 0 && (
          <Text style={styles.noReviewsText}>No reviews yet</Text>
        )}
      </>
    ),
    [repository, reviews.length]
  );

  if (loading) {
    return <ActivityIndicator style={styles.loadingIndicator}
      size='large' />;
  }

  if (error) {
    return <Error error={error.message} />;
  }

  if (!repository) {
    return <Error error='Unexpected error: repository is missing' />;
  }

  return (
    <FlatList
      data={reviews}
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={ListHeaderComponent}
      ItemSeparatorComponent={ItemSeparator}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

export default SingleRepository;
