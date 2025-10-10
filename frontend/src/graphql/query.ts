import { gql } from "@apollo/client";

export type User = {
  id: string;
  username: string;
  avatarUrl?: string;
};
export const GET_ME = gql`
  query Me {
    me {
      avatarUrl
      id
      username
    }
  }
`;
//--------------------------------------------------
export type ArticlesList = {
  id: string;
  title: string;
  author: {
    username: string;
    avatarUrl: string;
  };
  createdAt: string;
}[];
export const LIST_ALL_ARTICLES = gql`
  query Articles {
    articles {
      id
      title
      author {
        username
        avatarUrl
      }
      createdAt
    }
  }
`;
//--------------------------------------------------
export type UserArticlesList = {
  id: string;
  title: string;
  author: {
    username: string;
    avatarUrl: string;
  };
  createdAt: string;
}[];
export const USER_LIST_ALL_ARTICLES = gql`
  query Articles($authorId: String) {
    articles(authorId: $authorId) {
      id
      title
      author {
        username
        avatarUrl
      }
      createdAt
    }
  }
`;
//--------------------------------------------------
export type Article = {
  id: string;
  title: string;
  content: string;
  author: {
    username: string;
    id: string;
    avatarUrl: string;
  };
  comments: Array<{
    id: string;
    createdAt: string;
    content: string;
    author: {
      username: string;
      avatarUrl: string;
      id: string;
    };
  }>;
};
export const GET_ARTICLE = gql`
  query Query($articleId: String!) {
    article(id: $articleId) {
      id
      title
      content
      author {
        username
        id
        avatarUrl
      }
      comments {
        id
        createdAt
        content
        author {
          username
          avatarUrl
          id
        }
      }
    }
  }
`;
