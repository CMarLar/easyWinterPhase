import { Component } from '@angular/core';

@Component({
  selector: 'app-winter-phase5',
  templateUrl: './winter-phase5.component.html',
  styleUrls: ['./winter-phase5.component.css']
})
export class WinterPhase5Component {


  WinterPhaseMainComponent: any;


  public nombre: string
  public apellidos: string
  public foto_escudo : string
  public circunstancia_economica : number
  public caballos : string[]

  
   constructor(){

    this.nombre = "Irene",
    this.apellidos = "Herrero Becker"
    this.foto_escudo = "../../../assets/img/escudo10.png"
    this.circunstancia_economica = -2
    this.caballos = ["El caballo 1 está sano","El caballo 2 está sano.","El caballo 3 está muerto o es inutil.","El caballo 4 está sano."]

   }

  
  }

  function calcularCaballos(numeroCaballos: number){

    /* let dado = Math.random(); */
  }
  /* let caballos = [("El caballo 1 está sano"),("El caballo 2 está sano."),("El caballo 3 está muerto o es inutil."),("El caballo 4 está sano.")] */


