import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-order-popup',
  templateUrl: './order-popup.component.html',
  styleUrls: ['./order-popup.component.css']
})
export class OrderPopupComponent implements OnInit {

  constructor(private dialogRef : MatDialogRef<OrderPopupComponent>, private customerService : CustomerService) { }

  ngOnInit(): void {
  }

  placeTheOrder(){
     this.dialogRef.close("PLACE_ORDER");
  }

  cancel(){
    this.dialogRef.close("CLOSE");
  }

}
