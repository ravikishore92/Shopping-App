import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {

  loginForm  = this.formBuilder.group({
    username : ['', Validators.required],
    password : ['',Validators.required]
  })
  constructor(private formBuilder : FormBuilder,
     private auth : AuthService,
     private router : Router ) { }

  ngOnInit(): void {
  }


  login(){
    // this.auth.adminLogin(this.loginForm.value).subscribe(data=>{
    //   this.auth.loggedIn$.next("ADMIN");
    //   this.router.navigate(["admins","products"]);
    //});
  }

}
