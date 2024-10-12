import { useState, useCallback } from 'react';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');

  const { data, loading, error, refetch } = useQuery(GET_REPOSITORIES, {
    variables: {
      orderBy,
      orderDirection
    },
    fetchPolicy: 'cache-and-network'
  });

  const setSorting = useCallback(async (newSorting) => {
    let newOrderBy, newOrderDirection;

    switch (newSorting) {
    case 'LATEST':
      newOrderBy = 'CREATED_AT';
      newOrderDirection = 'DESC';
      break;
    case 'HIGHEST_RATED':
      newOrderBy = 'RATING_AVERAGE';
      newOrderDirection = 'DESC';
      break;
    case 'LOWEST_RATED':
      newOrderBy = 'RATING_AVERAGE';
      newOrderDirection = 'ASC';
      break;
    default:
      newOrderBy = 'CREATED_AT';
      newOrderDirection = 'DESC';
    }

    setOrderBy(newOrderBy);
    setOrderDirection(newOrderDirection);

    try {
      await refetch({
        orderBy: newOrderBy,
        orderDirection: newOrderDirection
      });
    } catch (e) {
      console.error('Error changing sorting:', e);
    }
  }, [refetch]);

  const repositories = data?.repositories?.edges?.map(edge => edge.node) ?? [];

  return {
    repositories,
    loading,
    error,
    setSorting
  };
};

export default useRepositories;
