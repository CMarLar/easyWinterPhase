import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';


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

  //Estado del personaje: vivo o muerto
  public status;

  //Transforma true o false en un string
  public deadOrAliveString:string;

  //Rol del personaje
  public role;

  //Sexo
  public sex;

  //PJ Activo
  public activeChar;

  //Comprueba que hay al menos un personaje creado para habilitar el botón Confirmar
  public noNpcs;

  constructor(public router:Router){

    this.houseName="Casa Salisbury"

    this.status = ["Vivo/a","Muerto/a"];

    this.role = ["Hijo/a", "Esposa", "Amante", "Escudero"]

    this.sex = ["Hombre","Mujer"]

    this.npcs=
    [
      {id: 1, name:"Ultan",age:10,role:"Hijo/a",sex:"Hombre",status:true},
      {id: 2, name:"Jorge",age:16,role:"Escudero",sex:"Hombre",status:false},
      {id: 3, name:"Wanda",age:20,role:"Hermano",sex:"Hombre",status:true},
    ]
    //status true = vivo

    //El id de este personaje es 1000, su id será autoincrementado
    this.formNpc = {id: 4, name:"",age:0,role:"",sex:"",status:true};

    this.activeChar={id: 2000, name:"",age:0,role:"",sex:"",status:""}
    this.noNpcs=true

    this.checkNpcs()


  }
  //Borra personaje EN EL FRONT
  public deleteChar(id:number){
    this.npcs.splice(id -1,1)
    console.log(this.npcs);
    if(this.npcs.length==0){this.noNpcs=true}
    
  }

    //Cambia el Estado de un personaje de vivo a muerto.

  public deadOrAlive(id:number){
    console.log("click");
    
    if(this.npcs[id-1].status==true){

      this.npcs[id-1].status=false

    }else if(this.npcs[id-1].status==false){

      this.npcs[id-1].status=true

    }
  }

  public modifyChar(id:number){
    //Esta función debería poder editar los detalles de un npc, pero no se ha inplementado por falta de tiempo. Lo dejamos para versiones futuras
  }

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
    
    let formNpcCopy = {...this.formNpc}

    this.npcs.push(formNpcCopy);
    console.log(this.npcs); 
    console.log(formNpcCopy);
    
    
  }
  //Marca a un personaje como el personaje activo
  public onSelect(form:NgForm){
    console.log(form.value);
    console.log(this.activeChar);
    
    // this.activeChar = this.npcs[arrElement];
  }
  //Si hay personajes en el array de npcs, cambia noNpcs a false
  public checkNpcs(){
    if(this.npcs.length != 0){this.noNpcs=false}
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
