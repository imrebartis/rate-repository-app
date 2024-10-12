import { useState, useCallback, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';
import { useDebounce } from 'use-debounce';

const useRepositories = (initialSearchQuery = '') => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500);

  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy,
      orderDirection,
      searchKeyword: debouncedSearchQuery
    },
    fetchPolicy: 'cache-and-network'
  });

  useEffect(() => {
    refetch({
      orderBy,
      orderDirection,
      searchKeyword: debouncedSearchQuery
    });
  }, [debouncedSearchQuery, orderBy, orderDirection, refetch]);

  const sortingOptions = {
    LATEST: { orderBy: 'CREATED_AT', orderDirection: 'DESC' },
    HIGHEST_RATED: { orderBy: 'RATING_AVERAGE', orderDirection: 'DESC' },
    LOWEST_RATED: { orderBy: 'RATING_AVERAGE', orderDirection: 'ASC' }
  };

  const setSorting = useCallback(
    async (newSorting) => {
      const { orderBy: newOrderBy, orderDirection: newOrderDirection } =
        sortingOptions[newSorting] || sortingOptions.LATEST;

      setOrderBy(newOrderBy);
      setOrderDirection(newOrderDirection);

      try {
        await refetch({
          orderBy: newOrderBy,
          orderDirection: newOrderDirection,
          searchKeyword: debouncedSearchQuery
        });
      } catch (e) {
        console.error('Error changing sorting:', e);
      }
    },
    [refetch, debouncedSearchQuery]
  );

  const repositories = data?.repositories?.edges?.map((edge) => edge.node) ?? [];

  return {
    repositories,
    loading,
    error,
    setSorting,
    searchQuery,
    setSearchQuery,
    refetch
  };
};

export default useRepositories;
