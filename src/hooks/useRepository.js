import { useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = ({ id, initialFirst = 10 }) => {
  const variables = useMemo(
    () => ({
      id,
      first: initialFirst
    }),
    [id, initialFirst]
  );

  const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
    variables,
    fetchPolicy: 'cache-and-network'
  });

  const handleFetchMore = useCallback(() => {
    if (!loading && data?.repository?.reviews.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          ...variables,
          after: data.repository.reviews.pageInfo.endCursor
        }
      });
    }
  }, [loading, data, fetchMore, variables]);

  return { data, error, loading, fetchMore: handleFetchMore };
};

export default useRepository;
