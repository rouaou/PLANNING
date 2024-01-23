import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { AuthService, Role } from '@core';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  role = 'Admin';

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  get f() {
    return this.authForm.controls;
  }
  adminSet() {
    this.role = Role.Admin;
  }
  doctorSet() {
    this.role = Role.Doctor;
  }
  patientSet() {
    this.role = Role.Patient;
  }
  secretarySet() {
    this.role = Role.Secretary;
  }
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Login and Password not valid !';
      return;
    }

    this.subs.sink = this.authService
      .login(this.f['login'].value, this.f['password'].value, this.role)
      .subscribe({
        next: (res) => {
          if (res) {
            setTimeout(() => {
              this.loading = false;
              if (this.authService.currentUserValue) {
                switch (this.role) {
                  case Role.Patient:
                    this.router.navigate(['/patient/dashboard']);
                    break;
                  case Role.Admin:
                    this.router.navigate(['/admin/dashboard']);
                    break;
                  case Role.Doctor:
                    this.router.navigate(['/doctor/requests']);
                    break;
                  case Role.Secretary:
                    this.router.navigate(['/secretary/dashboard']);
                    break;
                  default:
                    this.router.navigate(['/authentication/signin']);
                }
              } else {
                this.router.navigate(['/authentication/signin']);

              }

            }, 1000);
          } else {
            this.error = 'Invalid Login';
          }
        },
        error: (error) => {
          this.error = error;
          this.submitted = false;
          this.loading = false;
        },
        complete:()=>{
          this.loading = false;
        }});

  }
}
