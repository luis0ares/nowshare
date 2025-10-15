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

export const DELETE_ARTICLE = gql`
  mutation DeleteArticle($articleId: String!) {
    deleteArticle(articleId: $articleId)
  }
`;

export const POST_ARTICLE_COMMENT = gql`
  mutation CreateComment($articleId: String!, $content: String!) {
    createComment(articleId: $articleId, content: $content) {
      id
    }
  }
`;
