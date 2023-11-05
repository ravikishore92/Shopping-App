import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-remove-cart-product-popup',
  templateUrl: './remove-cart-product-popup.component.html',
  styleUrls: ['./remove-cart-product-popup.component.css']
})
export class RemoveCartProductPopupComponent implements OnInit {

  constructor(private dialogRef : MatDialogRef<RemoveCartProductPopupComponent>) { }

  ngOnInit(): void {

  }
  remove(){
    this.dialogRef.close("REMOVE");
  }
  close(){
    this.dialogRef.close("CANCEL");
  }

}
