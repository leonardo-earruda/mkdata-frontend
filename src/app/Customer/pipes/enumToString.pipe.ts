import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'enumToString'
})
export class EnumToString implements PipeTransform {
  transform(value: string): string {
    let formattedValue = value.replace('_', ' ');
    formattedValue = formattedValue.charAt(0).toUpperCase() + formattedValue.slice(1).toLowerCase();
    return formattedValue;
  }
}
