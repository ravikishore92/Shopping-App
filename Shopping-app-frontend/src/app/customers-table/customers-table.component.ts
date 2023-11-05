import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from '../model/customer.model';
import { CustomerService } from '../services/customer.service';
@Component({
  selector: 'app-customers-table',
  templateUrl: './customers-table.component.html',
  styleUrls: ['./customers-table.component.css']
})
export class CustomersTableComponent implements OnInit {

  constructor(private customerService : CustomerService, private router : Router) { }

  customers : Customer[] = [];
  displayedColumns : string[] = ["id","name","username","contact","email","address"];
  ngOnInit(): void {
    this.customerService.getAllCustomers().subscribe(data=>{
      this.customers = data;
    })
  }

  addCustomer(){
    this.router.navigate(["customers","signup"]);
  }

}
