import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {UserModel} from './user/user-model';
import {UserRole} from './user/user-role';
import {isPlatformBrowser} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
private readonly storageKey = "currentUser";
isBrowser : boolean;
  constructor(@Inject(PLATFORM_ID) private platformId : Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

   setUser(user: UserModel): void {
    if(this.isBrowser)
   try {
     localStorage.setItem("currentUser", JSON.stringify(user));
   } catch (error) {
     console.error("Error saving user data",error);
   }

  }

  getUser() : UserModel | null {
    if (this.isBrowser) {
      const userString = localStorage.getItem(this.storageKey);
      if (userString) {
        try {
          return JSON.parse(userString);
        } catch (error) {
          console.error("Error parsing user data", error);
          this.removeUser();
          return null;
        }
      }
    }
    return null;
  }

  getUserId(): number | null {
    const user = this.getUser();
    return user ? user.id : null;
  }

  getUserRole(): UserRole | null {
    const user = this.getUser();
    return user ? user.role : null;
  }

  // getToken(): string | null {
  //   const user = this.getUser();
  //   return user ? user.token : null;
  // }

  removeUser(): void {
    localStorage.removeItem(this.storageKey);
  }

  isAdmin(): boolean {
    return this.getUserRole() === UserRole.ADMIN;
  }

  isUser(): boolean {
    return this.getUserRole() === UserRole.USER;
  }


}
