import { ToastrService } from 'ngx-toastr';
import { FormValidationService } from 'src/app/commonService/form-validation.service';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ToastrService]
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private FormValidationService : FormValidationService
  ) { }
  public registrationForm!: FormGroup;
  public forGetPassword: boolean = false;
  public isOtpVerified: boolean = false;
  public otpForm!: FormGroup;
  private subscription: Subscription[] = [];
  public resendOtp: boolean = false;

  ngOnInit(): void {
    this.buildregisterform();
    this.buildOTPForm();
    this.getActivatedRouteValue();
  }

  public buildregisterform() {
    this.registrationForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }


  public getActivatedRouteValue() {
    this.activatedRoute.queryParamMap.subscribe(params => {
      let value = params.get('forgetPassword');
      if (value == 'true') {
        this.forGetPassword = true;
        this.updateValidation()
        return
      }
      this.forGetPassword = false;
    })
  }


  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')!.value;
    const confirmPassword = form.get('confirmPassword')!.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }


  public  buildOTPForm() {
    this.otpForm = this.formBuilder.group({
      otpOne: ["", Validators.compose([Validators.required])],
      otpTwo: ["", Validators.compose([Validators.required])],
      otpThree: ["", Validators.compose([Validators.required])],
      otpFour: ["", Validators.compose([Validators.required])],
      otpFive: ["", Validators.compose([Validators.required])],
      otpSix: ["", Validators.compose([Validators.required])],
    });
  }
  

  public confirmOtp() {
    const finalOtp = Object.values(this.otpForm.value).join("");
    const otpsub = this.authService.validateEmail(finalOtp).pipe(
      tap(res => {
        console.log(res);
        if (res.status === 'sucess') {
          this.isOtpVerified == true
          return
        }
      }),
    ).subscribe()
    this.isOtpVerified = true
  }


  public registerUser() {
    console.log(this.registrationForm.value)
    const setNewPassword = this.authService.createUser(this.registrationForm.value).pipe(
      tap(res => {
        console.log(res);
      }),
    ).subscribe()
  }


  public getOtp() {
    const payload = {
      email: this.registrationForm.value.email,
    }
    const otpsub = this.authService.validateEmail(payload).pipe(
      tap(res => {
        if (res.status === 'sucess') {
         this.afterotpValidation();
       }
      }),
      // catchError( this.resendOtp == true)
    ).subscribe()
  }


  public updateValidation() {
    this.registrationForm.controls['password'].setValidators(null);
    this.registrationForm.controls['confirmPassword'].setValidators(null);
    this.registrationForm.controls['password'].updateValueAndValidity();
    this.registrationForm.controls['confirmPassword'].updateValueAndValidity();
  }

  public afterotpValidation() { 
    this.registrationForm.controls['password'].setValidators(Validators.required);
    this.registrationForm.controls['confirmPassword'].setValidators(Validators.required);
    this.registrationForm.controls['password'].updateValueAndValidity();
    this.registrationForm.controls['confirmPassword'].updateValueAndValidity();
  }
   
  public submitForm() {
    
  }
}
