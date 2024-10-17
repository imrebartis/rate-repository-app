import { useMutation, useApolloClient } from '@apollo/client';
import { DELETE_REVIEW } from '../graphql/mutations';
import {
  GET_CURRENT_USER,
  GET_REVIEWS,
  GET_REPOSITORY
} from '../graphql/queries';
import useAuthStorage from './useAuthStorage';

const useDeleteReview = () => {
  const [mutate, result] = useMutation(DELETE_REVIEW);
  const apolloClient = useApolloClient();
  const authStorage = useAuthStorage();

  const deleteReview = async (id, repositoryId) => {
    const accessToken = await authStorage.getAccessToken();

    try {
      if (!accessToken) {
        console.error('No access token found in storage');
        throw new Error('No access token found');
      }

      const result = await mutate({
        variables: { id },
        context: {
          headers: {
            authorization: `Bearer ${accessToken}`
          }
        }
      });
      setTimeout(async () => {
        await apolloClient.refetchQueries({
          include: [GET_REPOSITORY, GET_CURRENT_USER, GET_REVIEWS]
        });
        console.log('Refetch completed');
      }, 5000);

      return result;
    } catch (e) {
      console.error('An error occurred while deleting the review', e);
      throw e;
    }
  };

  return { deleteReview, result };
};

export default useDeleteReview;
