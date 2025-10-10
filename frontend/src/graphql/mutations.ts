import { gql } from "@apollo/client";

export type IdType = {
  id: string
}

export const CREATE_ARTICLE = gql`
  mutation CreateArticle($title: String!, $content: String!) {
    createArticle(title: $title, content: $content) {
      id
    }
  }
`;