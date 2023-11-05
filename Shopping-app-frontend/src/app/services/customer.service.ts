import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shopping } from 'src/environments/environment';
import { Customer } from '../model/customer.model';
import { Product } from '../model/product.model';
import { Order } from '../model/order.model';
import { CartItem } from '../model/cart-item.model';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  url : string = shopping + "customers";
  
  constructor(private http : HttpClient) {

   }
   
  addCustomer(customer : Customer){
    return this.http.post(this.url,customer, {responseType:'text'});
  }

  getCustomer(username : string){
    return this.http.get<Customer>(this.url + `/${username}`);
  }

  getAllCustomers(){
    return this.http.get<Customer[]>(this.url);
  }

  getCustomerOrders(username : string){
    return this.http.get<Order[]>(this.url + `/orders/${username}`);
  }

  addProductToCart(username : string, productId : number){
    return this.http.get(this.url + `/${username}/cart/${productId}`,{responseType : 'text'})
  }

  getCustomerCartItems(username : string){
    return this.http.get<CartItem[]>(this.url + `/cart/${username}`);
  }

  placeOrder(username : string){
    return this.http.get(this.url + `/order/${username}`,{responseType : 'text'});
  }

  removeCartItem(cartItemId : number){
    return this.http.delete(this.url + `/cart/remove/${cartItemId}`,{responseType:'text'});
  }

  cancelOrder(orderId : number){
    return this.http.delete(this.url+`/order/cancel/${orderId}`,{responseType : 'text'});
  }

}
