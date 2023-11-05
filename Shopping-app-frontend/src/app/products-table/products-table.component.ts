
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../model/product.model';

import { ProductService }  from '../services/product.service';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css']
})
export class ProductsTableComponent implements OnInit {

  constructor(private productsService : ProductService, private router : Router) { }

  products : Product[] = [];

  displayedColumns : string[] = ["id","name","type","features","price","count"];
  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(data=>{
      this.products = data;
    })
  }

  addProduct(){
    this.router.navigate(["products","register"]);
  }

}
