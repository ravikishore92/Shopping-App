import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCustomForm]'
})
export class CustomFormDirective {

  constructor(private elemRef : ElementRef) {
    let style = this.elemRef.nativeElement.style;
    style.marginLeft = "25%";
    style.marginTop = "45px";
    style.border="2px black solid";
    style.padding= "30px";
    style.marginRight = "25%";
   }

}
