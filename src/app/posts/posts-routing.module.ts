import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostsComponent } from './add-posts/add-posts.component';
import { DetailsComponent } from './details/details.component';
import { EditPostComponent } from './edit-post/edit-post.component';
import { PostsListComponent } from './posts-list/posts-list.component';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    children: [
      {
        path: 'add',
        component: AddPostsComponent
      },
      {
        path: 'edit/:id',
        component: EditPostComponent
      },
      {
        path: 'details/:id',
        component: DetailsComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostsRoutingModule { }
