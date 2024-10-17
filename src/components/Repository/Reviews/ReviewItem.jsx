import { memo } from 'react';
import { View, StyleSheet, Linking, Alert } from 'react-native';
import { format } from 'date-fns';
import useDeleteReview from '../../../hooks/useDeleteReview';
import theme from '../../../theme';
import Text from '../../Text';
import Button from '../../Button';

const styles = StyleSheet.create({
  reviewWrapper: {
    backgroundColor: theme.colors.backgroundWhite,
    padding: 10
  },
  reviewContainer: {
    backgroundColor: theme.colors.backgroundWhite,
    padding: 10,
    flexDirection: 'row'
  },
  ratingContainer: {
    height: 32,
    width: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  },
  ratingText: {
    color: theme.colors.primary
  },
  reviewContent: {
    flex: 1
  },
  reviewText: {
    marginTop: 10
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  loadingIndicator: {
    marginTop: 20
  }
});

const ReviewItem = ({ review, setSuccess }) => {
  const { rating, text, createdAt, user, repository, id } = review;
  const { username } = user;

  const { deleteReview } = useDeleteReview();


  const confirmDelete = () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteReview(id, repository.id);
              setSuccess('Review deleted successfully.');
            } catch (e) {
              console.error('Failed to delete review.', e);
              if (e.message.includes('User is not authorized')) {
                Alert.alert(
                  'Error',
                  'You are not authorized to delete this review.'
                );
              } else if (e.message.includes('No access token')) {
                Alert.alert(
                  'Error',
                  'You need to be logged in to delete a review.'
                );
              } else {
                Alert.alert('Error', 'Failed to delete review.');
              }
            }
          },
          style: 'destructive'
        }
      ],
      { cancelable: true }
    );
  };

  const openRepository = () => {
    if (repository && repository.url) {
      Linking.openURL(repository.url);
    }
  };

  return (
    <View style={styles.reviewWrapper}>
      <View style={styles.reviewContainer}>
        <View style={styles.ratingContainer}>
          <Text fontWeight='bold'
            style={styles.ratingText}>
            {rating}
          </Text>
        </View>
        <View style={styles.reviewContent}>
          <Text fontWeight='bold'
            fontSize='subheading'>
            {username}
          </Text>
          <Text color='textSecondary'>
            {format(new Date(createdAt), 'dd.MM.yyyy')}
          </Text>
          <Text style={styles.reviewText}>{text}</Text>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <Button title='View repository'
          onPress={openRepository} />
        <Button
          title='Delete review'
          backgroundColor={theme.colors.tertiary}
          onPress={confirmDelete}
        />
      </View>
    </View>
  );
};

export default memo(ReviewItem);
