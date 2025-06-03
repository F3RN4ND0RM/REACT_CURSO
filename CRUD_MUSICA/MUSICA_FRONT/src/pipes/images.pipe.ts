import { Pipe, type PipeTransform } from '@angular/core';
import { environment } from '../environments/environment';

@Pipe({
  name: 'img',
})
export class ImagesPipe implements PipeTransform {
  private IMG_API = environment.IMG_API

  transform(id: number, ): string {
    return `${this.IMG_API}/${id}/${id}.webp`;
  }

}
