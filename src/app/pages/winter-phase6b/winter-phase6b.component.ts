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

  public mujer: string[]
  public mujerRol: string[]

  constructor(){

    this.nombre = "Irene"
    this.apellidos = "Herrero Becker"
    this.foto_escudo = "../../../assets/img/escudo10.png"

    this. cisrcunstanciaEconomica = -2
    this.edadMadre = -1

    this.mujer = ["Theres", "Abigail","Lynn"]
    this.mujerRol = ["Espsa", "Amante"]

   }
}

function calcularNacimientos(){

  return ;
}

