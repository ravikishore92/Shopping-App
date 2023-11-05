import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-register',
  templateUrl: './product-register.component.html',
  styleUrls: ['./product-register.component.css']
})
export class ProductRegisterComponent implements OnInit {

  constructor(private fb : FormBuilder,private productService : ProductService) { }

  productForm : FormGroup = {} as FormGroup;
  ngOnInit(): void {
    this.productForm = this.fb.group({
      name : ['',Validators.required],
      features : ['',Validators.required],
      count : ['',Validators.required],
      price : ['',Validators.required],
      type : ['',Validators.required]
    })
  }

  submit(){
    console.log(this.productForm.value);
    this.productService.addProduct(this.productForm.value).subscribe(data=>{
      console.log(data);
    })
  }

}
