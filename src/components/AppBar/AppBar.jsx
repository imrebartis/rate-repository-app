import { View, StyleSheet, ScrollView } from 'react-native';
import { useQuery, useApolloClient } from '@apollo/client';
import { GET_CURRENT_USER } from '../../graphql/queries';
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

const AppBar = ({ setSuccess }) => {
  const { data } = useQuery(GET_CURRENT_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    setSuccess('Signed out succesfully');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab to='/'
          text='Repositories' />
        {data?.me ? (
          <AppBarTab to='/create-review'
            text='Create a Review' />
        ) : null}
        {data?.me ? <AppBarTab to='/my-reviews'
          text='My Reviews' /> : null}
        {data?.me ? (
          <AppBarTab to='/signin'
            text='Sign Out'
            onPress={handleSignOut} />
        ) : (
          <AppBarTab to='/signin'
            text='Sign In' />
        )}
        {!data?.me ? <AppBarTab to='/signup'
          text='Sign Up' /> : null}
      </ScrollView>
    </View>
  );
};

export default AppBar;
