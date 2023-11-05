import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer-register',
  templateUrl: './customer-register.component.html',
  styleUrls: ['./customer-register.component.css']
})
export class CustomerRegisterComponent implements OnInit {

  constructor(private fb : FormBuilder, private customerService : CustomerService, private router : Router) { }

  customerForm : FormGroup = {} as FormGroup;

  ngOnInit(): void {
    this.customerForm = this.fb.group({
        name : ['',Validators.required],
        username : ['',Validators.required],
        password : ['',Validators.required],
        contact : ['',Validators.required],
        email : ['',Validators.required],
        address : ['',Validators.required]
    })
  }

  submit(){
    localStorage.clear();
    this.customerService.addCustomer(this.customerForm.value).subscribe(data=>{
        this.router.navigate(["customers","login"]);
    })
  }

}
