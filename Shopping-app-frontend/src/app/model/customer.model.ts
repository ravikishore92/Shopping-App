import { Order } from "./order.model";
export interface Customer{

    id? : number;
    name : string;
    username : string;
    contact : string;
    email : string;
    address : string;
    orders? : Order[];
}