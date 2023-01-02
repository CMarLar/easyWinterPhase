import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HouseService } from 'src/app/shared/house.service';
import { House } from 'src/app/models/house';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/shared/character.service';
import { PlayerService } from 'src/app/shared/player.service';


@Component({
  selector: 'app-create-house',
  templateUrl: './create-house.component.html',
  styleUrls: ['./create-house.component.css']
})
export class CreateHouseComponent {



  public actualHouse:House;
  public house_name:string;
  public holding_name:string;
  public familyCharactersitic:string;
  public currentHouseId:number;
  public activeChar:number;
  
  public knight:Character;
    public knightName:string;
    public knightAge:number;
    public knightId:number;
  public squire:Character;
    public squireName:string;
    public squireAge:number = 15;
    public squireId:number;


  //Enables/disables que establecen el orden de relleno, de arriba a abajo
  public alreadyAdded:boolean;//hace disabled el botón añadir cuando se crean los dos personajes
  public houseNotUpdated:boolean;//disabled al principio, se pone enabled cuando se edita la casa
  public goToNpcForbidden:boolean;//disabled al principio, se pone enabled cuando se ha editado la casa una vez.


  public nombreCasa:string;
  public feudo:string;
  public caracteristicaFamiliar:string;
  public nivelManutencion:string;
  public nombrePJ:string;
  public edad:string;
  public nombreEscudero:string;

  public nivelesManutencion:string[]

  public house;

  public shields;

  public economyLevels;//nivel de manutención

  public listOfChars:Character[];



  public shield1="../../../assets/img/escudo1.png"
  public shield2="../../../assets/img/escudo2.png"
  public shield3="../../../assets/img/escudo3.png"
  public shield4="../../../assets/img/escudo4.png"
  public shield5="../../../assets/img/escudo5.png"
  public shield6="../../../assets/img/escudo6.png"
  public shield7="../../../assets/img/escudo7.png"
  public shield8="../../../assets/img/escudo8.png"
  public shield9="../../../assets/img/escudo9.png"
  public shield10="../../../assets/img/escudo10.png"

  
  public selectedShield;//Hace referencia al escudo

    //True -> No hay NPCs
  public noNPC:boolean;

  //Array de npcs.
  public npc:string
  // public npcs:string[];

  //Hace un string para mostrarlo. Llamada desde div npc_list
  public stringNpcs:string;

