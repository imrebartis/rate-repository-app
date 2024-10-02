import { useMutation, useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router-native';
import { SIGN_IN } from '../graphql/mutations';
import useAuthStorage from '../hooks/useAuthStorage';

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  const apolloClient = useApolloClient();

  const signIn = async ({ username, password }) => {
    console.log('Username:', username);
    console.log('Password:', password);
    try {
      const { data } = await mutate({
        variables: { credentials: { username, password } }
      });

      if (data?.authenticate?.accessToken) {
        await authStorage.setAccessToken(data.authenticate.accessToken);
        apolloClient.resetStore();
        navigate('/');
      }

      return data;
    } catch (error) {
      console.error('Error signing in:', error);
      throw new Error(
        'Failed to sign in. Please check your credentials and try again.'
      );
    }
  };

  return [signIn, result];
};

export default useSignIn;
