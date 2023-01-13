import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/shared/character.service';

@Component({
  selector: 'app-births-modal',
  templateUrl: './births-modal.component.html',
  styleUrls: ['./births-modal.component.css']
})
export class BirthsModalComponent {

  public modEconomia : number;
  public modEdadMadre : number;
  public nombreHijo : string;
  public madre : any;
  public sexo : string;

  @Input() personajePadre : any;
  @Output() cerrarModal = new EventEmitter<boolean>();

  constructor(public characterService : CharacterService){
    this.madre = {nombre : "Ana",
                  edad : 36,
                  partoUltimoAño : true};
    this.sexo = "niño";
    this.modEconomia = -2;
    this.modEdadMadre = -1;
    console.log("PAPA PITUFO: " + JSON.stringify(this.personajePadre));
    
  }

  public modal(value : string){

    if(value != null){
      //AQUI CREAR PERSONAJE HIJO
      console.log("SEXO DEL HIJ@: " + this.personajePadre.sexoHijo);
      
      let newHijo = new Character(null,this.characterService.currentActiveChar.house_id,this.characterService.currentActiveChar.year_id,value,0,1,0,0,0,"Hijo/a",this.personajePadre.sexoHijo)
      this.characterService.newCharacter(newHijo)
      .subscribe((data : any) => {
        console.log(data);
        
        newHijo.character_id = data.insertId;
        this.characterService.currentHouseCharsWinterPhase.push(newHijo);
      })
    }
    
    this.cerrarModal.emit(true);
  }
}
