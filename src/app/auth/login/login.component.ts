import {Component, inject} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../dialog/dialog.component';
import {AuthModule} from '../auth.module';

@Component({
  selector: 'app-login',
  imports: [AuthModule],
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
