import { Component } from '@angular/core';
import { AddPlayersComponent } from '../add-players/add-players.component';

@Component({
  selector: 'app-houses-management',
  templateUrl: './houses-management.component.html',
  styleUrls: ['./houses-management.component.css']
})
export class HousesManagementComponent {

  public profilePic:string;
  public campaignName:string;
  public shieldImage:string;
  public emptyShield:string;
  public playerName:string;
  public houseName:string;
  public asignedHouse:boolean;

  public players;

  constructor(){

    this.campaignName="Campaña de Carlos"
    this.shieldImage="../../../assets/img/escudo1.png"
    this.emptyShield="../../../assets/img/emptyshield.png"
    this.profilePic="../../../assets/img/carlos-marina_9131-bw.jpg"

    //Valida para cambiar el botón
    this.asignedHouse=true

    this.players=[
      
      {id: 1, jugador:"Carlos M",casa:"Salisbury",escudo:this.shieldImage},
      {id: 2, jugador:"Irene",casa:"Berwick",escudo:this.shieldImage},
      {id: 3, jugador:"Carlos M",casa:"Salisbury",escudo:this.shieldImage},
      // {id: 4, jugador:"Pepe",casa:null,escudo:this.emptyShield},
      // {id: 5, jugador:"Miguel",casa:null,escudo:this.emptyShield},
      {id: 6, jugador:"Miguel",casa:"López",escudo:this.shieldImage},
    ]
    this.checkPlayersReady()

  }

  //Esta función cambia las casas a null, en ngIf del html hace que si es null, borre la pluma y la calavera.
  public deleteHouse(number:number){
    console.log(number);
  for (let player of this.players){

      if(player.id == number){
      console.log(player.casa);
      
      player.casa = null
      player.escudo = this.emptyShield

      console.log(player.casa);
      }
      
    }
    this.checkPlayersReady()
  }
//COMPRUEBA que todos los jugadores están listos. No funciona el primero

//arr.reduce((acumulador, valorActual[, índice[, array]]) =>[, valorInicial])

  public checkPlayersReady():void{
    this.asignedHouse = !this.players.reduce((acc,current)=>{
      return acc && current.casa!=null},true)

    console.log(this.asignedHouse);
    

  }



}


