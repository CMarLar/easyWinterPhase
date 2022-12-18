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
  public isHideCourtesy : boolean;
  public isHideLoyalty : boolean;
  public newmarried : any;
  public isHide : boolean;
  public pj : any;

  constructor(){

    this.nombre = "Irene",
    this.apellidos = "Herrero Becker"
    this.foto_escudo = "../../../assets/img/escudo10.png"

    this.isHideCourtesy = true;
    this.isHideLoyalty = true;
    this.isHide = true;

    this.newmarried = {isMarried : null,
                    nombre : "Rosa",
                    edad : 22,
                    rol : null}

    this.pj = {casado : false,
                esposa : null}
   }

   public matrimonioLealtad(){

    if (this.isHideLoyalty == true){
      this.isHideLoyalty  = false;
      this.isHideCourtesy  = true;
    }else{
      this.isHideLoyalty = true;
    }
  }
  
  public matrimonioCortesia(){
  
    if (this.isHideCourtesy == true){
      this.isHideCourtesy  = false;
      this.isHideLoyalty = true;
    }else{
      this.isHideCourtesy  = true;
    }
  }

  public guardarEsposa(){
    this.pj.casado = this.newmarried.isMarried;
    this.pj.esposa = {nombre : this.newmarried.nombre,
                      edad : this.newmarried.edad,
                      rol : this.newmarried.rol}
  }
}


