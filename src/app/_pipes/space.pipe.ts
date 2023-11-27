import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'space',
  standalone: true
})
export class SpacePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (isNaN(value.charAt(0))) {
      return value.substring(0, 1) + ' ' + value.substring(1)
    } else {
      return value;
    }
  }
}
