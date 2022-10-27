import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}
  @HostBinding('class.open') open: boolean = false;

  @HostListener('click') toggleColor() {
    this.open = !this.open;
  }
}
