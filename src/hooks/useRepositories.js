import { useState, useCallback, useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useDebounce } from 'use-debounce';

const SORTING_OPTIONS = {
  LATEST: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
  HIGHEST_RATED: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
  LOWEST_RATED: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' }
};

const useRepositories = ({
  initialOrderBy = 'CREATED_AT',
  initialOrderDirection = 'DESC',
  initialSearchQuery = '',
  initialFirst = 10
} = {}) => {
  const [orderBy, setOrderBy] = useState(initialOrderBy);
  const [orderDirection, setOrderDirection] = useState(initialOrderDirection);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [first] = useState(initialFirst);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const variables = useMemo(
    () => ({
      first,
      orderBy,
      orderDirection,
      searchKeyword: debouncedSearchQuery || ''
    }),
    [first, orderBy, orderDirection, debouncedSearchQuery]
  );

  const {
    data,
    loading,
    error,
    refetch: apolloRefetch,
    fetchMore
  } = useQuery(GET_REPOSITORIES, {
    variables,
    fetchPolicy: 'cache-and-network'
  });

  const refetch = useCallback(
    () => apolloRefetch(variables),
    [apolloRefetch, variables]
  );

  const setSorting = useCallback(
    async (newSorting) => {
      const { orderBy: newOrderBy, orderDirection: newOrderDirection } =
        SORTING_OPTIONS[newSorting] || SORTING_OPTIONS.LATEST;

      setOrderBy(newOrderBy);
      setOrderDirection(newOrderDirection);

      try {
        await refetch();
      } catch (e) {
        console.error('Error changing sorting:', e);
      }
    },
    [refetch]
  );

  const handleFetchMore = useCallback(() => {
    if (!loading && data?.repositories.pageInfo.hasNextPage) {
      fetchMore({
        variables: {
          ...variables,
          after: data.repositories.pageInfo.endCursor
        }
      });
    }
  }, [loading, data, fetchMore, variables]);

  const repositories = data?.repositories?.edges?.map((edge) => edge.node) ?? [];

  return {
    repositories,
    loading,
    error,
    setSorting,
    searchQuery,
    setSearchQuery,
    refetch,
    fetchMore: handleFetchMore
  };
};

export default useRepositories;
