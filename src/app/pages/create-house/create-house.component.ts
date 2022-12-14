import { Component } from '@angular/core';

@Component({
  selector: 'app-create-house',
  templateUrl: './create-house.component.html',
  styleUrls: ['./create-house.component.css']
})
export class CreateHouseComponent {

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
  public shield11="../../../assets/img/escudo10.png"
  public shield12="../../../assets/img/escudo10.png"
  public shield13="../../../assets/img/escudo10.png"
  public shield14="../../../assets/img/escudo10.png"
  public shield15="../../../assets/img/escudo10.png"
  
  //True -> No hay NPCs
  public noNPC:boolean;
  
  //Array de npcs.
  public npcs:string[];

  //Hace un string para mostrarlo. Llamada desde div npc_list
  public stringNpcs;

  constructor(){
    this.shields = [this.shield1,this.shield2,this.shield3,this.shield4,this.shield5,
                    this.shield6,this.shield7,this.shield8,this.shield9,this.shield10,
                    this.shield11,this.shield12,this.shield13,this.shield14,this.shield15]


    this.noNPC=true


    

  //Cambia estado de noNPC.
    this.checkNPC()
  }

//Selector de escudo
public selectHouseShield(shield:string){
  console.log(shield);
  
}

public checkNPC(){
  if(this.npcs.length>0){this.noNPC==false}
}

public changeNpcString(){
  if(this.npcs.length>0)
  {
    this.stringNpcs == "Aún no has añadido PNJs a tu casa. Pulsa en PNJ para añadir al menos uno."
  }else
  {
    this.stringNpcs = "PNJs: " + this.npcs.join(`, `);
  }
}

}