import { useMutation } from '@apollo/client';
import { CREATE_REVIEW } from '../graphql/mutations';
import { useNavigate } from 'react-router-native';
import useAuthStorage from '../hooks/useAuthStorage';

const useCreateReview = () => {
  const [mutate, result] = useMutation(CREATE_REVIEW);
  const authStorage = useAuthStorage();
  const navigate = useNavigate();

  const createReview = async ({ repositoryName, ownerName, rating, text }) => {
    if (!authStorage) {
      throw new Error('Authentication storage is not available');
    }

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

      if (data) {
        navigate(`/repository/${data.createReview.repositoryId}`);
      }

      return data;
    } catch (error) {
      if (error.graphQLErrors) {
        const graphQLError = error.graphQLErrors[0];
        if (
          graphQLError.message === 'User has already reviewed this repository'
        ) {
          throw new Error('You have already reviewed this repository.');
        }
        if (
          graphQLError.message.includes('GitHub repository') &&
          graphQLError.message.includes('does not exist')
        ) {
          throw new Error('The specified GitHub repository does not exist.');
        }
      }

      if (error.networkError) {
        throw new Error('Network error occurred. Please try again.');
      }

      console.log(error);
      throw new Error('Failed to create review.');
    }
  };

  return [createReview, result];
};

export default useCreateReview;
