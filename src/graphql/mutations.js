/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDesign = /* GraphQL */ `
  mutation CreateDesign(
    $input: CreateDesignInput!
    $condition: ModelDesignConditionInput
  ) {
    createDesign(input: $input, condition: $condition) {
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
export const updateDesign = /* GraphQL */ `
  mutation UpdateDesign(
    $input: UpdateDesignInput!
    $condition: ModelDesignConditionInput
  ) {
    updateDesign(input: $input, condition: $condition) {
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
export const deleteDesign = /* GraphQL */ `
  mutation DeleteDesign(
    $input: DeleteDesignInput!
    $condition: ModelDesignConditionInput
  ) {
    deleteDesign(input: $input, condition: $condition) {
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
