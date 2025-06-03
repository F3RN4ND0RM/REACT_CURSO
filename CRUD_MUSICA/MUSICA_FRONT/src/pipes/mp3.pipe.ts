import { Pipe, type PipeTransform } from '@angular/core';
import { environment } from '../environments/environment';

@Pipe({
  name: 'mp3',
})
export class Mp3Pipe implements PipeTransform {

  private IMG_API = environment.IMG_API

  transform(id: number, ): string {
    return `${this.IMG_API}/${id}/${id}.mp3`;
  }

}
