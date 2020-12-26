import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

import {Author} from '../../../entity/Author';
import {AuthorService} from '../../../services/author/author.service';

import {Store} from '@ngrx/store';
import {IState} from '../../../store/state';
import {START_ROTATE_SPINNER, STOP_ROTATE_SPINNER} from '../../../store/actions/spinner.actions';

import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatDialog} from '@angular/material/dialog';

import {MatSnackBar} from '@angular/material/snack-bar';
import {forkJoin, of, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

import {ConfirmComponent} from '../../common/dialog/confirm/confirm.component';

import {HttpErrorResponse} from '@angular/common/http';
import {UpdateAuthorComponent} from '../../common/dialog/update-author/update-author.component';

@Component({
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.scss']
})
export class AuthorsComponent implements OnInit {

  addAuthorForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.pattern('^[^ ][a-zA-Z ]{2,99}[^ ]$')]),
    lastname: new FormControl('', [Validators.required, Validators.pattern('^[^ ][a-zA-Z ]{2,99}[^ ]$')]),
  });

  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator | undefined;

  public author = new Author();
  public authors: Author[] = [];
  public dataSource: MatTableDataSource<Author> = new MatTableDataSource<Author>(this.authors);
  public authorsTotal = 0;

  authorsColumns: string[] = ['firstname', 'lastname', 'remove', 'update'];

  public isLoadingAuthors = false;
  private page = 1;
  private itemsPerPage = 5;

  constructor(
    private authorService: AuthorService,
    private snackBar: MatSnackBar,
    private store: Store<IState>,
    private dialog: MatDialog
  ) {
    this.dataSource.data = [];
  }

  ngOnInit(): void {

    this.loadAuthors();

  }

  getFirstNameErrorMessage(): string {

    if (this.addAuthorForm.controls.firstname.hasError('required')) {
      return 'The firstname shouldn\'t be empty';
    }

    if (this.addAuthorForm.controls.firstname.hasError('pattern')) {
      return 'The firstname should contain only latin characters, has length 2 - 100 , not start and not ends on space';
    }

    return '';

  }

  getLastNameErrorMessage(): string {

    if (this.addAuthorForm.controls.lastname.hasError('required')) {
      return 'The lastname shouldn\'t be empty';
    }

    if (this.addAuthorForm.controls.lastname.hasError('pattern')) {
      return 'The lastname should contain only latin characters, has length 2 - 100 , not start and not ends on space';
    }

    return '';

  }

  loadAuthors(page = 1, itemsPerPage = 5): void {

    this.isLoadingAuthors = true;

    forkJoin({
      authors: this.authorService.getAuthors(page, itemsPerPage),
      authorsCount: this.authorService.getAuthorsCount(),
    }).subscribe(
      (result: { authors: Author[], authorsCount: { count: number } }) => {
        this.authors = result.authors;
        this.dataSource.data = this.authors;
        this.authorsTotal = Number(result.authorsCount.count);
      },
      error => {
      },
      () => {
        this.isLoadingAuthors = false;
      }
    );

  }

  addAuthor(): void {

    this.store.dispatch(START_ROTATE_SPINNER());

    this.authorService
      .addAuthor(this.author)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.snackBar.open(`Author wasn\'t Added! Error: ${err.statusText}`, 'Close', {
            duration: 4000,
            panelClass: 'error-snackbar'
          });
          return throwError(err);
        })
      )
      .subscribe(
        author => {
          this.snackBar.open('Author added successfully!', 'Close', {
            duration: 4000,
            panelClass: 'success-snackbar'
          });

        },
        error => {},
        () => {
          this.store.dispatch(STOP_ROTATE_SPINNER());
        }
      );

  }

  getNextAuthors($event: PageEvent): void {

    this.isLoadingAuthors = true;
    this.page = $event.pageIndex + 1;
    this.itemsPerPage = $event.pageSize;

    this.loadAuthors(this.page, this.itemsPerPage);

  }

  removeAuthor(author: Author): void {

    this.dialog.open(ConfirmComponent, {
      data: {
        message: `${author.firstname} ${author.lastname}`
      }
    }).afterClosed()
      .subscribe(result => {

        if (!result) {
          return;
        }

        this.store.dispatch(START_ROTATE_SPINNER());

        this.authorService.deleteAuthor(author.id).pipe(
          catchError((err: HttpErrorResponse) => {
            this.snackBar.open(`Author wasn't be deleted! Error: "${err.statusText}"`, 'Close', {
              duration: 4000,
              panelClass: 'error-snackbar'
            });
            return of(err);
          })
        ).subscribe((response) => {

          this.store.dispatch(STOP_ROTATE_SPINNER());

          if (!response) {
            this.snackBar.open('Author deleted successfully!', 'Close', {
              duration: 4000,
              panelClass: 'success-snackbar'
            });

            this.loadAuthors(this.page, this.itemsPerPage);
          }
        });

      });
  }

  openUpdateAuthorDialog(author: Author): void {
    this.dialog.open(UpdateAuthorComponent, {
      data: {
        author
      }
    })
      .afterClosed()
      .subscribe(result => {

        if (result) {

          this.store.dispatch(START_ROTATE_SPINNER());

          this.authorService.updateAuthor(result)
            .pipe(
              catchError((err: HttpErrorResponse) => {
                this.snackBar.open(`Author wasn\'t updated! Error: ${err.statusText}`, 'Close', {
                  duration: 4000,
                  panelClass: 'error-snackbar'
                });
                return throwError(err);
              })
            )
            .subscribe((updatedAuthor: Author) => {
                author.firstname = updatedAuthor.firstname;
                author.lastname = updatedAuthor.lastname;
              },
              error => {
              },
              () => {
                this.store.dispatch(STOP_ROTATE_SPINNER());
                this.snackBar.open('Author updated!', 'Close', {
                  duration: 4000,
                  panelClass: 'success-snackbar'
                });
              });
        }
      });
  }
}
