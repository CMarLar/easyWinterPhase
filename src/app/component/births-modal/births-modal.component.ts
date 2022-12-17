import { Component } from '@angular/core';

@Component({
  selector: 'app-births-modal',
  templateUrl: './births-modal.component.html',
  styleUrls: ['./births-modal.component.css']
})
export class BirthsModalComponent {

  public modEconomia : number;
  public modEdadMadre : number;
  public nombreHijo : string;
  public madre : any;
  public sexo : string;

  constructor(){
    this.madre = {nombre : "Ana",
                  edad : 36,
                  partoUltimoAño : true};
    this.sexo = "niño";
    this.modEconomia = -2;
    this.modEdadMadre = -1;
  }
}
