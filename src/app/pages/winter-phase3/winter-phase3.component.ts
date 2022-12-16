import { Component } from '@angular/core';
import { parseJsonConfigFileContent } from 'typescript';

@Component({
  selector: 'app-winter-phase3',
  templateUrl: './winter-phase3.component.html',
  styleUrls: ['./winter-phase3.component.css']
})
export class WinterPhase3Component {

  
  WinterPhaseMainComponent: any;
  public nombre: string
  public apellidos: string
  public foto_escudo : string

  public personaje: string
  public edad_personaje: number
  public personaje2: string
  public edad_personaje2: number
  public nombre_pnj: string

   constructor(){
    
    this.nombre = "Irene",
    this.apellidos = "Herrero Becker"
    this.foto_escudo = "../../../assets/img/escudo10.png"
    this.edad_personaje = 34
    this.edad_personaje2 = 36
    this.personaje = "Espartacus"
    this.personaje2 = "Belengarius"
    this.nombre_pnj = "Julian"

   }
  
  }
/* envejecimiento otros personaje (Belengarius 38) */
function envejecimientoAuto(edad_personaje: number){

  return (edad_personaje + 1);
}



