import { Component } from '@angular/core';

@Component({
  selector: 'app-winter-phase8',
  templateUrl: './winter-phase8.component.html',
  styleUrls: ['./winter-phase8.component.css']
})
export class WinterPhase8Component {

  WinterPhaseMainComponent: any;
  public nombre: string
  public apellidos: string
  public foto_escudo : string
  public gloria: number
  
   constructor(){
    
    this.nombre = "Irene",
    this.apellidos = "Herrero Becker"
    this.foto_escudo = "../../../assets/img/escudo10.png"
    this.gloria = 200

   }
  
  }
  
  