import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-popup',
  templateUrl: './cart-popup.component.html',
  styleUrls: ['./cart-popup.component.css']
})
export class CartPopupComponent implements OnInit {

  constructor(private router : Router, private dialog : MatDialog) { }
  

  ngOnInit(): void {
  }

  goToCart(){
    this.close();
      this.router.navigate(["customers","cart"])
  }

  close(){
    this.dialog.closeAll();
  }

}
