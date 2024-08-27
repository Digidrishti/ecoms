import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { CommonConstants } from 'src/app/common/constant/common-constant';
import { FormValidationService } from 'src/app/commonService/form-validation.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    public formValidator: FormValidationService,
    
  ) { }
  public loginForm!: FormGroup;

  ngOnInit(): void {
    this.buildForm();
  }

  submitForm() {
    const setNewPassword = this.authService.login(this.loginForm.value).pipe(
      tap(res => {
        if (res && res.token) {
          localStorage.setItem('authToken', res.token)
        }
      }),
    ).subscribe()

  }

  public buildForm() {
    this.loginForm = this.formBuilder.group({
      email: ["", Validators.compose([Validators.required, Validators.pattern(CommonConstants.REGEX_PATTERN.emailPattern),])],
      password: ["", Validators.compose([Validators.required])],
    });
  }

  public navigateToforgetPassword() {
    this.router.navigateByUrl('/auth/register?forgetPassword=true');
  }

}