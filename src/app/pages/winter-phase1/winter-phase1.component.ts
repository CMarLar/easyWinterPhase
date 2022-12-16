import { Component } from '@angular/core';

@Component({
  selector: 'app-winter-phase1',
  templateUrl: './winter-phase1.component.html',
  styleUrls: ['./winter-phase1.component.css']
})

export class WinterPhase1Component {

WinterPhaseMainComponent: any;
public nombre: string
public apellidos: string
public foto_escudo : string

 constructor(){
  
  this.nombre = "Irene",
  this.apellidos = "Herrero Becker"
  this.foto_escudo = "../../../assets/img/escudo10.png"

}
}

