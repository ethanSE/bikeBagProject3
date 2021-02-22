/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDesign = /* GraphQL */ `
  query GetDesign($id: ID!) {
    getDesign(id: $id) {
      id
      owner
      image {
        bucket
        region
        key
      }
      scale
      points {
        x
        y
      }
      createdAt
      updatedAt
    }
  }
`;
export const listDesigns = /* GraphQL */ `
  query ListDesigns(
    $filter: ModelDesignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDesigns(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        owner
        image {
          bucket
          region
          key
        }
        scale
        points {
          x
          y
        }
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
