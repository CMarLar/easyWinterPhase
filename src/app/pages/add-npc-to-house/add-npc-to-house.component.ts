import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HouseService } from 'src/app/shared/house.service';
import { House } from 'src/app/models/house';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/shared/character.service';
import { YearService } from 'src/app/shared/year.service';



@Component({
  selector: 'app-add-npc-to-house',
  templateUrl: './add-npc-to-house.component.html',
  styleUrls: ['./add-npc-to-house.component.css']
})
export class AddNpcToHouseComponent {
  //Nombre de la casa bajo el título.
  public houseName;

  //Array de npcs
  public npcs;

  //Modelo de personaje del formulario
  public formNpc;

  //Transforma true o false en un string
  public deadOrAliveString:string;

  //Atributos de los personajes: van a cambiar
  public role;//array del selector
  public sex;
  public status;

  //PJ Activo
  public activeChar:number;

  public newActiveCharIs:Character;

  //Comprueba que hay al menos un personaje creado para habilitar el botón Confirmar
  public noNpcs;

  ///////ATRIBUTOS AÑADIDOS PARA CONECTAR CON EL BACK (las de arriba son fake)//////

  public currentHouse:House;

  public currentHouseName:string;

  public currentHouseId:number;

  public currentHouseChars:Character[];

  public currentHouseShield:string;

  public newCharacter:Character;//El personaje que se crea con el formulario.

  public selectedCharMessage:boolean;//Mensaje que muestra el personaje seleccionado al pulsar ok en el selector de personajes.

  constructor(public router:Router, public characterService:CharacterService, public houseService:HouseService, public yearService:YearService){

    // console.log("Casa actual en el servicio: " + JSON.stringify(this.houseService.currentHouse));
    
    this.currentHouse = this.houseService.currentHouse;//se lleva la casa del servicio 

    // console.log("Casa actual en el componente: " + JSON.stringify(this.currentHouse));

    // console.log("Id del personaje activo en el servicio" + this.houseService.currentHouse.activeChar);
    // console.log ("Id de la casa en el servicio: " + this.houseService.currentHouse.house_id)
    
    // console.log("Id del personaje activo en el componente: " + this.currentHouse.activeChar);



    // console.log(this.showHouseChars(this.currentHouse.house_id));//da undefined

    this.status = ["Vivo/a","Muerto/a"];

    this.role = ["Hijo/a", "Esposa", "Amante", "Escudero"]

    this.sex = ["Hombre","Mujer"]


      
    this.noNpcs=false//al principio sí hay al menos dos personajes
    

    this.currentHouseId = this.houseService.currentHouse.house_id;//se lleva el ID de la casa

    // this.currentHouseChars = this.characterService.currentHouseChars//Recoge los personajes del array de personajes con el caballero y el escudero

    this.showHouseChars(this.currentHouseId)

    this.currentHouseName = this.houseService.currentHouse.house_name;//recoge el nombre de la casa

    this.currentHouseShield = this.houseService.currentHouse.shield// recoge el escudo
    

    this.newCharacter = new Character(null,this.currentHouseId,null,null,null,1,0,0,0,null,null)//se tiene que rellenar con el form

    this.selectedCharMessage = false;
    






    // this.checkNpcs()
  }//FIN CONSTRUCTOR


  //Recibe los personajes de la base de datos
  public showHouseChars (id){

    if(this.yearService.currentYear == null || this.yearService.currentYear == undefined){
      this.characterService.getCharacters(id).subscribe((data:Character[])=>{
        this.currentHouseChars = data;
        this.characterService.currentHouseChars = this.currentHouseChars
      })
    }else{

      this.characterService.getWinterPhaseChars(id,this.yearService.currentYear.year_id).subscribe((data:Character[])=>{
        // console.log("Data de showHouseChars: " + JSON.stringify(data));
        
        this.currentHouseChars = data;//creo que lo está igualando a data aquí
        this.characterService.currentHouseChars = this.currentHouseChars;//iguala el servicio con el componente

      })
    }
  }





  public deleteChar(id:number){
      //Borra personaje EN EL FRONT

      
  this.currentHouseChars.splice(id -1,1)
    // console.log(this.currentHouseChars);
    if(this.currentHouseChars.length==0){this.noNpcs=true}
      
    this.currentHouseChars =  this.currentHouseChars
      //Borra en la base de datos
    this.characterService.deleteCharacter(id).subscribe((data)=>{

      for (let i = 0; i < this.characterService.allCharactersOfCampaign.length; i++) {
        if(this.characterService.allCharactersOfCampaign[i].character_id == id){
          
          this.characterService.allCharactersOfCampaign.splice(i,1)//Borra el personaje del array de allCharacters of Campaign

        }
        
      }

      // console.log(data);
      
      this.showHouseChars(this.currentHouseId)

    })
    

    
  }

  //Cambia el Estado de un personaje de vivo a muerto.

  public deadOrAlive(id:number){
    // console.log("click");

    // console.log(this.currentHouseChars);

    for (let i = 0; i < this.currentHouseChars.length; i++) {
      if(this.currentHouseChars[i].character_id == id){

        if(this.currentHouseChars[i].char_status == 1){
          
          this.currentHouseChars[i].char_status = 0
          // console.log("Cambiado a muerto");

          //cambia en la base de datos
          this.characterService.modifyCharacter(
            this.currentHouseChars[i] = new Character(
              this.currentHouseChars[i].character_id,
              this.currentHouseId,
              null,
              this.currentHouseChars[i].char_name,
              this.currentHouseChars[i].age,
              0,
              this.currentHouseChars[i].isMarried,
              this.currentHouseChars[i].marriageGlory,
              this.currentHouseChars[i].courtesyMod,
              this.currentHouseChars[i].role,
              this.currentHouseChars[i].sex))
              .subscribe((data)=>{

                // console.log(data);
            
              })


          
        }else if(this.currentHouseChars[i].char_status == 0){
          this.currentHouseChars[i].char_status = 1
          // console.log("Cambiado a vivo");

          //cambia en la base de datos
          this.characterService.modifyCharacter(
            this.currentHouseChars[i] = new Character(
              this.currentHouseChars[i].character_id,
              this.currentHouseId,
              null,
              this.currentHouseChars[i].char_name,
              this.currentHouseChars[i].age,
              1,
              this.currentHouseChars[i].isMarried,
              this.currentHouseChars[i].marriageGlory,
              this.currentHouseChars[i].courtesyMod,
              this.currentHouseChars[i].role,
              this.currentHouseChars[i].sex))
              .subscribe((data)=>{

                // console.log(data);
            
              })

        } 
      }
    }
  }

  // public modifyChar(id:number){
  //   //Esta función debería poder editar los detalles de un npc, pero no se ha inplementado por falta de tiempo. Lo dejamos para versiones futuras
  // }

  public onSubmit(form:NgForm){
    // console.log(form.value);

    if(form.value.role == form.value.otherRole){

      delete form.value.otherRole;
      // console.log("Elegido role del selector:");
      // console.log(form.value);
      
    }else{

      form.value.role = form.value.otherRole;
      delete form.value.otherRole;
      // console.log("Aplicado nuevo role del campo");
      // console.log(form.value);
      
    }
    
    let formNpcCopy = {...form.value}
    
    // console.log("formNpcCopy con spread operator: " + JSON.stringify(formNpcCopy));

///BLOQUE NO TESTADO PARA CREAR PERSONAJES CON EL AÑO CORRECTO
    let insertedYear:number;

    if(this.yearService.currentYear == null || this.yearService.currentYear == undefined){
      insertedYear = null;
    }else{
      insertedYear = this.yearService.currentYear.year_id;
    }
//////

    //Bloque para poner isMarried en esposa y activeChar. Posiblemente no funcione al crear esposas a partir del primer año
    let marriedStatus:number;
    
    if(formNpcCopy.role == "Esposa"){
      marriedStatus = 1

      // console.log("Se ha creado una esposa con marriedStatus " + marriedStatus);
      

      let activeChar:Character;

      // console.log("BODA A LA VISTA");
      
      if(this.characterService.currentActiveChar != null || this.characterService.currentActiveChar != undefined){

        this.characterService.currentActiveChar.isMarried = 1;
        activeChar = this.characterService.currentActiveChar;
        // console.log("¿Quién es el activeChar?: "  + JSON.stringify(this.characterService.currentActiveChar));

        

      }else{

        for (let i = 0; i < this.characterService.allCharactersOfCampaign.length; i++) {

          if(this.characterService.allCharactersOfCampaign[i].character_id == this.houseService.currentHouse.activeChar)
    
          this.characterService.allCharactersOfCampaign[i].isMarried = 1
          activeChar = this.characterService.allCharactersOfCampaign[i];
          // console.log("¿Quién es el activeChar?: "  + JSON.stringify(this.characterService.currentActiveChar));
        }

      }

      this.characterService.modifyCharacter(new Character(activeChar.character_id,activeChar.house_id,activeChar.year_id,activeChar.char_name,activeChar.age,activeChar.char_status,1,activeChar.marriageGlory,activeChar.courtesyMod,activeChar.role,activeChar.sex)).subscribe((data)=>{

        // console.log("Data del activeChar con isMarried modificado: " + JSON.stringify(data));
        
      })


    }else{
      marriedStatus = 0
      // console.log("Se ha creado una persona con marriedStatus " + marriedStatus);
    }



    let newCharacter:Character = new Character(null,this.currentHouseId,insertedYear,formNpcCopy.char_name,formNpcCopy.age,1,marriedStatus,0,0,formNpcCopy.role,formNpcCopy.sex);



    //A la base de datos.
    this.characterService.newCharacter(newCharacter).subscribe((data:any)=>{
      // console.log(data);

      newCharacter.character_id = data.insertId

      //Al array del front
      this.currentHouseChars.push(newCharacter);
      this.characterService.allCharactersOfCampaign.push(newCharacter)

      // console.log("All chars of campaign: " + this.characterService.allCharactersOfCampaign);
      

      // console.log(this.currentHouseChars);

        this.showHouseChars(this.currentHouseId)
        


    })
    
  }


