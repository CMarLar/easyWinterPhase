import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HouseService } from 'src/app/shared/house.service';
import { House } from 'src/app/models/house';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/shared/character.service';


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
  public activeChar;

  //Comprueba que hay al menos un personaje creado para habilitar el botón Confirmar
  public noNpcs;

  ///////ATRIBUTOS AÑADIDOS PARA CONECTAR CON EL BACK (las de arriba son fake)//////

  public currentHouse:House;

  public currentHouseName:string;

  public currentHouseId:number;

  public currentHouseChars:Character[];

  public currentHouseShield:string;

  public newCharacter:Character;//El personaje que se crea con el formulario.

  constructor(public router:Router, public characterService:CharacterService, public houseService:HouseService){

    this.houseName="Casa Salisbury"

    this.status = ["Vivo/a","Muerto/a"];

    this.role = ["Hijo/a", "Esposa", "Amante", "Escudero"]

    this.sex = ["Hombre","Mujer"]

    this.npcs=
    [
      {id: 1, name:"Ultan",age:10,role:"Hijo/a",sex:"Hombre",status:1},
      {id: 2, name:"Jorge",age:16,role:"Escudero",sex:"Hombre",status:0},
      {id: 3, name:"Wanda",age:20,role:"Hermano",sex:"Hombre",status:1},
    ]
    //status true = vivo

    //El id de este personaje es 1000, su id será autoincrementado
    this.formNpc = {id: 4, name:"",age:0,role:"",sex:"",status:true};

    this.activeChar={id: 2000, name:"",age:0,role:"",sex:"",status:""}
    
    this.noNpcs=false//al principio sí hay al menos dos personajes

    ///////VALORES AÑADIDOS PARA CONECTAR CON EL BACK (las de arriba son fake)//////    
    
    this.currentHouse = this.houseService.currentHouse;//se lleva la casa del servicio 

    this.currentHouseId = this.houseService.currentHouseId;//se lleva el ID de la casa

    this.currentHouseChars = this.characterService.currentHouseChars//Recoge los personajes del array de personajes con el caballero y el escudero

    this.currentHouseName = this.houseService.currentHouse.house_name;//recoge el nombre de la casa

    this.currentHouseShield = this.houseService.currentHouse.shield// recoge el escudo

    this.newCharacter = new Character(null,this.currentHouseId,null,null,null,1,0,0,0,null,null)//se tiene que rellenar con el form

    console.log("Casa actual: " + this.currentHouse);

    console.log("Id del personaje activo: " + this.currentHouse.activeChar);
    
    this.checkNpcs()

  }
  //Borra personaje EN EL FRONT
  public deleteChar(id:number){
    this.currentHouseChars.splice(id -1,1)
    console.log(this.npcs);
    if(this.currentHouseChars.length==0){this.noNpcs=true}
    
  }

    //Cambia el Estado de un personaje de vivo a muerto.

  public deadOrAlive(id:number){
    console.log("click");

    console.log(this.currentHouseChars);

    for (let i = 0; i < this.currentHouseChars.length; i++) {
      if(this.currentHouseChars[i].character_id == id){

        if(this.currentHouseChars[i].char_status == 1){
          this.currentHouseChars[i].char_status = 0
          console.log("Cambiado a muerto");
          
        }else if(this.currentHouseChars[i].char_status == 0){
          this.currentHouseChars[i].char_status = 1
          console.log("Cambiado a vivo");

        } 
      }
    }
  }
    
  //   //no puedes pasar la posición así
  //   if(this.currentHouseChars[id-1].char_status==1){

  //     this.currentHouseChars[id-1].char_status==0

  //   }else if(this.currentHouseChars[id-1].char_status==0){

  //     this.currentHouseChars[id-1].char_status==1

  //   }
  // }

  // public modifyChar(id:number){
  //   //Esta función debería poder editar los detalles de un npc, pero no se ha inplementado por falta de tiempo. Lo dejamos para versiones futuras
  // }

  public onSubmit(form:NgForm){
    console.log(form.value);

    if(form.value.role == form.value.otherRole){

      delete form.value.otherRole;
      console.log("Elegido role del selector:");
      console.log(form.value);
      
    }else{

      form.value.role = form.value.otherRole;
      delete form.value.otherRole;
      console.log("Aplicado nuevo role del campo");
      console.log(form.value);
      
    }
    
    let formNpcCopy = {...form.value}
    
    console.log("formNpcCopy con spread operator: " + formNpcCopy);
    

    this.currentHouseChars.push(
      new Character (null,this.currentHouseId,null,formNpcCopy.char_name,formNpcCopy.age,1,0,0,0,formNpcCopy.role,formNpcCopy.sex)
    );
    console.log(this.currentHouseChars);  
    
  }
  //Marca a un personaje como el personaje activo
  public onSelect(form:NgForm){
    console.log("Form value:" + JSON.stringify(form.value));
    this.activeChar = form.value;

    console.log("activeChar:" + JSON.stringify(this.activeChar));
    
    // this.activeChar = this.npcs[arrElement];
  }
  //Si hay personajes en el array de npcs, cambia noNpcs a false
  public checkNpcs(){
    if(this.currentHouseChars.length != 0){this.noNpcs=false}
  }
  
  //Vuelve a la página de gestión de casas/asignación de casas guardando la información.
  public goBack(){
    this.router.navigateByUrl("/createhouse");
  }

  //Vuelve a la página de gestión de casas/asignación de casas sin guardar la info.
  public cancel(){
    this.router.navigateByUrl("/createhouse");
  }


  

}
