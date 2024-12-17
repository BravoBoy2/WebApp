import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatError, MatFormField, MatLabel, MatPrefix, MatSuffix} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatIconModule,
    MatSuffix,
    MatPrefix,
    MatIconButton
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatButton,
    MatLabel,
    MatIconModule,
    MatSuffix,
    MatPrefix,
    MatIconModule,
    MatIconButton

  ]
})
export class AuthModule { }
