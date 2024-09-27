import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Link } from 'react-router-native';
import Text from '../Text';

const styles = StyleSheet.create({
  container: {
    marginRight: 20
  }
});

const AppBarTab = ({ to, text }) => (
  <Link to={to}
    component={Pressable}
    style={styles.container}>
    <Text fontSize='subheading'
      fontWeight='bold'
      color='textWhite'>
      {text}
    </Text>
  </Link>
);

export default AppBarTab;
