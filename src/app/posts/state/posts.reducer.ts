import { createReducer, on } from "@ngrx/store";
import { addPostSuccess, deletePost, deletePostSuccess, loadPostSuccess, updatePostSuccess } from "./posts.actions";
import { initialState } from "./posts.state";

const _postReducer = createReducer(initialState,
  on(addPostSuccess, (state, action) => {
    let post = { ...action.post };
    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  on(updatePostSuccess, (state, action) => {
    const updatePosts = state.posts.map((post: any) => {
      return action.post.id === post.id ? action.post : post;
    })
    return {
      ...state,
      posts: updatePosts,
    }
  }),
  on(deletePostSuccess, (state, { id }) => {
    const updatePosts = state.posts.filter(post => post.id !== id);
    return {
      ...state,
      posts: updatePosts
    }
  }),
  on(loadPostSuccess, (state, action) => {
    return {
      ...state,
      posts: action.posts,
    }
  }),
)

export function postReducer(state: any, action: any) {
  return _postReducer(state, action);
}
