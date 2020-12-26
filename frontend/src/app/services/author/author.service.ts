import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Author } from '../../entity/Author';
import { Count } from '../../entity/Count';
import { Observable } from 'rxjs';
import { ApiRoutes } from '../../constants/ApiRoutes';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(
    private http: HttpClient
  ) { }

  getAuthors(page = 1 , itemsPerPage = 5): Observable<Author[]> {

    const params = new HttpParams()
      .append('page', String(page))
      .append('itemsPerPage' , String(itemsPerPage));

    return this.http.get(`${ApiRoutes.host}${ApiRoutes.prefix}${ApiRoutes.authors}`, { params }) as Observable<Author[]>;
  }

  getAuthorsCount(): Observable<Count>{
    return this.http
      .get(`${ApiRoutes.host}${ApiRoutes.prefix}${ApiRoutes.authors}/${ApiRoutes.authorsCount}`) as Observable<Count>;
  }

  addAuthor(author: Author): Observable<Author>{
    return this.http.post(`${ApiRoutes.host}${ApiRoutes.prefix}${ApiRoutes.authors}`, {
      firstname: author.firstname,
      lastname: author.lastname
    }) as Observable<Author>;
  }

  deleteAuthor(id: number): Observable<any>{
    return this.http.delete(`${ApiRoutes.host}${ApiRoutes.prefix}${ApiRoutes.authors}/${id}`);
  }

  updateAuthor(author: Author): Observable<Author>{
      return this.http.patch(
        `${ApiRoutes.host}${ApiRoutes.prefix}${ApiRoutes.authors}/${author.id}`,
        {
          firstname: author.firstname,
          lastname: author.lastname
        }
      ) as Observable<Author>;
  }

}
