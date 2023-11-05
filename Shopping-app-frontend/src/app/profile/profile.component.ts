import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../model/customer.model';
import { AuthService } from '../services/auth.service';
import { CustomerService } from '../services/customer.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private customerService : CustomerService,
            private router : Router,
            private auth : AuthService) { }

  customer : Customer = {} as Customer;

  cust : Customer = { name:"Ram Kumar Reddy", username : "ramkumarreddy92", contact : "7093964214", email : "ram@gmail.com", address : "Kadapa"}
  ngOnInit(): void {
      let username  = localStorage.getItem("username") as string;
      this.customerService.getCustomer(username).subscribe((customer:Customer)=>{
        this.cust = customer;
      })
  }

  logout(){
    localStorage.clear();
    this.auth.loggedIn$.next("LOGOUT");
    this.router.navigate(["products"])
  }

}
