import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsRoutingModule } from './posts-routing.module';
import { AddPostsComponent } from './add-posts/add-posts.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { postReducer } from './state/posts.reducer';
import { POST_STATE_NAME } from './state/posts.selector';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './state/posts.effects';
import { DetailsComponent } from './details/details.component';


@NgModule({
  declarations: [
    AddPostsComponent,
    EditPostComponent,
    PostsListComponent,
    DetailsComponent,
  ],
  imports: [
    CommonModule,
    PostsRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature(POST_STATE_NAME, postReducer),
    EffectsModule.forFeature([PostsEffects]),
  ]
})
export class PostsModule { }
