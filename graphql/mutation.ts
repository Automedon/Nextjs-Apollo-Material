import gql from "graphql-tag";

export const CREATE_USER_MUTATION = gql`
  mutation($input: CreateUserInput!) {
    createUser(input: $input) {
      email
      id
      name
    }
  }
`;

export const UPDATE_USER_MUTATION = gql`
  mutation($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, input: $input) {
      email
      id
      name
    }
  }
`;

export const DELETE_USER_MUTATION = gql`
  mutation($id: ID!) {
    deleteUser(id: $id) {
      email
      id
      name
    }
  }
`;
