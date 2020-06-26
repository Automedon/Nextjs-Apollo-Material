import gql from "graphql-tag";

export const ALL_USERS_QUERY = gql`
  query($skip: Int, $limit: Int) {
    users(skip: $skip, limit: $limit) {
      email
      id
      name
    }
  }
`;
