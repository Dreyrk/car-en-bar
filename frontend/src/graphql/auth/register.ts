import { gql } from "@apollo/client";

const REGISTER = gql`
  mutation Register($newUser: InputRegister!) {
    register(newUser: $newUser) {
      success
      message
    }
  }
`;

export default REGISTER;
