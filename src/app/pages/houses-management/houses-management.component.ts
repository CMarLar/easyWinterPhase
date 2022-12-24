import { Component } from '@angular/core';
import { AddPlayersComponent } from '../add-players/add-players.component';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PlayerService } from '../../shared/player.service'
import { Player } from 'src/app/models/player';
import { HouseService } from 'src/app/shared/house.service';
import { House } from 'src/app/models/house';

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

  public players:Player[];

  public year:any;
  public yearEmpty:boolean

  //
  //
  // SI ALGO PETA ES CULPA DE MIGUEL POR CHECJYEAR()
  //
  //

  constructor(public router:Router,private playerService : PlayerService, public houseService : HouseService){

    this.campaignName="Campaña de Carlos"
    this.shieldImage="../../../assets/img/escudo1.png"
    this.emptyShield="../../../assets/img/emptyshield.png"
    this.profilePic="../../../assets/img/carlos-marina_9131-bw.jpg"

    //Valida para cambiar el botón
    this.housesNotAsigned=true
    this.notYear = true;

    this.players = this.playerService.playersOfCampaign;
    this.checkPlayersReady()
    // this.checkYear()

    this.year={yearNumber:null};

    this.yearEmpty=true
    console.log(this.yearEmpty);
    
  }

  //Esta función cambia las casas a null, en ngIf del html hace que si es null, borre la pluma y la calavera.
  public deleteHouse(number:number){
    console.log(number);
  for (let player of this.players){

      if(player.player_id == number){
      console.log(player.house_id);
      
      player.house_id = null
      // player.escudo = this.emptyShield //ESTO NO DEBE APARECER HASTA LA CREACION DE LA CASA


      console.log(player.house_id);
      }
      
    }
    this.checkPlayersReady()
  }
//COMPRUEBA que todos los jugadores están listos.

//arr.reduce((acumulador, valorActual[, índice[, array]]) =>[, valorInicial])

  public checkPlayersReady():void{
    this.housesNotAsigned = !this.players.reduce((acc,current)=>{
      return acc && current.house_id!=null},true)

    console.log(this.housesNotAsigned);
  }

  // public checkYear():void{
  //   if(this.year!="" || this.year!=null){
  //     this.yearEmpty = false;
  //   }
  // }
  
  public onSubmit(form:NgForm){
    console.log("Resultado");
    console.log(form.value);


    // this.checkYear()
    console.log(this.yearEmpty);
    this.router.navigateByUrl("/currentcampaign")
  }

  public goBack():void{
    this.router.navigateByUrl("/addplayers")
  }

  public goPlace():void{
    this.router.navigateByUrl("/currentcampaign")
  }

  public goToCreateHouse(id : number){
    console.log("ID:" + id);
    let newHouse : House;
    

    this.houseService.postHouse(newHouse = new House(null,null,null,null,null,null)).subscribe(function(data : any){
      console.log("DATA: " + data.insertId);
      newHouse.house_id = data.insertId;  
      console.log("CASA " + JSON.stringify(newHouse));
      
      
      
      
    })

    //ESTE FOR RECORRE AL HACER CLICK EL ARRAY DE JUGADORES DE PLAYER SERVICE
    //ENCUENTRA EL ID DEL ARRAY PLAYERS Y GUARDA ESE PLAYER EN CURRENTPLAYER
    //Y AÑADIMOS A ESE PLAYER EL ID DE LA NUEVA CASA
    for (let i = 0; i < this.playerService.playersOfCampaign.length; i++){

      if (this.playerService.playersOfCampaign[i].player_id == id){

        //BUSCAMOS EL JUGADOR EN EL ARRAY Y LO METEMOS EN CURRENTPLAYYER
        this.playerService.currentPlayer = this.playerService.playersOfCampaign[i];

        //CAMBIAMOS EN CURRENTPLAYER Y EN EL ARRAY DE PLAYER EL ID DE ESE PLAYER
        this.playerService.playersOfCampaign[i].house_id = newHouse.house_id;
        this.playerService.currentPlayer.house_id = newHouse.house_id;

        console.log("JUGADOR ACTUAL: " + JSON.stringify(this.playerService.currentPlayer));
        

        //AQUI LLAMOS AL PUT Y LE PASAMOS EL OBJETO DE CURRENT PLAYER
        this.playerService.putPlayer(this.playerService.currentPlayer)
        .subscribe(function (data : any){
          console.log("DATOS DE PUT^PLAYER: " + data);
          
        })
        //MIGUEL HAZ ALGO PARECIDO A ESTO PARA LAS CASAS
      }
    }

    this.houseService.currentHouse = newHouse;
    console.log(this.houseService.currentHouse);
    
    // console.log(this.houseService.currentHouse);
    //ESTE FOR ES PARA CAMBIAR EL ID DE LOS JUGADORES
    // for (let i = 0; i < this.players.length; i++){
    //   this.players[i].house_id = i;
    // }
    // this.router.navigateByUrl("/createhouse")
    
  }

}


