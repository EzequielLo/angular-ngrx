import { Post } from "src/app/models/post"


export interface PostsState {
  posts: Post[]
}

export const initialState: PostsState = {
  posts: [],
}
