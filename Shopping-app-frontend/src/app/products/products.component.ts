import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Product } from '../model/product.model';
import { AuthService } from '../services/auth.service';
import { CustomerService } from '../services/customer.service';
import { ProductService } from '../services/product.service';
import { FormControl } from '@angular/forms';
import { CartPopupComponent } from '../cart-popup/cart-popup.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor(private productService : ProductService
    ,private authService : AuthService
    ,private customerService : CustomerService
    ,private dialog : MatDialog
    ,private router : Router) { }

  query : FormControl = new FormControl('');
  products : Product[] = [];
  ngOnInit(): void {
      this.productService.getAllProducts().subscribe(data=>{
        console.log(data);
        this.products = data;
      })
  }



  add(id : number | undefined){
    let loggedIn : string = "LOGOUT";
    this.authService.loggedIn$.subscribe(data => loggedIn = data);
    if(loggedIn !== "USER"){
      this.router.navigate(["customers","login"]);
      return;
    }
    let username = localStorage.getItem("username") as string ;
    let productId = id as number;
    this.customerService.addProductToCart(username,productId).subscribe(data =>{
        this.dialog.open(CartPopupComponent);
    })
    
  }

  searchProducts(){
    this.productService.searchProducts(this.query.value).subscribe(data=>{
      this.products = data;
    })
  }

}
