import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';

const httpLink = createHttpLink({
  uri: `${Constants.expoConfig.extra.APOLLO_URI}:4000/graphql`
});

const __DEV__ = Constants.expoConfig.extra.ENV === 'development';

const createApolloClient = (authStorage) => {
  if(__DEV__) {
    loadDevMessages();
    loadErrorMessages();
  }

  const authLink = setContext(async (_, { headers }) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      return {
        headers: {
          ...headers,
          authorization: accessToken ? `Bearer ${accessToken}` : ''
        }
      };
    } catch (e) {
      console.log(e);
      return {
        headers
      };
    }
  });
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
};

export default createApolloClient;
