import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerRegisterComponent} from './customer-register/customer-register.component';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ProductRegisterComponent } from './product-register/product-register.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { CustomersTableComponent } from './customers-table/customers-table.component';


const routes: Routes = [
  { path : 'customers/signup', component : CustomerRegisterComponent },
  { path : 'customers/login', component : UserLoginComponent },
  { path : 'customers/cart', component : CartComponent},
  { path : 'customers/profile', component : ProfileComponent},
  { path : 'customers/orders', component: OrdersComponent},

  { path : 'admins/login', component: AdminLoginComponent},
  { path : 'admins/products', component : ProductsTableComponent},
  { path : 'admins/customers', component : CustomersTableComponent},


  { path : 'products/register', component : ProductRegisterComponent},
  { path : 'products', component: ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