  //Marca a un personaje como el personaje activo.
  //El problema de este selector es que no puede mandar ids de los personajes que se crean en el front, porque no tienen ID, con lo cual no se puede elegir el en selector. Por eso, cuando se crea un nuevo personaje, se debe mandar a la base de datos.
  public onSelect(form:NgForm){
    // console.log("Form value:" + JSON.stringify(form.value));
    this.activeChar = form.value;

    // console.log(this.currentHouse.activeChar)

    for (let character in form.value.characters){
      // console.log(character);
      
    }

    // for (let i = 0; i < this.activeChar.characters.length; i++) {
      
    //   console.log("activeChar:" + JSON.stringify(this.activeChar.characters[i]));
    //   console.log("sin stringify:" + this.activeChar.characters[i]);
      
    // }


    
  }
  //Si hay personajes en el array de npcs, cambia noNpcs a false
  public checkNpcs(){
    if(this.currentHouseChars.length != 0){this.noNpcs=false}
  }

  public changeSelectedCharMessage(){

    // for (let i = 0; i < this.currentHouseChars.length; i++) {

    //   if(this.currentHouseChars[i].character_id == idOfChar){

    //     this.newActiveCharIs = this.currentHouseChars[i]//Esto iguala al personaje elegido en el selector como el nuevo personaje activo para pasar el mensaje
    //   }

    //   console.log(this.newActiveCharIs);
      
    // }

    this.selectedCharMessage = true;
    // console.log("SelectedCharMessage: " + this.selectedCharMessage);
    
    
    setTimeout(() => {
      this.selectedCharMessage = false;
      // console.log("SelectedCharMessage: " + this.selectedCharMessage);
    }, 2000);

  }
  
  //Vuelve a la página de gestión de casas/asignación de casas guardando la información.
  public goBack(){
    this.houseService.updateHouse(
      this.currentHouse = new House(
        this.houseService.currentHouse.house_name,
        this.currentHouse.activeChar,
        this.houseService.currentHouse.holding_name,
        this.houseService.currentHouse.familyCharacteristic,
        this.houseService.currentHouse.shield,
        this.houseService.currentHouse.economyLevels,
        this.houseService.currentHouse.house_id
        )).subscribe((data)=>{

          for (let i = 0; i < this.houseService.housesOfCamapaign.length; i++) {

            if(this.houseService.currentHouse.house_id == this.houseService.housesOfCamapaign[i].house_id){
        
              this.houseService.housesOfCamapaign[i].house_name = this.houseService.currentHouse.house_name;
              this.houseService.housesOfCamapaign[i].activeChar = this.houseService.currentHouse.activeChar;
              this.houseService.housesOfCamapaign[i].holding_name = this.houseService.currentHouse.holding_name;
              this.houseService.housesOfCamapaign[i].familyCharacteristic = this.houseService.currentHouse.familyCharacteristic;
              this.houseService.housesOfCamapaign[i].shield = this.houseService.currentHouse.shield;
              this.houseService.housesOfCamapaign[i].economyLevels = this.houseService.currentHouse.economyLevels;
            }
        
            // console.log("houseService.housesOfCampaign con la nueva casa: " + JSON.stringify(this.houseService.housesOfCamapaign));
        
          }
      
          // console.log("ActiveChar antes del cambio al front" + this.houseService.currentHouse.activeChar);
          
          this.houseService.currentHouse = this.currentHouse;

          // console.log("ActiveChar antes del cambio al front" + this.houseService.currentHouse.activeChar);

          // console.log(data);
          
          this.houseService.modifyLayout = true;

          // console.log("houseService.currentHouse al volver a createhouse" + JSON.stringify(this.houseService.currentHouse));

          if(this.houseService.backToCurrentCampaign == true){
            this.router.navigateByUrl("/currentcampaign");
          }else{
            this.router.navigateByUrl("/housesmanagement");
          }
        })
  }

  //Vuelve a la página de gestión de casas/asignación de casas sin guardar la info.
  public cancel(){
    this.router.navigateByUrl("/createhouse");
  }





  

}
