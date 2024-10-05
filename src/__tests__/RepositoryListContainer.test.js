import { render, screen, within } from '@testing-library/react-native';
import { RepositoryListContainer } from '../components/Repository/RepositoryList';

const formatCount = (count) => {
  return count > 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();
};

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        repositories: {
          totalCount: 8,
          pageInfo: {
            hasNextPage: true,
            endCursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
            startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd'
          },
          edges: [
            {
              node: {
                id: 'jaredpalmer.formik',
                fullName: 'jaredpalmer/formik',
                description: 'Build forms in React, without the tears',
                language: 'TypeScript',
                forksCount: 1619,
                stargazersCount: 21856,
                ratingAverage: 88,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars2.githubusercontent.com/u/4060187?v=4'
              },
              cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd'
            },
            {
              node: {
                id: 'async-library.react-async',
                fullName: 'async-library/react-async',
                description: 'Flexible promise-based React data loader',
                language: 'JavaScript',
                forksCount: 69,
                stargazersCount: 1760,
                ratingAverage: 72,
                reviewCount: 3,
                ownerAvatarUrl:
                  'https://avatars1.githubusercontent.com/u/54310907?v=4'
              },
              cursor:
                'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ=='
            }
          ]
        }
      };

      render(<RepositoryListContainer data={repositories} />);

      const repositoryItems = screen.getAllByTestId('repositoryItem');
      const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

      const checkRepositoryItem = (repositoryItem, repository) => {
        const { getByText } = within(repositoryItem);

        expect(getByText(repository.fullName)).toBeTruthy();
        expect(getByText(repository.description)).toBeTruthy();
        expect(getByText(repository.language)).toBeTruthy();
        expect(getByText(formatCount(repository.forksCount))).toBeTruthy();
        expect(getByText(formatCount(repository.stargazersCount))).toBeTruthy();
        expect(getByText(repository.ratingAverage.toString())).toBeTruthy();
        expect(getByText(repository.reviewCount.toString())).toBeTruthy();
      };

      checkRepositoryItem(
        firstRepositoryItem,
        repositories.repositories.edges[0].node
      );
      checkRepositoryItem(
        secondRepositoryItem,
        repositories.repositories.edges[1].node
      );
    });
  });
});
