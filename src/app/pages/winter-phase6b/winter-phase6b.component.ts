import { Component } from '@angular/core';

@Component({
  selector: 'app-winter-phase6b',
  templateUrl: './winter-phase6b.component.html',
  styleUrls: ['./winter-phase6b.component.css']
})
export class WinterPhase6bComponent {

  public nombre: string
  public apellidos: string
  public foto_escudo : string
  public cisrcunstanciaEconomica: number
  public edadMadre: number
  public nombreAmante: string
  public nombreAmante2: string
  public nombreEsposa: string
  public rol_esposa: string
  public rol_amante: string

  constructor(){

    this.nombre = "Irene"
    this.apellidos = "Herrero Becker"
    this.foto_escudo = "../../../assets/img/escudo10.png"
    this. cisrcunstanciaEconomica = -2
    this.edadMadre = -1
    this.nombreEsposa = "Theresa"
    this.nombreAmante = "Abigail"
    this.nombreAmante2 = "Lynn"
    this.rol_amante = "Amante"
    this.rol_esposa = "Esposa"
   

   }
}

function calcularHijos(){

  return ;
}

function matrimonioCortesia(modal2){

  return modal2
}

