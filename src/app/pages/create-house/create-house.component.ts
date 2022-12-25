import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HouseService } from 'src/app/shared/house.service';
import { House } from 'src/app/models/house';
import { Character } from 'src/app/models/character';
import { CharacterService } from 'src/app/shared/character.service';


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
  
  public knight:Character;
    public knightName:string;
    public knightAge:number;
  public squire:Character;
    public squireName:string;
    public squireAge:number = 15;

  public alreadyAdded:boolean;//hace disabled el botón añadir cuando se crean los dos personajes


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
  public npcs:string[];

  //Hace un string para mostrarlo. Llamada desde div npc_list
  public stringNpcs:string;

    constructor(public router:Router, public characterService:CharacterService, public houseService:HouseService){
      this.shields = [this.shield1,this.shield2,this.shield3,this.shield4,this.shield5,
                      this.shield6,this.shield7,this.shield8,this.shield9,this.shield10]
  
  
      this.noNPC=false//ACUÉRDATE DE CAMBIARLO A TRUE DESPUÉS DE HACER LAS PRUEBAS
      console.log(this.noNPC);
      
    //Mostrar el escudo seleccionado:
    this.selectedShield
  
  //MANIPULA ESTO PARA METER PERSONAJES
      this.npcs=[];

    //Hace el strgin de personajes y ejecuta checkNPC.
      this.changeNpcString()

      // this.checkNPC()
      // console.log(this.noNPC);
      
      this.house = {nombreCasa:this.nombreCasa,
                    feudo:this.feudo,
                    caracteristicaFamiliar:this.caracteristicaFamiliar,
                    nivelManutencion:this.nivelManutencion,
                    nombrePJ:this.nombrePJ,
                    edad:this.edad,
                    nombreEscudero:this.nombreEscudero,
                    npc:this.npc}
      
      this.nivelesManutencion= ["Indigente","Pobre","Normal","Rico","Muy Rico"]

      this.currentHouseId = 76;//pruebas


      this.actualHouse = new House(this.house_name,null,this.holding_name,this.familyCharactersitic,this.selectedShield,null);

      this.knight = new Character(null,this.currentHouseId,null,this.knightName,this.knightAge,true,false,0,0,null);

      this.squire = new Character(null,this.currentHouseId,null,this.squireName,this.squireAge,true,false,0,0,"Escudero");

      this.alreadyAdded = false;

    }


//Selector de escudo
public selectHouseShield(shield:string){
  console.log(shield);
  this.selectedShield = shield;



  
}
//Cambia el estado de noNPC para quitar disable del botón
public checkNPC(){
  if(this.npcs.length>0){this.noNPC=false}
}

public changeNpcString(){
  console.log(this.npcs.length);
  
  if(this.npcs.length>0)
  {
    this.stringNpcs = "PNJs: " + this.npcs.join(`, `);
    this.checkNPC()
    console.log(this.noNPC);
    
  }else
  {
    this.stringNpcs = "Aún no has añadido PNJs a tu casa. Pulsa en PNJ para añadir al menos uno."
  }
}
//Formulario, guardar cambios, volver a página de asignación de casas
public onSubmit(form:NgForm){
  console.log(form.value);
  form.value.shield = this.selectedShield;//funciona para meter el escudo seleccionado
  form.value.house_id = this.currentHouseId; //puesto el id directamente para probar
  console.log(form.value);

  this.houseService.updateHouse(
    this.actualHouse = new House(
      this.actualHouse.house_name,
      null,
      this.actualHouse.holding_name,
      this.actualHouse.familyCharacteristic,
      this.selectedShield,this.currentHouseId))
      .subscribe((data)=>{

        console.log(data);
    
      })

  // this.goBack(); //Reactiva este routing cuando termines
  
}

public submitPlayerInfo(form:NgForm){;
  
  console.log(form.value);//pasa un objeto con los nombres del caballero y el escudero y la edad del caballero


  this.knightName = form.value.knight_name;
  this.knightAge = parseInt(form.value.knight_age);//para que no lo coja como string la edad
  this.squireName = form.value.squire_name;

  console.log(this.knight);
  console.log(this.squire);

  //Crea caballero
  this.characterService.newCharacter(this.knight).subscribe((data) =>{

    console.log(data);

  })

  //Crea escudero
  this.characterService.newCharacter(this.squire).subscribe((data) =>{

    console.log(data);

  })
  
  this.alreadyAdded = true;
  
}

//Va a la página de añadir pnjs al pulsar el botón añadir pnjs.
public goAddNpcs(){


  // this.router.navigateByUrl("/addnpc"); //reactivalo cuando termines
}

//Va atrás sin guardar los cambios al pulsar el botón cancelar
public goBack(){
  this.router.navigateByUrl("/housesmanagement");
}


// id1=document.getElementById("1");
// id2=document.getElementById("2");
// id3=document.getElementById("3");
// id4=document.getElementById("4");
// id5=document.getElementById("5");
// id6=document.getElementById("6");
// id7=document.getElementById("7");
// id8=document.getElementById("8");
// id9=document.getElementById("9");
// id10=document.getElementById("10");
// id11=document.getElementById("11");
// id12=document.getElementById("12");
// id13=document.getElementById("13");
// id14=document.getElementById("14");
// id15=document.getElementById("15");

// public enlargeImg(id){
//   document.getElementById(id).style.scale="2.5"
//   console.log("OK");
  
// }




}
