import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { shopping } from 'src/environments/environment';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) { }

  loggedIn$ : BehaviorSubject<string> = new BehaviorSubject<string>("LOGOUT");

  url : string = shopping;

  adminLogin(user : User){
    return this.http.post(this.url + "admins/login",user,{responseType :'text'});
  }

  customerLogin(user : User){
    return this.http.post(this.url + "customers/login",user,{responseType :'text'});
  }

}
