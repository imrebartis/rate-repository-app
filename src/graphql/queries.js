import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query {
    repositories {
      edges {
        node {
          fullName
          language
          id
          name
          ownerName
          createdAt
          reviewCount
          ratingAverage
          forksCount
          stargazersCount
          description
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const GET_USER = gql`
  query {
    me {
      id
      username
    }
  }
`;
