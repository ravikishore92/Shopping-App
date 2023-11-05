import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-order-cancel-popup',
  templateUrl: './order-cancel-popup.component.html',
  styleUrls: ['./order-cancel-popup.component.css']
})
export class OrderCancelPopupComponent implements OnInit {

  constructor(private dialogRef : MatDialogRef<OrderCancelPopupComponent>) { }

  ngOnInit(): void {
  }

  cancelTheOrder(){
    this.dialogRef.close("CANCEL");
  }

  close(){
    this.dialogRef.close("NO");
  }
}
