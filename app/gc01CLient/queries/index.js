import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
`;

export const REGISTER = gql`
mutation Register($payload: RegisterInput) {
  register(payload: $payload) {
    _id
    name
    username
    email
    password
  }
}
`;

export const GET_POSTS = gql`
  query GetPosts {
  getPosts {
    _id
    content
    imgUrl
    authorId
    createdAt
    updatedAt
    tags
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    author {
      _id
      name
      username
      email
      password
    }
  }
}
`;

export const ADD_POST = gql`
mutation Mutation($payload: NewPost) {
  addPost(payload: $payload) {
    _id
    content
    tags
    imgUrl
  }
}
`

export const LIKE_POST = gql`
mutation LikePost($likePostId: ID) {
  likePost(likePostId: $likePostId) {
    message
    data {
      _id
      followingId
      followersId
      createdAt
      updatedAt
    }
  }
}`

export const GET_POST_ID = gql`
query Query($postId: ID) {
  findPostById(postId: $postId) {
    _id
    content
    tags
    imgUrl
    authorId
    comments {
      content
      username
      createdAt
      updatedAt
    }
    likes {
      username
      createdAt
      updatedAt
    }
    createdAt
    updatedAt
    author {
      _id
      name
      username
      email
      password
    }
  }
}`

export const GET_USERS = gql`
query Query {
  getUsers {
    _id
    name
    username
    email
    password
  }
}`

export const FOLLOW = gql`
mutation Mutation($followingId: ID) {
  follow(followingId: $followingId) {
    message
    data {
      _id
      followingId
      followersId
      createdAt
      updatedAt
    }
  }
}`

export const GET_USER_BY_LOGIN = gql`
query GetUserById {
  getUserById {
    _id
    name
    username
    email
    password
    follower {
      _id
      followingId
      followersId
      createdAt
      updatedAt
    }
    followersName {
      _id
      name
      username
      email
      password
    }
    following {
      _id
      followingId
      followersId
      createdAt
      updatedAt
    }
    followingsName {
      _id
      name
      username
      email
      password
    }
  }
}`