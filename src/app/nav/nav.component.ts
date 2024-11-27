import { Component } from '@angular/core';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-nav',
  imports: [
    MatMenu, MatMenuTrigger, MatIcon, MatToolbar, RouterLink,
    RouterLinkActive, MatMenuItem, MatButton
  ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {

}
