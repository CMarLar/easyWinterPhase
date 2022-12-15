import { Component } from '@angular/core';

@Component({
  selector: 'app-change-character-modal',
  templateUrl: './change-character-modal.component.html',
  styleUrls: ['./change-character-modal.component.css']
})
export class ChangeCharacterModalComponent {

  public nombreCasa:string;
  public feudo:string;
  public caracteristicaFamiliar:string;
  public nivelManutencion:string;
  public nombrePJ:string;
  public edad:string;
  public nombreEscudero:string;
  public house : any;
  public npc : string[]
  constructor(){
    this.npc = ["Carlos","Irene","Miguel","Javier"];
    this.nombrePJ = "Pepe";
    this.house = {nombreCasa:this.nombreCasa,
      feudo:this.feudo,
      caracteristicaFamiliar:this.caracteristicaFamiliar,
      nivelManutencion:this.nivelManutencion,
      nombrePJ:this.nombrePJ,
      edad:this.edad,
      nombreEscudero:this.nombreEscudero,
      npc:this.npc}
  }

  public changePJ(newPJ : string){

    console.log("ACTUAL PJ: " + this.nombrePJ);
    this.nombrePJ = newPJ;
    console.log("NUEVO PJ: " + this.nombrePJ);


  }
}
