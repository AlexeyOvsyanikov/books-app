import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../../../../entity/Book';
import {ApiRoutes} from '../../../../constants/ApiRoutes';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  @Input('book') book!: Book;

  public imagePath = ApiRoutes.host;

  constructor() { }

  ngOnInit(): void {
  }

}
