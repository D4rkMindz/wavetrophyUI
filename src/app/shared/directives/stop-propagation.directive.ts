import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[stop-propagation]'
})
export class StopPropagationDirective {

  @HostListener('click', ['$event'])
  public onClick($event: any) {
    $event.stopPropagation();
  }

}
