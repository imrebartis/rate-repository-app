import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import Constants from 'expo-constants';
import { setContext } from '@apollo/client/link/context';
import { loadErrorMessages, loadDevMessages } from '@apollo/client/dev';
import { relayStylePagination } from '@apollo/client/utilities';

const { APOLLO_URI } = Constants.expoConfig.extra;

const httpLink = createHttpLink({
  uri: `${APOLLO_URI}:4000/graphql`
});

const __DEV__ = Constants.expoConfig.extra.ENV === 'development';

const createApolloClient = (authStorage) => {
  if (__DEV__) {
    loadDevMessages();
    loadErrorMessages();
  }

  const cache = new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          repositories: relayStylePagination()
        }
      }
    }
  });

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
    cache
  });
};

export default createApolloClient;
