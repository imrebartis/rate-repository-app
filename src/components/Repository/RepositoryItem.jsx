import React from 'react';
import { View, StyleSheet } from 'react-native';
import theme from '../../theme';
import RepositoryHeader from './RepositoryHeader';
import RepositoryStats from './RepositoryStats';

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    backgroundColor: theme.colors.backgroundWhite,
    padding: 10
  }
});

const RepositoryItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <RepositoryHeader item={item} />
      <RepositoryStats item={item} />
    </View>
  );
};

export default RepositoryItem;
