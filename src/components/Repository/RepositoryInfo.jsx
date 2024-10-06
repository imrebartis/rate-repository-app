import { memo } from 'react';
import RepositoryItem from './RepositoryItem';

const RepositoryInfo = ({ repository }) => (
  <RepositoryItem item={repository}
    showGitHubLinkButton={true} />
);

export default memo(RepositoryInfo);
