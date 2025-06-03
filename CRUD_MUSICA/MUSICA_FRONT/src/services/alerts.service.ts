import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class AlertsService {

  
  constructor() {}

  public showAlert(message : string) : void{
    alert(message)
  }

}
