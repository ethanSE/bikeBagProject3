/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCustomDesign = /* GraphQL */ `
  mutation CreateCustomDesign(
    $input: CreateCustomDesignInput!
    $condition: ModelCustomDesignConditionInput
  ) {
    createCustomDesign(input: $input, condition: $condition) {
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
export const updateCustomDesign = /* GraphQL */ `
  mutation UpdateCustomDesign(
    $input: UpdateCustomDesignInput!
    $condition: ModelCustomDesignConditionInput
  ) {
    updateCustomDesign(input: $input, condition: $condition) {
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
export const deleteCustomDesign = /* GraphQL */ `
  mutation DeleteCustomDesign(
    $input: DeleteCustomDesignInput!
    $condition: ModelCustomDesignConditionInput
  ) {
    deleteCustomDesign(input: $input, condition: $condition) {
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
