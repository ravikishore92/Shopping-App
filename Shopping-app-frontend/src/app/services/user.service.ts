import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shopping } from 'src/environments/environment';
import { User } from '../model/user.model';
import { Customer } from '../model/customer.model';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  url : string = shopping

  
  constructor(private http : HttpClient) { }

  login(user : User){
    return this.http.post(this.url+"auth",user,{responseType :'text'});
  }

  getCustomerDetail(){
    let username = localStorage.getItem("username");
    return this.http.get<Customer>(`${this.url}users/customer?username=${username}`);
  }

}
