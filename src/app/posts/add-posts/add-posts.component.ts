import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/models/post';
import { AppState } from 'src/app/store/app.state';
import { addPost, } from '../state/posts.actions';

@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.css']
})

export class AddPostsComponent implements OnInit {
  postForm!: FormGroup;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onAddPost() {
    if (this.postForm.invalid) {
      return;
    }
    const post: Post = {
      title: this.postForm.get("title")?.value,
      description: this.postForm.get("description")?.value,
    };
    this.store.dispatch(addPost({ post }));
  }
}
