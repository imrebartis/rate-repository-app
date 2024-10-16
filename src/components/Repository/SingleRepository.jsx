import { useCallback, useMemo } from 'react';
import { StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY, GET_REVIEWS } from '../../graphql/queries';
import Error from '../Error';
import Text from '../Text';
import RepositoryInfo from './RepositoryInfo';
import ReviewItem from './Reviews/ReviewItem';
import ItemSeparator from './ItemSeparator';

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
  const {
    data: repositoryData,
    error: repositoryError,
    loading: repositoryLoading
  } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id }
  });
  const {
    data: reviewData,
    error: reviewError,
    loading: reviewLoading
  } = useQuery(GET_REVIEWS, {
    fetchPolicy: 'cache-and-network',
    variables: { id }
  });

  const reviews = useMemo(
    () => reviewData?.repository?.reviews?.edges.map((edge) => edge.node) || [],
    [reviewData]
  );

  const renderItem = useCallback(({ item }) => <ReviewItem review={item}
    setSuccess={setSuccess} />, []);

  const ListHeaderComponent = useCallback(
    () => (
      <>
        <RepositoryInfo repository={repositoryData.repository} />
        {reviews.length === 0 && (
          <Text style={styles.noReviewsText}>No reviews yet</Text>
        )}
      </>
    ),
    [repositoryData, reviews.length]
  );

  if (repositoryLoading || reviewLoading) {
    return <ActivityIndicator style={styles.loadingIndicator}
      size='large' />;
  }

  if (repositoryError || reviewError) {
    return <Error error={repositoryError?.message || reviewError?.message} />;
  }

  if (!repositoryData || !repositoryData.repository) {
    return <Error error='Unexpected error: repository is missing' />;
  }

  return (
    <FlatList
      data={reviews}
      renderItem={renderItem}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={ListHeaderComponent}
      ItemSeparatorComponent={ItemSeparator}
    />
  );
};

export default SingleRepository;
