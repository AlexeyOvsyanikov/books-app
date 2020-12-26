import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthorDialog } from '../../../../entity/dialog/Author';
import {Store} from '@ngrx/store';
import {IState} from '../../../../store/state';
import {Author} from '../../../../entity/Author';

@Component({
  selector: 'app-update-author',
  templateUrl: './update-author.component.html',
  styleUrls: ['./update-author.component.scss']
})
export class UpdateAuthorComponent implements OnInit {

  authorAuthorForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.pattern('^[^ ][a-zA-Z ]{2,99}[^ ]$') ]),
    lastname: new FormControl('', [Validators.required, Validators.pattern('^[^ ][a-zA-Z ]{2,99}[^ ]$')]),
  });

  author: Author;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: AuthorDialog
  ) {
    this.author = { ...data.author };
  }

  ngOnInit(): void {
  }

  getFirstNameErrorMessage(): string{

    if ( this.authorAuthorForm.controls.firstname.hasError('required')) {
      return 'The firstname shouldn\'t be empty';
    }

    if ( this.authorAuthorForm.controls.firstname.hasError('pattern') ) {
      return 'The firstname should contain only latin characters, has length 2 - 100 , not start and not ends on space';
    }

    return '';

  }

  getLastNameErrorMessage(): string{

    if ( this.authorAuthorForm.controls.lastname.hasError('required')) {
      return 'The lastname shouldn\'t be empty';
    }

    if ( this.authorAuthorForm.controls.lastname.hasError('pattern') ) {
      return 'The lastname should contain only latin characters, has length 2 - 100 , not start and not ends on space';
    }

    return '';

  }
}
