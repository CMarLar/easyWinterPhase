import { Component } from '@angular/core';
import { ModifierFlags } from 'typescript';

@Component({
  selector: 'app-winter-phase6a',
  templateUrl: './winter-phase6a.component.html',
  styleUrls: ['./winter-phase6a.component.css']
})

export class WinterPhase6aComponent {

  public nombre: string
  public apellidos: string
  public foto_escudo : string

  constructor(){

    this.nombre = "Irene",
    this.apellidos = "Herrero Becker"
    this.foto_escudo = "../../../assets/img/escudo10.png"

   }
}

function matrimonioLealtad(modal1){

  return modal1;
}

function matrimonioCortesia(modal2){

  return modal2
}
