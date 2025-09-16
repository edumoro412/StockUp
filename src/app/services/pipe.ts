import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'KjtoCal', standalone: true })
export class KJtoCal implements PipeTransform {
  transform(value: number): number {
    return Math.round(value / 4.184);
  }
}
