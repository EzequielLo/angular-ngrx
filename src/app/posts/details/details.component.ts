import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/models/post';
import { AppState } from 'src/app/store/app.state';
import { getPostById } from '../state/posts.selector';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  post!: Observable<Post | null | undefined>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.post = this.store.select(getPostById);
  }

}
