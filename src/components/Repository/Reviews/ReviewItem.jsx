import { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import theme from '../../../theme';
import Text from '../../Text';

const styles = StyleSheet.create({
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
  }
});

const ReviewItem = ({ review }) => {
  const { rating, text, createdAt, user } = review;
  const { username } = user;

  return (
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
  );
};

export default memo(ReviewItem);
