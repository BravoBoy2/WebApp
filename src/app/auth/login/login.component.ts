import {Component, inject} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatError, MatFormField, MatLabel} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {MatCardTitle} from '@angular/material/card';
import {AuthService} from '../auth.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../dialog/dialog.component';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatLabel,
    MatInput,
    MatError,
    MatButton,
    MatCardTitle,
    MatFormField
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder)
  dialog = inject(MatDialog);

LoginForm = this.formBuilder.group({
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]]
})

  constructor(private authService: AuthService) {}

  onSubmit(){
    // this.isSubmitted = true;

    if(this.LoginForm.valid){

      this.authService.fetchData('login', this.LoginForm.value).subscribe({
        next: (response: any) => {
          // console.log(response);
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Success',
              message : 'Registration Successful'
            }
          });

          this.LoginForm.reset();

        },
        error: (error : any) => {
          // console.log('Registration failed', error);
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Error',
              message : error.error.message
            }
          })
        }
      })
    }
  }

}
