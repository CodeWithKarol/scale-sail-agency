import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BlogPost } from '../../pages/blog/blog.model';

@Injectable({ providedIn: 'root' })
export class BlogService {
  private http = inject(HttpClient);
  private postsUrl = '/content/blog/posts.json';

  getPosts(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.postsUrl);
  }

  getPostBySlug(slug: string): Observable<BlogPost | undefined> {
    return this.getPosts().pipe(map((posts) => posts.find((p) => p.slug === slug)));
  }

  getPostContent(path: string): Observable<string> {
    const fullPath = path.startsWith('/') ? path : `/${path}`;
    return this.http.get(fullPath, { responseType: 'text' });
  }
}
