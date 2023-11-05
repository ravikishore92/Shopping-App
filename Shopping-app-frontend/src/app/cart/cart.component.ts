import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { CartItem } from '../model/cart-item.model';
import { RemoveCartProductPopupComponent } from '../remove-cart-product-popup/remove-cart-product-popup.component';

import { OrderPopupComponent } from '../order-popup/order-popup.component';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private customerService : CustomerService,private dialog : MatDialog) {

   }

   @ViewChild(MatTable) table: MatTable<any> = {} as MatTable<any>;
  cartItems : CartItem[] = [];

  count : number = 0;
  totalAmount : number = 0;
    displayedColumns : string[] = ["id","productId","name","features","price","count","remove"];
  ngOnInit(): void {
      let username = localStorage.getItem("username") as string;
      this.customerService.getCustomerCartItems(username).subscribe(data=>{
        this.cartItems = data;
        this.count = this.cartItems.length;
        this.totalAmount = this.cartItems.map(item=>item.product).map(p=>p.price).reduce((acc,price)=>acc+price,0);

      })
  }

  remove(row :CartItem){
    
    let dialogRef = this.dialog.open(RemoveCartProductPopupComponent);
    dialogRef.afterClosed().subscribe(data=>{
      if(data === "REMOVE"){
        this.customerService.removeCartItem(row.id).subscribe(data=>{
          this.cartItems = this.cartItems.filter(d => d.id !=row.id);
          this.table.renderRows();
        })
      }
    })
    
  }

  placeTheOrder(){
    let dialogRef = this.dialog.open(OrderPopupComponent);

    dialogRef.afterClosed().subscribe(action=>{
      if(action === "PLACE_ORDER"){
        let username = localStorage.getItem("username") as string;
        this.customerService.placeOrder(username).subscribe(data=>{
          this.cartItems = [];
          this.count = 0;
          this.totalAmount = 0;
          this.table.renderRows();
        });
      }
    })

  }



}
