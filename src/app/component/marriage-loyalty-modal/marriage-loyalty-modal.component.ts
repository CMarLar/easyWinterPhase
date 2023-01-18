import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/shared/character.service';

@Component({
  selector: 'app-marriage-loyalty-modal',
  templateUrl: './marriage-loyalty-modal.component.html',
  styleUrls: ['./marriage-loyalty-modal.component.css']
})
export class MarriageLoyaltyModalComponent {

  public resultadoMatrimonio : boolean;
  public isHidden : boolean;
  public rol : string;
  public resultadoTirada : number;
  public resultadoFinal : string;
  public gloria : number;
  public libras : string;
  public datos : any;

  @Output()loyaltyHijo = new EventEmitter <any>()//Manda información del hijo al padre. Cierra el modal.

  constructor(public characterService: CharacterService){
    this.isHidden = true;

    



  }

  //EN EL INPUT SE INTRODUCE EL VALOR POR LEALTAD EJ: 16
  //SE TIRARA UN DADO RANDOM QUE SI IGUALA O SUPERA EL VALOR DE LEALTAD SALDRA EXITO
  //SI SALE EXITO SE SUMA 1d6 A LA DOTE Y 10 A LA GLORIA
  //SI SALE FALLO EL SEÑOR NEGARA EL CASAMIENTO


  public calcularMatrimonioLealtad(lealtad : string){
    // this.isHidden = true;
    let dado : number = Math.floor((Math.random() * 20) + 1);

    if (dado >= parseInt(lealtad)){
      this.resultadoTirada = dado;
      this.resultadoFinal = "Exito";
      this.libras = "1d6 £";
      this.gloria = 10
    }else{
      
      this.resultadoFinal = "Fallo";
      this.libras = null;
      this.gloria = null;
      // console.log(this.resultadoFinal);
    }

    this.isHidden = true;
  }

  public guardarDatos(name : string = null, age : number = null){
    


    if(this.resultadoFinal == "Exito"){

      //Modifica activeChar en front y luego en bbdd
      this.characterService.currentActiveChar.isMarried = 1;
      this.characterService.currentActiveChar.marriageGlory = this.gloria;

      this.characterService.modifyCharacter(this.characterService.currentActiveChar).subscribe((data:any)=>{
        // console.log("ActiveChar modificado: " + JSON.stringify(data));
        
      })

      let newWife: Character = new Character(null,this.characterService.currentActiveChar.house_id,this.characterService.currentActiveChar.year_id,name,age,1,1,0,0,"Esposa","Mujer")

      this.characterService.newCharacter(newWife).subscribe((data:any)=>{
        // console.log("Nueva esposa" + JSON.stringify(data));

        newWife.character_id = data.insertId
        this.characterService.haveWife = false;
        //No lo metemos en el array de characters porque la esposa, en el año en que se casa, no puede tener hijos.

        
      })

      this.datos = {
        nombreEsposa : name,
        edadEsposa : age,
        gloria : this.gloria,
        libras : this.libras,
        hide: true
      }

      
    }else{
      this.datos = {
        nombreEsposa : null,
        edadEsposa : null,
        gloria : null,
        libras : null,
        hide: true
      }
    }

    this.loyaltyHijo.emit(this.datos)//pasamos true para cierre el modal
    
  }
  
}
