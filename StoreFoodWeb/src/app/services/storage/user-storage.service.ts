import { Injectable } from '@angular/core';
const TOKEN = 'store_food-token';
const USER = 'store_food-user';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  

  constructor() { }

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);

  }

  public saveUser(user):void{
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): string  {
    return localStorage.getItem(TOKEN);
  }
  static getUser(): any {
    return JSON.parse(localStorage.getItem(USER));

  }

  static getUserId():number {
    const user = this.getUser();
    if(user == null || user.userId == null){
      return 0;
    }
    return user.userId;

  }

  static getUserRole(): string {
    const user = this.getUser();
    if(user == null){
      return '';
    }
    return user.role;
  }


  static isAdminLoggedIn(): boolean {
    if(this.getToken === null){
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'ADMIN';
  }
  static isCustomerLoggedIn(): boolean {
    if(this.getToken === null){
      return false;
    }
    const role: string = this.getUserRole();
    return role == 'CUSTOMER';
  }

  static signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);

  }







}


