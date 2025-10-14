import { gql } from "@apollo/client";

export type IdType = {
  id: string;
};

export const CREATE_ARTICLE = gql`
  mutation CreateArticle($title: String!, $content: String!) {
    createArticle(title: $title, content: $content) {
      id
    }
  }
`;

export const EDIT_ARTICLE = gql`
  mutation UpdateArticle(
    $articleId: String!
    $title: String!
    $content: String!
  ) {
    updateArticle(articleId: $articleId, title: $title, content: $content) {
      id
    }
  }
`;
