import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post';
import { AppState } from 'src/app/store/app.state';
import { updatePost } from '../state/posts.actions';
import { getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})

export class EditPostComponent implements OnInit, OnDestroy {
  sub!: Subscription;
  post!: Post | null | undefined;
  postForm!: FormGroup;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.sub = this.store.select(getPostById).subscribe(post => {
      if (post) {
        this.post = post;
        this.postForm.patchValue({
          title: post.title,
          description: post.description
        })
      }
    });
<<<<<<< HEAD
=======

>>>>>>> b1ca0f8c6869847c693f53dac63e57f2da673545
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onSubmit() {
    if (this.postForm.invalid) {
      return;
    }
    const title = this.postForm.get('title')!.value;
    const description = this.postForm.get('description')!.value;
    const post: Post = {
      id: this.post!.id,
      title,
      description
    }
    this.store.dispatch(updatePost({ post }));
    this.router.navigate(['posts']);

  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
