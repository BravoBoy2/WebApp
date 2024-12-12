import {Component, inject} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from "@angular/forms";
import {AuthService} from '../auth.service';
import {MatDialog} from '@angular/material/dialog';
import {HttpResponse} from '@angular/common/http';
import {AuthModule} from '../auth.module';
import {DialogComponent} from '../../dialog/dialog.component';

@Component({
  selector: 'app-register',
    imports: [
      AuthModule
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  private formBuilder = inject(FormBuilder); //making the form
  dialog = inject(MatDialog);

  passwordMatchValidator : Validators = (control: AbstractControl): null => {
    const password = control.get('password');
    const passwordConfirmation = control.get('password_confirmation');
    if(password && passwordConfirmation && password.value != passwordConfirmation.value){
      passwordConfirmation.setErrors({notSame: true});
    }

    return null;
  }
  registerForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirmation: ['', Validators.required]
  }, {validators : this.passwordMatchValidator})


  constructor(private authService: AuthService) {}

  onSubmit(){
    // this.isSubmitted = true;

    if(this.registerForm.valid){

      this.authService.fetchData('register', this.registerForm.value).subscribe({
        next: (response: HttpResponse<any>) => {
          // console.log(response);
          this.dialog.open(DialogComponent, {
            data: {
              title: 'Success' + response.statusText,
              message : 'Registration Successful'
            }
          });

          this.registerForm.reset();

        },
        error: (error : any) => {
          // console.log('Registration failed', error);
          this.openDialog("Error", error.error.message);
        }
      })
    }
  }

  openDialog(title: string, message: string){
    this.dialog.open(DialogComponent, {
      data: {
        title: title,
        message: message
      }
    })
  }

  hasDisplableError(ControlName:string) : boolean {
    const control = this.registerForm.get(ControlName);
    return Boolean(control?.invalid) && Boolean(control?.touched);
  }

}
