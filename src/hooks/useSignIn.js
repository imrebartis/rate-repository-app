import { useMutation } from '@apollo/client';
import { SIGN_IN } from '../graphql/mutations';

const useSignIn = () => {
  const [mutate, result] = useMutation(SIGN_IN);

  const signIn = async ({ username, password }) => {
    console.log('Username:', username);
    console.log('Password:', password);
    try {
      const { data } = await mutate({
        variables: { credentials: { username, password } }
      });
      return data;
    } catch (error) {
      console.error('Error signing in:', error);
      throw error;
    }
  };

  return [signIn, result];
};

export default useSignIn;
