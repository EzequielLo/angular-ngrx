import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private url: string = `https://auth-angular-6fc60-default-rtdb.europe-west1.firebasedatabase.app/posts.json`

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url)
      .pipe(
        map(data => {
          const posts: Post[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(this.url, post)
  }

  updatePost(post: Post) {
    const postData = {
      [post.id!]: { title: post.title, description: post.description },
    }
    return this.http.patch(this.url, postData);
  }

  deletePost(id: string) {
    return this.http.delete(`${this.url}?id=${id}`);
  }

  getPostById(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.url}?id=${id}`);
  }
}
