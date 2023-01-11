import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-change-character-modal',
  templateUrl: './change-character-modal.component.html',
  styleUrls: ['./change-character-modal.component.css']
})
export class ChangeCharacterModalComponent {

  @Input() charactersPadre : Character[];
  @Output() eventoChangeCharacter = new EventEmitter<Character>();

  public arraySinEscudero : Character[];
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
    // console.log(this.charactersPadre);
    
    // this.arraySinEscudero = this.charactersPadre;
    // for(let i = 0; i < this.charactersPadre.length; i++){
      
    //   if(this.arraySinEscudero[i].role == "Escudero"){
    //     this.arraySinEscudero.splice(i,1);
    //   }
    // }

    console.log(JSON.stringify(this.arraySinEscudero));

    this.house = {nombreCasa:this.nombreCasa,
      feudo:this.feudo,
      caracteristicaFamiliar:this.caracteristicaFamiliar,
      nivelManutencion:this.nivelManutencion,
      nombrePJ:this.nombrePJ,
      edad:this.edad,
      nombreEscudero:this.nombreEscudero,
      npc:this.npc}
  }

  public changePJ(newPJ : Character){

    console.log(JSON.stringify(newPJ));
    
    console.log("NUEVO PJ: " + JSON.stringify(newPJ));
    this.eventoChangeCharacter.emit(newPJ);


  }
}
