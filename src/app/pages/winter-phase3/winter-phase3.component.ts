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


  public pj : any;
  public pnj : any;
  public isHide : boolean;
  public newEscudero : any;

   constructor(){
    
    this.nombre = "Irene",
    this.apellidos = "Herrero Becker"
    this.foto_escudo = "../../../assets/img/escudo10.png"
    this.edad_personaje = 34
    this.edad_personaje2 = 36
    this.personaje = "Espartacus"
    this.personaje2 = "Belengarius"
    this.nombre_pnj = "Julian"


    this.pj = {nombre : "Antonito",
              edad : 33,
              escudero : {nombre : "pedro",
                          edad : 19}
            }
    this.pnj = [{nombre : "Belengarius", edad : 26},
                {nombre : "Espartacus" , edad :35},
                {nombre : "Alfrodo" , edad :36},
                {nombre : "Morfinus" , edad : 32},
                {nombre : "Anulus", edad : 40}];

    this.isHide = true;


   }

   public envejecimientoAutomatico(){

    
    if(this.isHide == true){
        this.isHide = false;
    }else{
      this.isHide = true;
    }

    
   
  }

  nuevoEscudero(nombreEscudero : string){
    this.newEscudero = {nombre : nombreEscudero,
                        edad : 15}
  }

  public sumarAge(){

    this.pj.edad = this.pj.edad + 1;
    this.pj.escudero.edad = this.pj.escudero.edad + 1;

    for(let i = 0; i < this.pnj.length; i++){

      this.pnj[i].edad = this.pnj[i].edad + 1;
    }

    if (this.pj.escudero.edad >= 21){
      this.pj.escudero = this.newEscudero;
    }

  }
  
  }


