import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BookService} from '../../../services/book/book.service';
import {Book} from '../../../entity/Book';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {forkJoin, merge, Observable, of} from 'rxjs';
import {
  catchError,
  debounceTime, retry,
  switchMap,
  tap
} from 'rxjs/operators';
import {Author} from '../../../entity/Author';
import {AuthorService} from '../../../services/author/author.service';
import {MatAutocomplete, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Store} from '@ngrx/store';
import {IState} from '../../../store/state';
import {START_ROTATE_SPINNER, STOP_ROTATE_SPINNER} from '../../../store/actions/spinner.actions';

interface BookUploadPayload{
  file: File | null;
  book: Book;
}

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit , AfterViewInit{

  @ViewChild('bookImage') bookImage!: ElementRef;
  @ViewChild('authorSearchString') authorSearchString!: ElementRef;
  @ViewChild('auto') matAutocomplete!: MatAutocomplete;

  addBookGroup = new FormGroup({

    bookTitle: new FormControl('', [Validators.required , Validators.pattern('^[^ ][a-zA-Z 0-9]{1,149}[^ ]$')]),
    bookDescription: new FormControl('', [Validators.required , Validators.maxLength(2000)]),
    bookYear: new FormControl(''),

  });

  public bookAuthorFormControl = new FormControl('');

  public book: Book = {
    title: 'First book',
    description: 'Book Description',
    image: '',
    year: 1866
  };
  public authors: Author[] = [];
  public filteredAuthors: Author[] = [];

  public bookAuthors: Author[] = [];
  public books: Book[] = [];

  public isLoadingBooksAndAuthors = true;
  public fileName = '';

  private page = 1;
  private itemsPerPage = 5;
  private searchString = '';

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private store: Store<IState>,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    forkJoin({
      books: this.bookService.getBooks(this.page , this.itemsPerPage),
      authors: this.authorService.getAuthors(this.page , this.itemsPerPage)
    }).subscribe((result: {books: Book[] , authors: Author[]}) => {

      this.isLoadingBooksAndAuthors = false;
      this.authors = result.authors;
      this.books = result.books;
      this.filteredAuthors = this.authors;

    });
  }

  ngAfterViewInit(): void {

    this.bookAuthorFormControl.valueChanges
        .pipe(
          debounceTime(400),
          tap( searchString => {
            if (typeof searchString === 'string'){
              this.searchString = searchString.trim().toLowerCase();
            } else {
              this.addBookAuthor(Number(searchString));
              throw new Error('An error has occurred');
            }
          }),
          retry(Number.MAX_VALUE),
          switchMap(
            _ => {
              return of(this.authors
                .filter(
                  a => a.firstName.toLowerCase().indexOf(this.searchString) !== -1 ||
                       a.lastName.toLowerCase().indexOf(this.searchString) !== -1
                )
              );
            }
          ),
          switchMap( (authors: Author[]): Observable<Author[]> => {
            if ( authors.length >= this.itemsPerPage ){
              return of(authors);
            }

            return merge<Author[]>(
              of(authors) ,
              this.authorService.searchAuthors( this.searchString , authors.map( a => a.id ) )
            );
          })
        )
        .subscribe( (result: Author[]) => {
          this.filteredAuthors = result;
        } );
  }

  getTitleErrorMessage(): string {

    if (this.addBookGroup.controls.bookTitle.hasError('required')) {
      return 'The book title shouldn\'t be empty';
    }

    if (this.addBookGroup.controls.bookTitle.hasError('pattern')) {
      return 'The book title should contain only latin characters, digits ,  not start and not ends on space and has length 2 - 150';
    }

    return '';
  }

  getDescriptionErrorMessage(): string {
    if (this.addBookGroup.controls.bookDescription.hasError('required')) {
      return 'The book description shouldn\'t be empty';
    }

    if (this.addBookGroup.controls.bookDescription.hasError('maxLength')) {
      return 'The book description should has length 2 - 2000';
    }

    return '';
  }

  chooseFile(): void {
    this.bookImage.nativeElement.click();
  }

  addBookAuthor(authorId: number): void{

    const checkAuthor = this.bookAuthors.find( a => a.id === authorId );

    if (checkAuthor){
      return;
    }

    const author = this.authors.find(a => a.id === authorId ) || this.filteredAuthors.find(a => a.id === authorId );

    if (author){
      this.bookAuthors.push(author);
    }

  }

  authorSelected(event: MatAutocompleteSelectedEvent): void {
    this.addBookAuthor(event.option.value);
  }

  removeBookAuthor(author: Author): void {
    const authorIndex = this.bookAuthors.findIndex( a => a.id === author.id );
    this.bookAuthors.splice(authorIndex, 1);
  }

  addBook(): void{
    this.book.authors = this.bookAuthors;
    this.store.dispatch(START_ROTATE_SPINNER());

    this.bookService.addBook(this.book)
        .pipe(
          switchMap( (book: Book) => {
            if (this.bookImage.nativeElement.files){

              const file: File = this.bookImage.nativeElement.files[0];
              return of({
                file,
                book
              });
            }
            return of({
              file: null,
              book
            });
          } ),
          switchMap( (payload: BookUploadPayload) => {
            if (payload.file){
              return this.bookService.uploadBookImage(payload.book , payload.file);
            }
            return of(payload.book);
          }),
          catchError( error => {
            this.store.dispatch(STOP_ROTATE_SPINNER());
            this.isLoadingBooksAndAuthors = false;
            return of(error);
          } )
        ).subscribe( (response) => {
            console.log('response:' , response);
            if (response.book){
              this.books.push(response.book);
            }

            this.store.dispatch(STOP_ROTATE_SPINNER());
        });

  }

  bookImageChanged(): void {
    if (this.bookImage.nativeElement.files && this.bookImage.nativeElement.files.length > 0){
      this.fileName = this.bookImage.nativeElement.files[0].name;
    }
  }
}
