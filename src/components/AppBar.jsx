import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingTop: Constants.statusBarHeight + 40,
    paddingBottom: 20,
    paddingLeft: 10,
    backgroundColor: theme.colors.backgroundPrimary
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab style={styles.appBar} />
    </View>
  );
};

export default AppBar;
