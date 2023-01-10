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
  public activeChar:number;//Personaje activo
  
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

  
  public selectedShield;//Escudo seleccionado al hacer click


  //Array de npcs.
  public npc:string
  // public npcs:string[];

  //Hace un string para mostrarlo. Llamada desde div npc_list
  public stringNpcs:string;


  //Estos atributos muestran un mensaje dependiendo de si hay campos vacíos.
  public emptyField:string;
  public showEmptyFieldMessage:boolean;
  public showEmptyCharMessage:boolean;

    constructor(public router:Router, public characterService:CharacterService, public houseService:HouseService, public playerService:PlayerService){

      console.log("houseService.currentHouse al iniciar la página" + JSON.stringify(this.houseService.currentHouse));
      
      console.log( "modifyLayout: " + this.houseService.modifyLayout);//Cambia botones en función de si la casa es nueva o se modifica

      this.shields = [this.shield1,this.shield2,this.shield3,this.shield4,this.shield5,
                      this.shield6,this.shield7,this.shield8,this.shield9,this.shield10]
  
      
      this.selectedShield;//Mostrar el escudo seleccionado y pasarlo a actualHouse
    
      this.nivelesManutencion= ["Indigente","Pobre","Normal","Rico","Muy Rico"]

      this.currentHouseId = this.houseService.currentHouseId//Recoge el id de la casa que se va a modificar
      console.log("Current House ID: " + this.currentHouseId);

      this.actualHouse = new House(this.house_name,null,this.holding_name,this.familyCharactersitic,this.selectedShield,this.economyLevels,this.currentHouseId);

      this.knight = new Character(null,this.currentHouseId,null,this.knightName,this.knightAge,1,0,0,0,null,"Hombre");

      this.squire = new Character(null,this.currentHouseId,null,this.squireName,this.squireAge,1,0,0,0,"Escudero","Hombre");

      //VALIDADORES BOTONES
      this.alreadyAdded = false;
      this.houseNotUpdated = true;
      this.goToNpcForbidden = true;


      console.log("Current house: " + JSON.stringify(this.houseService.currentHouse));
      
      this.listOfChars = this.characterService.currentHouseChars;

      // this.houseService.modifyLayout = false //para prubas

      this.modifyLayoutButtons();
      
      

      this.showEmptyFieldMessage = false;//El mensaje de rellenar los campos aparece vacío.

    }//FIN CONSTRUCTOR


//Selector de escudo
public selectHouseShield(shield:string){
  console.log(shield);
  this.selectedShield = shield;
}

public submitCharInfo(form:NgForm){
  
  console.log(form.value);//pasa un objeto con los nombres del caballero y el escudero y la edad del caballero

  //LIMPIADORES
  this.knightName = null;
  this.knightAge = null;
  this.squireName = null;

  console.log("Después de los limpiadores: " + this.knightName + " " + this.knightAge + " " + this.squireName);
  console.log(JSON.stringify(this.knight));//AQUÍ, SIGUE TENIENDO LOS VALORES
  console.log(JSON.stringify(this.squire));

  
  

  this.knightName = form.value.knight_name;
  this.knightAge = parseInt(form.value.knight_age);//para que no coja como string la edad
  this.squireName = form.value.squire_name;

  //Bloque para evitar que se dejen los campos vacíos cuando se crea el personaje
  if(
    form.value.knight_name == undefined ||
    form.value.knight_age == undefined ||
    form.value.squire_name == undefined
    )
    {
      this.emptyField = "Rellena los tres campos";
      this.showEmptyCharMessage = true;
      ("Mensaje: " + this.showEmptyCharMessage);
      

      setTimeout(() => {
        this.showEmptyCharMessage = false;
        console.log("Mensaje: " + this.showEmptyCharMessage);
      }, 2000);

    }else{//si los campos no están vacíos, sigue con la función

  console.log("Después de los valores: " + this.knightName + " " + this.knightAge + " " + this.squireName);
  console.log(this.knight);
  console.log(this.squire);

  let knightCopy = {...this.knight};
  let squireCopy = {...this.squire};




  for (let i = 0; i <  this.characterService.currentHouseChars.length; i++) {
    console.log("Array de personajes de la casa, posición " + i  + ": " + this.characterService.currentHouseChars[i].char_name);
  }
  


  //Crea caballero
  this.characterService.newCharacter(new Character(null,this.currentHouseId,null,this.knightName,this.knightAge,1,0,0,0,null,"Hombre")).subscribe((data1:any) =>{

    console.log("Data del caballero: " + JSON.stringify(data1));
    
    knightCopy.character_id = data1.insertId//cambia el id del objeto en el front para la pantalla npcs, pero no lo manda a la base de datos, no obstante, los personajes que se han creado tienen este ID

    this.activeChar = data1.insertId//igualo también con activechar
    console.log("Id del caballero y activeChar de la casa: " + this.activeChar);

    this.characterService.currentHouseChars.push(knightCopy)

    this.characterService.allCharactersOfCampaign.push(knightCopy)
    this.characterService.mainCharacters.push(knightCopy)
    console.log("All chars of campaign: " + JSON.stringify(this.characterService.allCharactersOfCampaign));
    
  })

  //Crea escudero
  this.characterService.newCharacter(new Character (null,this.currentHouseId,null,this.squireName,this.squireAge,1,0,0,0,"Escudero","Hombre")).subscribe((data2:any) =>{

    console.log("Data del escudero: " + JSON.stringify(data2));

    squireCopy.character_id = data2.insertId//cambia el id del objeto en el front para la pantalla npcs

    this.characterService.currentHouseChars.push(squireCopy);

    this.characterService.allCharactersOfCampaign.push(squireCopy)
    console.log("All chars of campaign: " + JSON.stringify(this.characterService.allCharactersOfCampaign));
  })

  
  this.alreadyAdded = true;
  this.houseNotUpdated = false;
}//fin del else
}

