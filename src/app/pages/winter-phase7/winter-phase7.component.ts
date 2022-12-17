import { Component } from '@angular/core';

@Component({
  selector: 'app-winter-phase7',
  templateUrl: './winter-phase7.component.html',
  styleUrls: ['./winter-phase7.component.css']
})
export class WinterPhase7Component {

  WinterPhaseMainComponent: any;
  public nombre: string
  public apellidos: string
  public foto_escudo : string

  public personajes: string[]
  
   constructor(){
    
    this.nombre = "Irene",
    this.apellidos = "Herrero Becker"
    this.foto_escudo = "../../../assets/img/escudo10.png"

    this.personajes = ["Alain", "Robert", "Belengarius"]

   }
  
  }
  
 