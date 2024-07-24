import { gql } from "@apollo/client";

const LOGIN = gql`
  mutation Login($user: InputLogin!) {
    login(user: $user) {
      success
      message
    }
  }
`;

export default LOGIN;
