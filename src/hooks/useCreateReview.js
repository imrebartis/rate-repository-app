import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';
import useAuthStorage from '../hooks/useAuthStorage';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    const accessToken = await authStorage.getAccessToken();
    const review = { repositoryName, ownerName, rating: Number(rating), text };

    try {
      const { data } = await mutate({
        variables: { review },
        context: {
          headers: {
            authorization: accessToken ? `Bearer ${accessToken}` : ''
          }
        }
      });

      if (data?.createReview?.repositoryId) {
        navigate(`/repository/${data.createReview.repositoryId}`);
        return data;
      } else {
        throw new Error('Received invalid response from server');
      }
    } catch (error) {
      if (error.graphQLErrors?.length > 0) {
        console.error('GraphQL errors:', error.graphQLErrors);
        const graphQLError = error.graphQLErrors[0];
        throw new Error(graphQLError.message);
      } else if (error.networkError) {
        console.error('Network error:', error.networkError);
        throw new Error('Network error occurred. Please try again.');
      } else {
        console.error('Unexpected error:', error);
        throw new Error('An unexpected error occurred. Please try again.');
      }
    }
  };

  return [createReview, result];
};

export default useCreateReview;
