import { Component } from '@angular/core';
import { WinterPhaseMainComponent } from '../winter-phase-main/winter-phase-main.component';

@Component({
  selector: 'app-winter-phase4',
  templateUrl: './winter-phase4.component.html',
  styleUrls: ['./winter-phase4.component.css']
})
export class WinterPhase4Component {

  public nombre: string
  public apellidos: string
  public foto_escudo : string

  public malTiempo: number
  public modificadores: number 
  public administracion: number
  public modificadores2: number
  public calcular: number
  public nivelesManutencion: any[]/* [{nivel:"Indigente"},{nivel:"Pobre"},{nivel:"Rico"},{nivel:"Muy Rico"}] */
  public nivel: string

  WinterPhaseMainComponent: any;
  
   constructor(){
    
    this.nombre = "Irene",
    this.apellidos = "Herrero Becker"
    this.foto_escudo = "../../../assets/img/escudo10.png"

    this.nivelesManutencion = [{nivel:"Indigente"},{nivel:"Pobre"},{nivel:"Rico"},{nivel:"Muy Rico"}]
   }
  
  }

  /* funcion para calcular nivel de manutención// NO SE QUE FÓRMULA// preguntar a Carlos*/
  function calcularNivelManutencion(malTiempo: number, modificadore: number, administracion: number, modificadores2: number){

    let calcular = malTiempo + modificadore + administracion + modificadores2;

    /* return calcular; */

 
  }


