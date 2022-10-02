// ./apollo-client.js

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { gql } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://oyalinen.com/cms/?graphql=true",
  cache: new InMemoryCache(),
});

export const getAllproductByPage = gql`
query productpage ($name:ID!){
  productCategory(id: $name, idType: NAME)
  {
    products{
      nodes{
        content
        productfields{
          name
          description
					customizationOptions
          orderProduction
          postSlug
          mainImage{
            mediaItemUrl
          }
          
        }
      }
    }
  }
  
}


`;

export const getllPostsByCat = gql`
query productpage($name: ID!) {
  category(id: $name, idType: NAME) {
    posts {
      nodes {
        id
        title
        featuredImage {
          node {
            mediaItemUrl
          }
        }
        slug
        categories {
          edges {
            node {
              name
            }
          }
        }
      }
    }
  }
}
`;

export default client;
