import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../model/product.model';
import { shopping } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url : string = shopping + "products";
  constructor(private http : HttpClient) { }

  searchProducts(query : string){
   
    return this.http.get<Product[]>(this.url+`/search?query=${query}`);
  }
  getAllProducts(){
    return this.http.get<Product[]>(this.url);
  }
  getProduct(id : number){
    return this.http.get<Product>(this.url + `/${id}`);
  }
  addProduct(product : Product){
    return this.http.post<Product>(this.url,product);
  }

}
