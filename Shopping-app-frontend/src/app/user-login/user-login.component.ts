import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { fromEvent } from 'rxjs';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';
import { throttleTime } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  constructor(private fb : FormBuilder, private auth : AuthService, private router : Router) { }

  loginForm : FormGroup = {} as FormGroup;

  @ViewChild('submit',{static : true}) submitBtn : ElementRef = {} as ElementRef;
  
  ngOnInit(): void {
    
    this.loginForm = this.fb.group({
      username : ['',Validators.required],
      password : ['',Validators.required]
    });

    
  }

  login(){
      this.auth.customerLogin(this.loginForm.value).subscribe(data =>{
        console.log(data);
        localStorage.setItem("username",this.loginForm.value.username);
        localStorage.setItem("token",data);
        this.auth.loggedIn$.next("USER");
        this.router.navigate(["products"]);
      });
  }

}
