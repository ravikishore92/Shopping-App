import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { shopping } from 'src/environments/environment';

import { Order } from '../model/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  url : string = shopping + "orders";
  constructor(private http : HttpClient) { }

  getOrder(id : number ){
    this.http.get<Order>(this.url+`/${id}`);
  }

  getAllOrders(){
    this.http.get<Order[]>(this.url);
  }

}
