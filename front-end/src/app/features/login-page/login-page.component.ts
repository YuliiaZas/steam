import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';
import { LoginService } from './login.service';

@Component({
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']

})
export class LoginPageComponent implements OnInit {
  public loginUserForm!: FormGroup;

  public constructor(
    private readonly loginService: LoginService,
    private readonly authService: AuthService,
    private router: Router,
  ) {
    this.authService.logOutUser();
    console.log('_logOutUser_')
  }

  public ngOnInit(): void {
    this.loginUserForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  public submit(): void {
    this.loginService.loginRequest(this.loginUserForm.value)
      .subscribe(token => {
        this.authService.logInUser(token);
        this.router.navigate(['/games']);
      }, error => {
        alert(error.error.message);
      });
    this.loginUserForm.reset();
  }

}
