import { Component } from '@angular/core';

@Component({
  selector: 'app-winter-phase9',
  templateUrl: './winter-phase9.component.html',
  styleUrls: ['./winter-phase9.component.css']
})
export class WinterPhase9Component {

  public nombre: string
  public apellidos: string
  public foto_escudo : string
  
  constructor(){

    this.nombre = "Irene"
    this.apellidos = "Herrero Becker"
    this.foto_escudo = "../../../assets/img/escudo10.png"

   }
}




