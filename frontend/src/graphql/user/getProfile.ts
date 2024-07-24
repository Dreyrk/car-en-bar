import { gql } from "@apollo/client";

const GET_PROFILE = gql`
  query GetProfile {
    getProfile {
      id
      username
      email
      role
      created_at
      updated_at
      cars
      carpools
      previousCarpools
    }
  }
`;

export default GET_PROFILE;
