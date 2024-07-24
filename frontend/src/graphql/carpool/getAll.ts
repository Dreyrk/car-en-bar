import { gql } from "@apollo/client";

const GET_ALL_CARPOOLS = gql`
  query AllCarpools {
    getAllCarpools {
      id
      departure_time
      arrival_time
      departure {
        address
        city
        country
        postal_code
      }
      arrival {
        address
        city
        country
        postal_code
      }
      participants {
        participant_type
        user {
          username
        }
      }
      price
      max_passengers
      carpool_type
    }
  }
`;

export default GET_ALL_CARPOOLS;
