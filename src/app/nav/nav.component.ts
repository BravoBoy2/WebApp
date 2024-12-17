import {Component, Inject, inject, PLATFORM_ID} from '@angular/core';
import {MatMenu, MatMenuItem, MatMenuTrigger} from '@angular/material/menu';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {MatButton} from '@angular/material/button';
import {StorageService} from '../shared/storage.service';
import {isPlatformBrowser} from '@angular/common';

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
  storageService = inject(StorageService);
  isUserLoggedIn: boolean;
  isAdminLoggedIn: boolean;
  isBrowser: boolean;

  constructor(private router : Router, @Inject(PLATFORM_ID) private platformId : Object) {
    this.isUserLoggedIn = false;
    this.isAdminLoggedIn = false;
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if(this.isBrowser) {
      this.isUserLoggedIn = this.storageService.isUser();
      this.isAdminLoggedIn = this.storageService.isAdmin();
      this.storageService.removeUser();
      // this.router.navigateByUrl('/login');
    }
  }
}
