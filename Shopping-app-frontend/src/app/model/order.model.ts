
import { Customer } from './customer.model';
import { Product } from './product.model';

export interface Order{
    id? : number;
    orderedDate? : Date;
    deliveryDate? : Date;
    price : number;
    customer : Customer;
    product : Product;
}