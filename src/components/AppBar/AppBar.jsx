import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight + 40,
    paddingBottom: 20,
    paddingLeft: 10,
    backgroundColor: theme.colors.backgroundPrimary
  },
  tab: {
    marginRight: 20
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to='/'
          text='Repositories' />
        <AppBarTab to='/signin'
          text='Sign In' />
      </ScrollView>
    </View>
  );
};

export default AppBar;
