import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Order } from '../model/order.model';
import { CustomerService } from '../services/customer.service';
import { OrderCancelPopupComponent } from '../order-cancel-popup/order-cancel-popup.component';
import { MatTable } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  constructor(private customerService : CustomerService,
        private dialog : MatDialog,
        private snackBar : MatSnackBar) { }

  @ViewChild(MatTable) table : MatTable<any> =  {} as MatTable<any>;

  displayedColumns : string[] = ["id","name","features","orderedDate","deliveryDate","price","cancel"];

  orders : Order[] = [];
  ngOnInit(): void {
    let username = localStorage.getItem("username") as string;
    this.customerService.getCustomerOrders(username).subscribe(data=>{
        this.orders = data;
    })
  }

  cancelTheOrder(row : Order){
    let dialogRef = this.dialog.open(OrderCancelPopupComponent);
    dialogRef.afterClosed().subscribe(data=>{
      if(data === 'CANCEL'){
        let id = row.id as number;

        this.customerService.cancelOrder(id).subscribe(data=>{
          this.orders = this.orders.filter(order=>order.id!=id);
          this.table.renderRows();
          this.snackBar.open("Order Cancelled successfully","Ok",{duration : 3000});
        });
      }
    })
  }


  
}
