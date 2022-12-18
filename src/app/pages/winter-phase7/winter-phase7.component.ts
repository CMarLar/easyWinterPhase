import { Component } from '@angular/core';

@Component({
  selector: 'app-winter-phase7',
  templateUrl: './winter-phase7.component.html',
  styleUrls: ['./winter-phase7.component.css']
})
export class WinterPhase7Component {

  WinterPhaseMainComponent: any;
  public nombre: string
  public apellidos: string
  public foto_escudo : string

  public personajes: string[]

  public houseCharacters;
  
   constructor(){
    
    this.nombre = "Irene",
    this.apellidos = "Herrero Becker"
    this.foto_escudo = "../../../assets/img/escudo10.png"

    this.personajes = ["Alain", "Robert", "Belengarius"];

    this.houseCharacters = 
    {
      characters:
      [
        {name:"Alain",role:"Hermano",age:14,sex:"Hombre"},
        {name:"Robert",role:"Hijo/a",age:21,sex:"Hombre"},
        {name:"Gwynneth",role:"Hijo/a",age:14,sex:"Woman"},
        {name:"Richard",role:"Escudero",age:18,sex:"Hombre"},
      ]
    }

    console.log(this.houseCharacters);
    console.log(this.houseCharacters.name);
    
   }
  
  }
  
 