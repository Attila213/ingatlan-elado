import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'squareMeter'
})
export class SquareMeterPipe implements PipeTransform {

  transform(value: any, decimals: number = 2): string {
    if (typeof value !== 'number' || isNaN(value)) {
      console.error('Invalid input for squareMeter pipe:', value);
      return '';
    }
    return `${value.toFixed(decimals)} m²`;
  }
}
