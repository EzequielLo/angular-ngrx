import { createAction, props } from "@ngrx/store";
import { Post } from "src/app/models/post";

export const ADD_POST_ACTION = '[posts page] add post';
export const ADD_POST_SUCCESS = '[posts page] add post success'
export const UPDATE_POST_ACTION = '[posts page] update post';
export const UPDATE_POST_ACTION_SUCCESS = '[posts page] update post success';
export const DELETE_POST_ACTION = '[posts page] delete post';
export const DELETE_POST_ACTION_SUCCESS = '[posts page] delete post success';
export const LOAD_POSTS = '[posts page] load posts'
export const LOAD_POSTS_SUCCESS = '[posts page] load posts success'

export const addPost = createAction(
  ADD_POST_ACTION, props<{ post: Post }>()
);
export const addPostSuccess = createAction(
  ADD_POST_SUCCESS, props<{ post: Post }>()
);
export const updatePost = createAction(
  UPDATE_POST_ACTION, props<{ post: Post }>()
);
export const deletePost = createAction(
  DELETE_POST_ACTION, props<{ id: string | undefined }>()
);
export const deletePostSuccess = createAction(
  DELETE_POST_ACTION_SUCCESS, props<{ id: string | undefined }>()
);
export const loadPost = createAction(LOAD_POSTS);

export const loadPostSuccess = createAction(
  LOAD_POSTS_SUCCESS, props<{ posts: Post[] }>()
);
export const updatePostSuccess = createAction(
  UPDATE_POST_ACTION_SUCCESS, props<{ post: Post }>()
);
