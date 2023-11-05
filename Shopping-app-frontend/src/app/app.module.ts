import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material/material.module';

import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { CartComponent } from './cart/cart.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { CustomFormDirective } from './custom-form.directive';
import { ProductRegisterComponent } from './product-register/product-register.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './token.interceptor';
import { CartPopupComponent } from './cart-popup/cart-popup.component';
import { OrderPopupComponent } from './order-popup/order-popup.component';
import { OrderCancelPopupComponent } from './order-cancel-popup/order-cancel-popup.component';
import { RemoveCartProductPopupComponent } from './remove-cart-product-popup/remove-cart-product-popup.component';
import { ProductsTableComponent } from './products-table/products-table.component';
import { CustomersTableComponent } from './customers-table/customers-table.component';


@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    CartComponent,
    AdminLoginComponent,
    CustomerRegisterComponent,
    UserLoginComponent,
    OrdersComponent,
    ProductsComponent,
    CustomFormDirective,
    ProductRegisterComponent,
    CartPopupComponent,
    OrderPopupComponent,
    OrderCancelPopupComponent,
    RemoveCartProductPopupComponent,
    ProductsTableComponent,
    CustomersTableComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide : HTTP_INTERCEPTORS, useClass : TokenInterceptor, multi : true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
