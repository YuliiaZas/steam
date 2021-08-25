import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { error } from 'console';
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
    console.log('logOutUser')
  }

  public ngOnInit(): void {
    this.loginUserForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  public submit() {
    this.loginService.login(this.loginUserForm.value)
    .subscribe(loginData => {
      console.log('-----', loginData)
      if (loginData.error) {
        console.log(loginData.error);
      } else {
      // if (loginData.error) {
        console.log('this.loginService.login(this.loginUserForm.value).subscribe', loginData.token)
        this.router.navigate(['/profile']);
      }
    })
    // .subscribe(
    //   res => {
    //   },
    //   err => {
    //     console.log(err);
    //   }
    // );
    this.loginUserForm.reset();
  }

}
