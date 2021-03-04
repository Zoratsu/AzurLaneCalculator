import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'loadShipImage',
})
export class LoadShipImagePipe implements PipeTransform {
  private readonly url = './assets/ships/';

  public transform(value?: string): string {
    if (value) {
      return `${this.url}${value}`;
    }
    return `favicon.ico`;
  }
}
