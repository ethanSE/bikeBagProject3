/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCustomDesign = /* GraphQL */ `
  query GetCustomDesign($id: ID!) {
    getCustomDesign(id: $id) {
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
      isOrdered
      _version
      _deleted
      _lastChangedAt
      updatedAt
    }
  }
`;
export const listCustomDesigns = /* GraphQL */ `
  query ListCustomDesigns(
    $filter: ModelCustomDesignFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCustomDesigns(filter: $filter, limit: $limit, nextToken: $nextToken) {
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
        isOrdered
        _version
        _deleted
        _lastChangedAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const syncCustomDesigns = /* GraphQL */ `
  query SyncCustomDesigns(
    $filter: ModelCustomDesignFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncCustomDesigns(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
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
        isOrdered
        _version
        _deleted
        _lastChangedAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
