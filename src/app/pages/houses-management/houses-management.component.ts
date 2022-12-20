import { Component } from '@angular/core';
import { AddPlayersComponent } from '../add-players/add-players.component';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

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
  public housesNotAsigned:boolean;

  public notYear : boolean

  public players:any;

  public year:any;
  public yearEmpty:boolean


  constructor(public router:Router){

    this.campaignName="Campaña de Carlos"
    this.shieldImage="../../../assets/img/escudo1.png"
    this.emptyShield="../../../assets/img/emptyshield.png"
    this.profilePic="../../../assets/img/carlos-marina_9131-bw.jpg"

    //Valida para cambiar el botón
    this.housesNotAsigned=true
    this.notYear = true;

    this.players=[
      
      {id: 1, jugador:"Carlos M",casa:"Salisbury",escudo:this.shieldImage},
      {id: 2, jugador:"Irene",casa:"Berwick",escudo:this.shieldImage},
      {id: 3, jugador:"Carlos M",casa:"Salisbury",escudo:this.shieldImage},
      // {id: 4, jugador:"Pepe",casa:null,escudo:this.emptyShield},
      // {id: 5, jugador:"Miguel",casa:null,escudo:this.emptyShield},
      {id: 6, jugador:"Miguel",casa:"López",escudo:this.shieldImage},
    ]
    this.checkPlayersReady()
    this.checkYear()

    this.year={yearNumber:null};

    this.yearEmpty=true
    console.log(this.yearEmpty);
    
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
    this.housesNotAsigned = !this.players.reduce((acc,current)=>{
      return acc && current.casa!=null},true)

    console.log(this.housesNotAsigned);
  }

  public checkYear():void{
    if(this.year!="" || this.year!=null){
      this.yearEmpty = false;
    }
  }
  
  public onSubmit(form:NgForm){
    console.log("Resultado");
    
    console.log(form.value);
    this.checkYear()
    console.log(this.yearEmpty);
    this.router.navigateByUrl("/currentcampaign")
  }

  public goBack():void{
    this.router.navigateByUrl("/addplayers")
  }

  public goPlace():void{
    this.router.navigateByUrl("/currentcampaign")
  }


}


