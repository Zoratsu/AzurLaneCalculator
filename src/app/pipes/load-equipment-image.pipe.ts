import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loadEquipmentImage',
})
export class LoadEquipmentImagePipe implements PipeTransform {
  private readonly url = './assets/equipments/';

  public transform(value?: string): string {
    if (value) return `${this.url}${value}`;
    return `favicon.ico`;
  }
}
