import { ThisReceiver } from '@angular/compiler';
import { Component, EventEmitter, Output } from '@angular/core';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/shared/character.service';

@Component({
  selector: 'app-marriage-courtesy-modal',
  templateUrl: './marriage-courtesy-modal.component.html',
  styleUrls: ['./marriage-courtesy-modal.component.css']
})
export class MarriageCourtesyModalComponent {

  public resultadoMatrimonio : boolean;
  public isHidden : boolean;
  public rol : string;
  public resultadoTirada : number;
  public resultadoFinal : string;
  public gloria : number;
  public libras : string;
  public casarse : boolean;
  public casadoCon : boolean;
  public noRelleno :  boolean;
  public objeto : any;
  public botonPulsado : boolean;
  public noSeCasa: string;
  public datos : any;
  public modMarriage : number;

  @Output() courtesyHijo = new EventEmitter <boolean>()

  constructor(public characterService:CharacterService){
    this.isHidden = true;
    this.casarse = null;
    this.casadoCon = false;
    this.noRelleno = true;
    this.botonPulsado = false;
    this.noSeCasa = ""
    this.modMarriage = 0
    this.objeto = {
      rol : this.rol,
      gloria : this.gloria,
      libras : this.libras,
      modMarriage : this.modMarriage
    }

  }

  //A PARTIR DE AQUI ES EL CASAMIENTO POR CORTESIA
  //EN EL INPUT SE INTRODUCE EL VALOR DE CORTESIA
  //SE TIRA UN DADO RANDOM QUE SI IGUALA O SUPERA EL VALOR DE CORTESIA SALDRA EXITO
  //SI SALE EXITO SE INTRODUCIRA EL VALOR DE UNA TIRADA DE MATRIMONIO

  public calcularMatrimonioCortesia(value : number){

    let dado : number = Math.floor((Math.random() * 20) + 1);

    value = (+value + +this.characterService.currentActiveChar.courtesyMod);

    if(dado > value){
      this.resultadoFinal = "Fallo";
      this.noSeCasa = "No";      
      // console.log(this.resultadoFinal);
      
    }else if (dado <= value){
      this.resultadoFinal = "Éxito";
      // console.log(this.resultadoFinal);
    }

    // console.log("Dado: " + dado);
    // console.log("Value: " + value);
    // console.log("Courtesy Mod" + this.characterService.currentActiveChar.courtesyMod);
    

  }

  public casarseResult(){
    this.casarse = true;//indica que se va a casar en el back.
    this.botonPulsado = true;//el jugador decide si se casa o no.
    this.noSeCasa = "Sí";
  }

  public esposaResult(value : string){

    let dadoHija : number;
    let dadoHermanos : number;

      if(parseInt(value) + this.modMarriage <= 5){

      this.rol = "Plebeya adinerada";
      this.gloria = 0;
      this.libras = "3d6 + 6£";
      
    }else if (parseInt(value) + this.modMarriage >= 6 && parseInt(value) + this.modMarriage <= 8){

      dadoHija = Math.floor((Math.random() * 6) + 1);
      this.rol = "Hija " + dadoHija + " de un escudero";
      this.gloria = 10;
      this.libras = "3£";

    }else if (parseInt(value) + this.modMarriage >= 9 && parseInt(value) + this.modMarriage <= 10){

      dadoHija = Math.floor((Math.random() * 6) + 1);
      this.rol = "Hija " + dadoHija + "de caballero mantenido";
      this.gloria = 50;
      this.libras = "1d6 £";

    }else if (parseInt(value) + this.modMarriage == 11){

      this.rol = "Hija mayor de caballero vasallo adinerado";
      this.gloria = 100;
      this.libras = "1d3 + 6£";

    }else if (parseInt(value) + this.modMarriage >= 12 && parseInt(value) + this.modMarriage <= 20){

      dadoHija = Math.floor((Math.random() * 6) + 1);
      dadoHermanos = Math.floor((Math.random() * 6) + 1);
      this.rol = "Hija " + dadoHija + " de " + dadoHermanos + "hermanos de caballero vasallo";
      this.gloria = 100;
      this.libras = "1d6 £";

    }else if (parseInt(value) + this.modMarriage >= 21 && parseInt(value) + this.modMarriage <= 25){

      this.rol = "Heredera de caballero vasallo";
      this.gloria = 100;
      this.libras = "1 señorío, 1d6+ 10£";

    }
    else if (parseInt(value) + this.modMarriage >= 26 && parseInt(value) + this.modMarriage <= 27){

      this.rol = "Heredera de caballero vasallo adinerado";
      this.gloria = 300;
      this.libras = "2 señoríos, 1d6 £";

    }else if (parseInt(value) + this.modMarriage >= 28){

      this.rol = "Hija más joven de un barón";
      this.gloria = 250;
      this.libras = "1 señorío, 1d6+ 10£"

    }
    this.casadoCon = true;
    this.characterService.currentActiveChar.isMarried = 1
    this.characterService.currentActiveChar.marriageGlory = this.gloria;
    this.characterService.currentActiveChar.courtesyMod = 0;

    this.characterService.modifyCharacter(this.characterService.currentActiveChar)
    .subscribe((data)=>{
      // console.log("Data - MarriageGlory y pj se casa: " + JSON.stringify(data));
      
    })


  }

  public noMarriage(){

    this.noSeCasa = "No";
    this.characterService.currentActiveChar.courtesyMod +=1;
    this.botonPulsado = true;

    this.characterService.modifyCharacter(this.characterService.currentActiveChar)
    .subscribe((data)=>{
      // console.log("Data - Mod. Cortesía (pj no se casa): " + JSON.stringify(data));
      
    })

  }

  public guardarDatos(nombre:string=null, edad:number=null){

    if(this.noSeCasa == "No"){
      // console.log("No se ha casado");
      
    }else{

      let newWife:Character;

      newWife = new Character(null,this.characterService.currentActiveChar.house_id,this.characterService.currentActiveChar.year_id,nombre,edad,1,1,0,0,"Esposa","Mujer")

      this.characterService.newCharacter(newWife).subscribe((data : any)=>{
        // console.log("Nueva esposa: " + JSON.stringify(data));
        newWife.character_id = data.insertId;
        this.characterService.haveWife = false;
      })
    }

    this.courtesyHijo.emit(true)

    

    // if(this.resultadoFinal == "Exito"){

    //   this.datos = {
    //     rol : this.rol,
    //   }
    // }
  }



}
