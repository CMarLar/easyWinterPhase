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

  public newHouse : House;

  //
  //
  // SI ALGO PETA ES CULPA DE MIGUEL POR CHECJYEAR()
  //
  //

  constructor(public router:Router,public playerService : PlayerService, public houseService : HouseService){

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
    //IMPORTANTE
    //IMPORTANTE
    //IMPORTANTE
    //IMPORTANTE
    //IMPORTANTE
    //IMPORTANTE
    //IMPORTANTE
    //IMPORTANTE
    //IMPORTANTE
    //IMPORTANTE
    //IMPORTANTE
    //IMPORTANTE
    //IMPORTANTE
    //IMPORTANTE
    //IMPORTANTE
    //IMPORTANTE
    //REVISAR ESTA PARTE DEL CODIGO, POR ALGUNA RAZON NO ENTRA EN LOS CONDICIONALES
    console.log(number);
    for (let player of this.players){

      if(player.player_id == number){
        console.log(player.house_id);
      
        player.house_id = null
        for (let i = 0; i < this.houseService.housesOfCamapaign.length; i++){

          if (this.houseService.housesOfCamapaign[i].house_id == number){

            this.playerService.putPlayer(new Player(player.player_id,null,player.campaign_id,player.player_name,player.winterPhaseDone))
            .subscribe((data : any) => {

              for (let j = 0; j < this.playerService.playersOfCampaign.length; j++){

                if(this.playerService.playersOfCampaign[j].house_id == number){
                  this.playerService.playersOfCampaign[j].house_id == null;

                  this.houseService.deleteHouse(this.houseService.housesOfCamapaign[i])
                  .subscribe((data : any) => {
                    console.log("HOLA HOLITA VECINITO");
                    
                    this.houseService.housesOfCamapaign.splice(i,1);
                  })
                }
              }
            })
          }
        }
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
    
    

    this.houseService.postHouse(this.newHouse = new House(null,null,null,null,null,null)).subscribe((data : any) =>{
      console.log("DATA: " + data.insertId);
      this.newHouse.house_id = data.insertId;  
      this.houseService.housesOfCamapaign.push(this.newHouse);
      console.log("CASA " + JSON.stringify(this.newHouse));
      
      //HAY QUE METER DE ALGUNA FORMA ESTE BUCLE FOR DENTRO DEL OBSERVABLE
      console.log("NEEEEEEEEEEEEW JOUUUUUUUUUUSE" + JSON.stringify(this.newHouse));
    
      //ESTE FOR RECORRE AL HACER CLICK EL ARRAY DE JUGADORES DE PLAYER SERVICE
      //ENCUENTRA EL ID DEL ARRAY PLAYERS Y GUARDA ESE PLAYER EN CURRENTPLAYER
      //Y AÑADIMOS A ESE PLAYER EL ID DE LA NUEVA CASA
      for (let i = 0; i < this.playerService.playersOfCampaign.length; i++){

        if (this.playerService.playersOfCampaign[i].player_id == id){

          //BUSCAMOS EL JUGADOR EN EL ARRAY Y LO METEMOS EN CURRENTPLAYYER
          this.playerService.currentPlayer = this.playerService.playersOfCampaign[i];

          //CAMBIAMOS EN CURRENTPLAYER Y EN EL ARRAY DE PLAYER EL ID DE ESE PLAYER
          this.playerService.playersOfCampaign[i].house_id = data.insertId;
          this.playerService.currentPlayer.house_id = data.insertId;
          console.log("NEW HOUSE ID: " + this.newHouse.house_id);

            this.houseService.currentHouseId = this.newHouse.house_id// @Miguel, he metido esta línea para recogerla en createhouse
          
          console.log("JUGADOR ACTUAL: " + JSON.stringify(this.playerService.currentPlayer));
          
          //CREO ESTA FUNCION PARA REALIZAR OTRO OBSERVABLE EN EL CUAL SE ACTUALIZARAN LOS
          //JUGADORES Y SE LES ASIGNARA LA CASA CREADA AL PULSAR SOBRE ELLOS
          this.updatePlayer();
          
          //MIGUEL HAZ ALGO PARECIDO A ESTO PARA LAS CASAS
        }
      }
      
    })
    
  }

  public updatePlayer(){

    //AQUI LLAMAMOS AL PUT Y LE PASAMOS EL OBJETO DE CURRENT PLAYER
    this.playerService.putPlayer(this.playerService.currentPlayer)
    .subscribe((data : any) => {
      console.log("DATOS DE PUT PLAYER: " + data);
      this.router.navigateByUrl("/createhouse")
    })
    console.log("ASI QUEDAN LOS JUGADORES: " + JSON.stringify(this.playerService.playersOfCampaign));
    
    

  }

}


