import { useMutation, useApolloClient } from '@apollo/client';
import { CREATE_USER, SIGN_IN } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';
import useAuthStorage from './useAuthStorage';

const useSignUp = () => {
  const [mutate, result] = useMutation(CREATE_USER);
  const [signInMutation] = useMutation(SIGN_IN);
  const authStorage = useAuthStorage();
  const navigate = useNavigate();
  const apolloClient = useApolloClient();

  const signUp = async ({ username, password }) => {
    try {
      const { data } = await mutate({
        variables: { user: { username, password } }
      });

      if (data?.createUser?.id) {
        const signInData = await signInMutation({
          variables: { credentials: { username, password } }
        });

        if (signInData?.data?.authenticate?.accessToken) {
          await authStorage.setAccessToken(
            signInData.data.authenticate.accessToken
          );
          apolloClient.resetStore();
          navigate('/');
        }
      }

      return data;
    } catch (error) {
      if (error.networkError) {
        throw new Error('Network error. Please try again later.');
      } else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        throw new Error(error.graphQLErrors[0].message);
      } else {
        throw new Error(
          'Failed to sign up. Please check your credentials and try again.'
        );
      }
    }
  };

  return [signUp, result];
};

export default useSignUp;
