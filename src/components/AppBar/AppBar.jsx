import { View, StyleSheet, ScrollView } from 'react-native';
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_USER } from '../../graphql/queries';
import Constants from 'expo-constants';
import AppBarTab from './AppBarTab';
import theme from '../../theme';
import useAuthStorage from '../../hooks/useAuthStorage';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight + 40,
    paddingBottom: 20,
    paddingLeft: 10,
    backgroundColor: theme.colors.backgroundPrimary
  }
});

const AppBar = () => {
  const { data } = useQuery(GET_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to='/'
          text='Repositories' />
        {data?.me ? (
          <AppBarTab to='/signin'
            text='Sign Out'
            onPress={handleSignOut} />
        ) : (
          <AppBarTab to='/signin'
            text='Sign In' />
        )}
      </ScrollView>
    </View>
  );
};

export default AppBar;
