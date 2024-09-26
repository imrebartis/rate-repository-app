import React from 'react';
import { View, StyleSheet } from 'react-native';
import Text from './Text';

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 16,
    padding: 8
  },
  statItem: {
    alignItems: 'center'
  },
  text: {
    marginBottom: 8
  }
});

const RepositoryStats = ({ item }) => {
  return (
    <View style={styles.statsContainer}>
      <View style={styles.statItem}>
        <Text fontWeight='bold'
          style={styles.text}>
          {item.stargazersCount > 1000
            ? `${(item.stargazersCount / 1000).toFixed(1)}k`
            : item.stargazersCount}
        </Text>
        <Text color='textSecondary'>Stars</Text>
      </View>
      <View style={styles.statItem}>
        <Text fontWeight='bold'
          style={styles.text}>
          {item.forksCount > 1000
            ? `${(item.forksCount / 1000).toFixed(1)}k`
            : item.forksCount}
        </Text>
        <Text color='textSecondary'>Forks</Text>
      </View>
      <View style={styles.statItem}>
        <Text fontWeight='bold'
          style={styles.text}>
          {item.reviewCount}
        </Text>
        <Text color='textSecondary'>Reviews</Text>
      </View>
      <View style={styles.statItem}>
        <Text fontWeight='bold'
          style={styles.text}>
          {item.ratingAverage}
        </Text>
        <Text color='textSecondary'>Rating</Text>
      </View>
    </View>
  );
};

export default RepositoryStats;
