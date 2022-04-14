import { gql } from "graphql-tag"

export const GET_LISTS = gql`
  query {
    Lists {
        id,
        title
        items {
          id,
          Title,
          Status
        }
      }  
  }
`;