    constructor(public router:Router, public characterService:CharacterService, public houseService:HouseService, public playerService:PlayerService){

      console.log("houseService.currentHouse al iniciar la página" + JSON.stringify(this.houseService.currentHouse));
      
      console.log( "modifyLayout: " + this.houseService.modifyLayout);//Cambia botones en función de si la casa es nueva o se modifica

      this.shields = [this.shield1,this.shield2,this.shield3,this.shield4,this.shield5,
                      this.shield6,this.shield7,this.shield8,this.shield9,this.shield10]
  
  
      this.noNPC=false//ACUÉRDATE DE CAMBIARLO A TRUE DESPUÉS DE HACER LAS PRUEBAS
      console.log(this.noNPC);
      
    //Mostrar el escudo seleccionado:
    this.selectedShield
  
  //esto es antiguo, era para que se vieran los personajes, la función de abajo también.
      // this.npcs=[];

    //Hace el strgin de personajes y ejecuta checkNPC.
      // this.changeNpcString()

      // this.checkNPC()
      // console.log(this.noNPC);
      

      
      this.nivelesManutencion= ["Indigente","Pobre","Normal","Rico","Muy Rico"]

      this.currentHouseId = this.houseService.currentHouseId//debería coger el id de la casa en concreto
      console.log("Current House ID: " + this.currentHouseId);
      


      this.actualHouse = new House(this.house_name,null,this.holding_name,this.familyCharactersitic,this.selectedShield,this.economyLevels,this.currentHouseId);

      // this.casa = new House()

      this.knight = new Character(null,this.currentHouseId,null,this.knightName,this.knightAge,1,0,0,0,null,"Hombre");

      this.squire = new Character(null,this.currentHouseId,null,this.squireName,this.squireAge,1,0,0,0,"Escudero","Hombre");

      //VALIDADORES BOTONES
      this.alreadyAdded = false;
      this.houseNotUpdated = true;
      this.goToNpcForbidden = true;


      console.log("Current house: " + this.houseService.currentHouse);
      
      this.listOfChars = this.characterService.currentHouseChars;

      // this.houseService.modifyLayout = false //para prubas

      this.modifyLayoutButtons();
      

    }//FIN CONSTRUCTOR


//Selector de escudo
public selectHouseShield(shield:string){
  console.log(shield);
  this.selectedShield = shield;



  
}
// //Cambia el estado de noNPC para quitar disable del botón
// public checkNPC(){
//   if(this.npcs.length>0){this.noNPC=false}
// }

// public changeNpcString(){
//   console.log(this.npcs.length);
  
//   if(this.npcs.length>0)
//   {
//     this.stringNpcs = "PNJs: " + this.npcs.join(`, `);
//     this.checkNPC()
//     console.log(this.noNPC);
    
//   }else
//   {
//     this.stringNpcs = "Aún no has añadido PNJs a tu casa. Pulsa en PNJ para añadir al menos uno."
//   }
// }

//Formulario, guardar cambios, volver a página de asignación de casas
public onSubmit(form:NgForm){

  form.value.shield = this.selectedShield;//funciona para meter el escudo seleccionado
  form.value.house_id = this.currentHouseId; //puesto el id directamente para probar
  
  console.log("Form value: " + form.value);


  this.houseService.updateHouse(
    this.actualHouse = new House(
      this.actualHouse.house_name,
      this.activeChar,//mete el id del personaje activo
      this.actualHouse.holding_name,
      this.actualHouse.familyCharacteristic,
      this.selectedShield,
      this.actualHouse.economyLevels,//economyLevels
      this.currentHouseId))
      .subscribe((data)=>{

        console.log(data);
    
        //Este bloque es para que no se quede todo a null en el front cuando se modifica la casa
        if(this.actualHouse.house_name == undefined){
          this.actualHouse.house_name = this.houseService.currentHouse.house_name;
        }
        if(this.actualHouse.holding_name == undefined){
          this.actualHouse.holding_name = this.houseService.currentHouse.holding_name;
        }
        if(this.actualHouse.familyCharacteristic == undefined){
          this.actualHouse.familyCharacteristic = this.houseService.currentHouse.familyCharacteristic;
        }
        if(this.actualHouse.shield == undefined){
          this.actualHouse.shield = this.houseService.currentHouse.shield;
        }
        if(this.actualHouse.economyLevels == undefined){
          this.actualHouse.economyLevels = this.houseService.currentHouse.economyLevels;
        }


        this.houseService.currentHouse = this.actualHouse;

        console.log(this.houseService.currentHouse);
        console.log(this.actualHouse);
        
        
      })

  // this.goBack(); //Reactiva este routing cuando termines
  

  this.houseNotUpdated = true;
  this.goToNpcForbidden = false;
}

public submitCharInfo(form:NgForm){
  
  console.log(form.value);//pasa un objeto con los nombres del caballero y el escudero y la edad del caballero


  this.knightName = form.value.knight_name;
  this.knightAge = parseInt(form.value.knight_age);//para que no coja como string la edad
  this.squireName = form.value.squire_name;

  console.log(this.knight);
  console.log(this.squire);

  this.characterService.currentHouseChars.push(this.knight);
  this.characterService.currentHouseChars.push(this.squire);


  for (let i = 0; i <  this.characterService.currentHouseChars.length; i++) {
    console.log("Array de personajes de la casa, posición " + i  + ": " + this.characterService.currentHouseChars[i].char_name);
  }
  


  //Crea caballero
  this.characterService.newCharacter(new Character(null,this.currentHouseId,null,this.knightName,this.knightAge,1,0,0,0,null,"Hombre")).subscribe((data1:any) =>{

    console.log("Data del caballero: " + JSON.stringify(data1));
    
    this.characterService.currentHouseChars[0].character_id = data1.insertId//cambia el id del objeto en el front para la pantalla npcs, pero no lo manda a la base de datos, no obstante, los personajes que se han creado tienen este ID

    this.activeChar = data1.insertId//igualo también con activechar
    console.log("Id del caballero y activeChar de la casa: " + this.activeChar);
    
  })

  //Crea escudero
  this.characterService.newCharacter(new Character (null,this.currentHouseId,null,this.squireName,this.squireAge,1,0,0,0,"Escudero","Hombre")).subscribe((data2:any) =>{

    console.log("Data del escudero: " + JSON.stringify(data2));

    this.characterService.currentHouseChars[1].character_id = data2.insertId//cambia el id del objeto en el front para la pantalla npcs

  })
  
  this.alreadyAdded = true;
  this.houseNotUpdated = false;
  
}

//Cambia el flujo de los disables de los botones en función de modifyLayout
public modifyLayoutButtons () {

  if(this.houseService.modifyLayout == true || this.houseService.modifyLayout == undefined){
    this.houseNotUpdated = false;
    this.goToNpcForbidden = false;
  }else{
    this.houseNotUpdated = true;
  }

}

public submitActiveChar(form:NgForm){
  console.log("submitActiveChar: " + JSON.stringify(form.value));
  console.log(JSON.stringify(form.value));

  this.activeChar = form.value.new_character;
  // this.actualHouse.activeChar = this.activeChar;

  console.log("submitActiveChar: " + this.activeChar);
  console.log(this.actualHouse.activeChar);
  
}

//Va a la página de añadir pnjs al pulsar el botón añadir pnjs.
public goAddNpcs(){

  // console.log("Id de la casa al pinchar en pnj" + this.currentHouseId);
  

  // this.houseService.updateHouse(
  //   this.actualHouse = new House(
  //     this.actualHouse.house_name,
  //     this.characterService.currentHouseChars[0].character_id,//no añade el activechar
  //     this.actualHouse.holding_name,
  //     this.actualHouse.familyCharacteristic,
  //     this.selectedShield,this.currentHouseId))//NO RECONOCE EL PUTO ID
  //     .subscribe((data)=>{

  //       console.log(data);
    
  //       this.houseService.currentHouse = this.actualHouse;//iguala la casa del front

  //       console.log("Casa en el servicio una vez modificada: " + this.houseService.currentHouse);
        

  //     })
this.houseNotUpdated = false;

if(this.houseService.currentHouse.house_name != null && this.houseService.currentHouse.holding_name != null && this.houseService.currentHouse.familyCharacteristic != null){
  this.houseService.modifyLayout = true;  //esto sirve para que aparezcan unos botones u otros en función de si la casa se modifica o se crea la primera vez.

  console.log("goAddNpcs condicional: " + this.houseService.modifyLayout);
  
  
}else{
  this.houseService.modifyLayout = false;

  console.log("goAddNpcs condicional: " + this.houseService.modifyLayout);
}

console.log("houseService.currentHouse al salir hacia addnpc" + JSON.stringify(this.houseService.currentHouse));

this.router.navigateByUrl("/addnpc");

}

//Va atrás sin guardar los cambios al pulsar el botón cancelar
public goBack(){
  this.router.navigateByUrl("/housesmanagement");

  //Debería borrar la casa y los personajes en función de una condición. Por ejemplo, que la casa tenga todo vacío, si no, que simplemente vaya para atrás.

  console.log("houseService.currentHouse al volver a housemanagement" + JSON.stringify(this.houseService.currentHouse));

}





}
