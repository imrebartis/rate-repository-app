import { FlatList, View, StyleSheet, ActivityIndicator } from 'react-native';
import useReviews from '../../../hooks/useReviews';
import ReviewItem from './ReviewItem';
import ItemSeparator from '../ItemSeparator';
import Text from '../../Text';
import Error from '../../Error';

const styles = StyleSheet.create({
  noReviewsText: {
    textAlign: 'center',
    marginTop: 20
  },
  loadingIndicator: {
    marginTop: 20
  }
});

const ReviewList = () => {
  const { reviews, loading, error } = useReviews();

  if (loading) {
    return <ActivityIndicator style={styles.loadingIndicator}
      size='large' />;
  }

  if (error) return <Error message={error.message} />;

  return (
    <View>
      {reviews.length > 0 ? (
        <FlatList
          data={reviews}
          ItemSeparatorComponent={ItemSeparator}
          renderItem={({ item }) => <ReviewItem review={item} />}
          keyExtractor={({ id }) => id.toString()}
        />
      ) : (
        <Text
          style={styles.noReviewsText}
          color='textSecondary'
          fontSize='subheading'
        >
          No reviews yet
        </Text>
      )}
    </View>
  );
};

export default ReviewList;
