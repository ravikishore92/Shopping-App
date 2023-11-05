import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-app';

  loggedIn : boolean = false;

  navs = [
    {name : 'Products', url : "products"},
    {name : 'Sign up', url : "customers/signup"},
    {name : 'user login', url : "customers/login"},
    {name : 'admin login', url : "admins/login"}
  ];

  adminNavs = [
    { name : 'Products', url: "admins/products"},
    { name : 'Customers', url : "admins/customers"}
  ]

  userNavs = [
    { name : 'products', url : "products"},
    { name : 'cart', url : "customers/cart"},
    { name : 'orders', url : "/customers/orders"},
    { name : 'profile' , url : "/customers/profile"}
  ]

  navs$ : BehaviorSubject<{name : string,url : string }[]> = new BehaviorSubject(this.navs);

  constructor(private auth : AuthService, private router : Router){

    this.auth.loggedIn$.subscribe(data =>{
      if(data === "USER"){
        this.navs$.next(this.userNavs);
        this.loggedIn = true;
      }
      else if(data === "ADMIN"){
        this.navs$.next(this.adminNavs);
        this.loggedIn = true;
      }
      else{
        this.navs$.next(this.navs); 
      }
    })
  }



  logout(){
    localStorage.clear();
    this.auth.loggedIn$.next("LOGOUT");
    this.loggedIn = false;
    this.router.navigate(["customers","login"]);
  }
}