//Añade información de las casas al front y al back
public onSubmit(form:NgForm){

  form.value.shield = this.selectedShield;
  form.value.house_id = this.currentHouseId;
  
  console.log("Form value de la casa: " + JSON.stringify(form.value));

    //Bloque para evitar que se rellenen cosas vacías cuando se crea la casa. Comprueba si el formulario y currentHouse están a null
  if(
    (form.value.house_name == undefined && this.houseService.currentHouse.house_name == null) ||
    (form.value.holding_name == undefined && this.houseService.currentHouse.holding_name == null) ||
    (form.value.familyCharacteristic == undefined && this.houseService.currentHouse.familyCharacteristic == null) ||
    (this.selectedShield == undefined && this.houseService.currentHouse.shield == null) ||
    (form.value.nivelesManutencion == undefined && this.houseService.currentHouse.economyLevels == null)
    )
    {
      this.emptyField = "Rellena todos los campos de la casa";
      this.showEmptyFieldMessage = true;
      ("Mensaje: " + this.showEmptyFieldMessage);
      

      setTimeout(() => {
        this.showEmptyFieldMessage = false;
        console.log("Mensaje: " + this.showEmptyFieldMessage);
      }, 2000);

    }else{//si los campos no están vacíos, sigue con la función


  this.houseService.updateHouse(
    this.actualHouse = new House(
      this.actualHouse.house_name,
      this.activeChar,//mete el id del personaje activo
      this.actualHouse.holding_name,
      this.actualHouse.familyCharacteristic,
      this.selectedShield,
      this.actualHouse.economyLevels,
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
        if(this.actualHouse.activeChar == undefined){
          this.actualHouse.activeChar = this.houseService.currentHouse.activeChar;
        }


        this.houseService.currentHouse = this.actualHouse;

        console.log(this.houseService.currentHouse);
        console.log(this.actualHouse);
        
        
      })


  this.houseNotUpdated = true;
  this.goToNpcForbidden = false;
    }//fin del else

}


//Cambia el flujo de los disables de los botones en función de modifyLayout
public modifyLayoutButtons () {

  if(this.houseService.modifyLayout == true){
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

//Vuelve atrás y guarda currentHouse del front en el array de casas housesof Campaign
public goBack(){

  // //OTROS LIMPIADORES PARA DEJAR KNIGHT Y SQUIRE A 0:
  // this.knight.char_name = null;
  // this.knight.age = null;
  // this.knight.char_status = 1
  // this.knight.character_id = null;
  // this.knight.courtesyMod = null;
  // this.knight.house_id = null;
  // this.knight.isMarried = null;
  // this.knight.marriageGlory = null;
  // this.knight.role = null;
  // this.knight.year_id = null;
  // this.knight.sex = null;

  // this.squire.char_name = null;
  // this.squire.age = null;
  // this.squire.char_status = 1
  // this.squire.character_id = null;
  // this.squire.courtesyMod = null;
  // this.squire.house_id = null;
  // this.squire.isMarried = null;
  // this.squire.marriageGlory = null;
  // this.squire.role = null;
  // this.squire.year_id = null;
  this.squire.sex = null;


  console.log("actualHouse: " + JSON.stringify(this.actualHouse));
  
  console.log("houseService.currentHouse al volver a housemanagement" + JSON.stringify(this.houseService.currentHouse));

  for (let i = 0; i < this.houseService.housesOfCamapaign.length; i++) {

    if(this.houseService.currentHouse.house_id == this.houseService.housesOfCamapaign[i].house_id){

      this.houseService.housesOfCamapaign[i].house_name = this.houseService.currentHouse.house_name;
      this.houseService.housesOfCamapaign[i].activeChar = this.houseService.currentHouse.activeChar;
      this.houseService.housesOfCamapaign[i].holding_name = this.houseService.currentHouse.holding_name;
      this.houseService.housesOfCamapaign[i].familyCharacteristic = this.houseService.currentHouse.familyCharacteristic;
      this.houseService.housesOfCamapaign[i].shield = this.houseService.currentHouse.shield;
      this.houseService.housesOfCamapaign[i].economyLevels = this.houseService.currentHouse.economyLevels;
    }

    console.log("houseService.housesOfCampaign con la nueva casa: " + JSON.stringify(this.houseService.housesOfCamapaign));

    this.router.navigateByUrl("/housesmanagement");
    

  }



}





}
