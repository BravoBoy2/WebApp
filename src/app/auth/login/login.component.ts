import {Component, inject, signal} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../dialog/dialog.component';
import {AuthModule} from '../auth.module';
import {HttpResponse} from '@angular/common/http';
import {RouterLink} from '@angular/router';
import {StorageService} from '../../shared/storage.service';

@Component({
  selector: 'app-login',
  imports: [AuthModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private formBuilder = inject(FormBuilder)
  dialog = inject(MatDialog);
  hide = signal(true);
  storageService = inject(StorageService);

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
          console.log(response);
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Success ' + response,
              message : 'Welcome back!'
            }
          });

          const user= {
            id : response.id,
            name : response.name,
            email : response.email,
            role : response.role,
          }
          this.storageService.setUser(user);
          this.LoginForm.reset();

        },
        error: (error : HttpResponse<any>) => {
          console.log('Registration failed', error);
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Error',
              message : error.statusText + "!" + "Username or password is incorrect",
            }
          })
        }
      })
    }
  }

  clickEvent(event : MouseEvent){
  this.hide.set(!this.hide());
  event.stopPropagation();
  }

}
