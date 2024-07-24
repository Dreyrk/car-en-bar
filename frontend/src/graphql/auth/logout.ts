import { gql } from "@apollo/client";

const LOGOUT = gql`
  mutation Logout {
    logout {
      success
      message
    }
  }
`;

export default LOGOUT;
