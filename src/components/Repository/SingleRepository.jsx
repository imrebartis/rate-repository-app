import RepositoryItem from './RepositoryItem';
import { useParams } from 'react-router-native';
import { useQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../../graphql/queries';
import Loading from '../Loading';
import Error from '../Error';

const SingleRepository = () => {
  const { id } = useParams();
  const { data, error, loading } = useQuery(GET_REPOSITORY, {
    fetchPolicy: 'cache-and-network',
    variables: { id }
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error.message} />;
  }

  if (!data || !data.repository) {
    return <Error error='Unexpected error: repository is missing' />;
  }

  return <RepositoryItem item={data.repository}
    showGitHubLinkButton={true} />;
};

export default SingleRepository;
