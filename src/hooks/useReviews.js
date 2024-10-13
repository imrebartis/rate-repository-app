import { useQuery } from '@apollo/client';
import { GET_CURRENT_USER } from '../graphql/queries';

const useReviews = () => {
  const { data, loading, error } = useQuery(GET_CURRENT_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network'
  });

  const reviews = data?.me?.reviews?.edges?.map((edge) => edge.node) ?? [];

  return { reviews, loading, error };
};

export default useReviews;
