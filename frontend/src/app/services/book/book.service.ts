import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {ApiRoutes} from '../../constants/ApiRoutes';
import {Book} from '../../entity/Book';
import {Author} from '../../entity/Author';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private fileSubject: Subject<any> = new Subject<any>();

  constructor(
    private http: HttpClient
  ) { }

  addBook(book: Book): Observable<Book>{

    if (book.authors){
      book.authors = (book.authors as Author[]).map((author: Author) => {
        return `/${ApiRoutes.prefix}${ApiRoutes.authors}/${author.id}`;
      });
    }

    return this.http.post(
      `${ApiRoutes.host}${ApiRoutes.prefix}${ApiRoutes.books}`,
      book
    ) as Observable<Book>;

  }

  getBooks(page = 1 , itemsPerPage = 5): Observable<Book[]> {

    const params = new HttpParams()
      .append('page', String(page))
      .append('itemsPerPage' , String(itemsPerPage));

    return this.http.get(`${ApiRoutes.host}${ApiRoutes.prefix}${ApiRoutes.books}`, { params }) as Observable<Book[]>;
  }

  uploadBookImage(book: Book , file: File): Observable<any>{

      console.log('uploadBookImage.book: ' , book);

      const reader  = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {

        const fileFormData = new FormData();
        fileFormData.append( 'book_id' , String(book.id) );
        fileFormData.append( 'image' , String(reader.result) );
        fileFormData.append( 'image_name' , file.name );

        this.http.post(
          `${ApiRoutes.host}${ApiRoutes.prefix}${ApiRoutes.books}/${ApiRoutes.upload}`,
          fileFormData
        ).subscribe( response => {
          this.fileSubject.next(response);
        } );
      };

      return this.fileSubject.asObservable();
  }

  updateBook(book: Book): Observable<Book>{
    return this.http.patch(
      `${ApiRoutes.host}${ApiRoutes.prefix}${ApiRoutes.books}/${book.id}`,
      book
    ) as Observable<Book>;
  }

}
