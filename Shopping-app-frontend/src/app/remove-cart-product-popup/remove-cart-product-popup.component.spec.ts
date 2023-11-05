import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemoveCartProductPopupComponent } from './remove-cart-product-popup.component';

describe('RemoveCartProductPopupComponent', () => {
  let component: RemoveCartProductPopupComponent;
  let fixture: ComponentFixture<RemoveCartProductPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RemoveCartProductPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveCartProductPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
