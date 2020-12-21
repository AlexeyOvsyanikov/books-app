import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {UserService} from "../../services/user.service";
import {User} from "../../entity/User";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public email: FormControl;
  public hide = true;
  public user = new User();

  constructor(
    private userService: UserService
  ) {
    this.email = new FormControl('', [Validators.required, Validators.email]);
  }

  ngOnInit(): void {
  }

  getErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  signUp(){

  }

}
