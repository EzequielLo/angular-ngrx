import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { RouterNavigatedAction, ROUTER_NAVIGATION } from "@ngrx/router-store";
import { mergeMap, map, switchMap, filter } from "rxjs";
import { PostsService } from "src/app/services/posts.service";
import { addPost, addPostSuccess, deletePost, deletePostSuccess, loadPost, loadPostSuccess, updatePost, updatePostSuccess } from "./posts.actions";

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private postsService: PostsService
  ) { }

  loadPosts$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadPost),
        mergeMap(() => {
          return this.postsService.getPosts().pipe(
            map((posts) => {
              return loadPostSuccess({ posts });
            })
          )
        })
      )
    });

  addPost$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(addPost),
        mergeMap(action => {
          return this.postsService.addPost(action.post).pipe(
            map(data => {
              const post = { ...action.post, id: data.name }
              return addPostSuccess({ post });
            })
          )
        })
      )
    })

  updatePost$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(updatePost),
        switchMap(action => {
          return this.postsService.updatePost(action.post).pipe(
            map(() => {
              return updatePostSuccess({ post: action.post })
            })
          )
        })
      )
    }
  )

  deletePost$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deletePost),
        switchMap(action => {
          return this.postsService.deletePost(action.id!).pipe(
            map(() => {
              return deletePostSuccess({ id: action.id })
            })
          )
        })
      )
    }
  )

  getSinglePost$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ROUTER_NAVIGATION),
      filter((r: RouterNavigatedAction) => {
        return r.payload.routerState.url.startsWith('details')
      }),
      map((r: RouterNavigatedAction | any) => {
        return r.payload.routerState['params']['id'];
      }),
      switchMap(id => {
        return this.postsService.getPostById(id).pipe(map(post => {
          const postData = [{ ...post, id }];
          return loadPostSuccess({ posts: postData });
        }));
      })
    )
  })

}
