import { Component } from '@angular/core';
import { AddPlayersComponent } from '../add-players/add-players.component';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { PlayerService } from '../../shared/player.service'
import { Player } from 'src/app/models/player';
import { HouseService } from 'src/app/shared/house.service';
import { House } from 'src/app/models/house';
import { YearService } from 'src/app/shared/year.service';
import { Year } from 'src/app/models/year';
import { CampaignService } from 'src/app/shared/campaign.service';
import { CharacterService } from 'src/app/shared/character.service';
import { UserService } from 'src/app/shared/user.service';

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

  public year : any;
  public yearEmpty:boolean

  public newHouse : House;
  public avatar1: string;

  //
  //
  // SI ALGO PETA ES CULPA DE MIGUEL POR CHECJYEAR()
  //
  //

  constructor(public router:Router,public playerService : PlayerService, public houseService : HouseService, public yearService : YearService,public campaignService : CampaignService, public characterService:CharacterService,public userService : UserService){

    this.campaignName="Campaña de Carlos"
    this.shieldImage="../../../assets/img/escudo1.png"
    this.emptyShield="../../../assets/img/emptyshield.png"
    this.avatar1= "../../../assets/img/avatar2.png"

    //Valida para cambiar el botón
    this.housesNotAsigned=true
    this.notYear = true;

    this.players = this.playerService.playersOfCampaign;
    this.checkPlayersReady()
    // this.checkYear()

    this.year={yearNumber:null};

    this.yearEmpty=true
    console.log(this.yearEmpty);

    console.log("houseService.housesOfCampaign: " + JSON.stringify(this.houseService.housesOfCamapaign));
    
    console.log("allCampaignCharacters: " + JSON.stringify(this.characterService.allCharactersOfCampaign));
    
  }

  //Esta función cambia las casas a null, en ngIf del html hace que si es null, borre la pluma y la calavera.
  public deleteHouse(idPlayer:number,idCasa : number){
    
    console.log("ESTO ES 1: " + JSON.stringify(this.playerService.playersOfCampaign));
    console.log("ESTO ES ID PLAYER: " + idPlayer);
    console.log("ESTO ES ID CASA: " + idCasa);

    for (let i = 0; i < this.playerService.playersOfCampaign.length; i++){

      if (this.playerService.playersOfCampaign[i].player_id == idPlayer){

        this.playerService.currentPlayer = this.playerService.playersOfCampaign[i];

        this.playerService.currentPlayer.house_id = null;

        this.updatePlayer();

        for (let j = 0; j < this.houseService.housesOfCamapaign.length; j++){

          if (this.houseService.housesOfCamapaign[j].house_id == idCasa){
            
            this.houseService.currentHouse = this.houseService.housesOfCamapaign[j];

            this.houseService.deleteHouse(this.houseService.currentHouse)
            .subscribe((data) => {

              this.houseService.currentHouse = null;
              this.checkPlayersReady();
            })
          }
        }
      }
    }
  }
//COMPRUEBA que todos los jugadores están listos.

//arr.reduce((acumulador, valorActual[, índice[, array]]) =>[, valorInicial])

  public checkPlayersReady():void{
    this.players = this.playerService.playersOfCampaign
    this.housesNotAsigned = !this.players.reduce((acc,current)=>{
      return acc && current.house_id!=null},true)

    console.log("REDUCE: " + this.housesNotAsigned);
  }
  
  public onSubmit(form:NgForm){
    console.log("Resultado");
    console.log(form.value);

    for (let values in form.value) {
      // console.log(form.value[values]);

      if(form.value[values] != undefined){

        this.yearService.currentYear = new Year (null,parseInt(form.value[values]),1,1,"EJEMPLO DE NOTAS",this.campaignService.currentCampaign.campaign_id);
        this.yearService.yearsOfCampaign.push(this.yearService.currentYear);
        
        
        this.yearService.postYear(this.yearService.currentYear)
        .subscribe((data : any) => {

          this.yearService.currentYear.year_id = data.insertId;
          
          this.yearService.yearsOfCampaign[0].year_id = data.insertId;

          console.log("ESTOS SON LOS PNJ ANTES DE MODIFICAR SU AÑO: " + JSON.stringify(this.characterService.allCharactersOfCampaign));
          
          for (let i = 0; i < this.characterService.allCharactersOfCampaign.length; i++){
            this.characterService.allCharactersOfCampaign[i].year_id = this.yearService.currentYear.year_id;
            
            console.log("ESTE ES EL LOG DEL AÑO ACTUAL: " + this.yearService.currentYear.year_id);
            console.log("ESTE ES EL LOG DEL AÑO ACTUAL DE LOS PNJ: " + this.characterService.allCharactersOfCampaign[i].year_id);

            this.characterService.modifyCharacter(this.characterService.allCharactersOfCampaign[i])
            .subscribe((data : any) => {

            })
          }
          
        })
        

      }

    }

    this.router.navigateByUrl("/currentcampaign");

    // this.checkYear()
    console.log(this.yearEmpty);
    // this.router.navigateByUrl("/currentcampaign")
  }

  public goBack():void{
    this.router.navigateByUrl("/addplayers")
  }

  public goPlace():void{
    this.router.navigateByUrl("/currentcampaign")
  }

  public goToCreateHouse(id : number){
    console.log("ID:" + id);
    
    this.houseService.modifyLayout = undefined;//Esto hace que siempre salga la plantilla con los campos para caballero y escudero

    this.houseService.postHouse(this.newHouse = new House(null,null,null,null,null,null,null)).subscribe((data : any) =>{
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


            this.houseService.currentHouse = this.newHouse
            this.houseService.currentHouseId = this.newHouse.house_id// @Miguel, he metido estas líneas para recogerla en createhouse
          
            console.log("HOUSE SERVICE: " + JSON.stringify(this.houseService.currentHouse));
            
          console.log("JUGADOR ACTUAL: " + JSON.stringify(this.playerService.currentPlayer));
          
          //CREO ESTA FUNCION PARA REALIZAR OTRO OBSERVABLE EN EL CUAL SE ACTUALIZARAN LOS
          //JUGADORES Y SE LES ASIGNARA LA CASA CREADA AL PULSAR SOBRE ELLOS
          this.updatePlayer();
          this.router.navigateByUrl("/createhouse");
          //MIGUEL HAZ ALGO PARECIDO A ESTO PARA LAS CASAS
        }
      }
      
    })
  }

  public modifyHouse(house_id : number){

    this.houseService.modifyLayout = true;//para que salga el desplegable en createhouse

    for (let i = 0; i < this.houseService.housesOfCamapaign.length; i++){

      if (this.houseService.housesOfCamapaign[i].house_id == house_id){

        this.houseService.currentHouse = this.houseService.housesOfCamapaign[i];
        this.router.navigateByUrl("/createhouse");

      }
    }
  }

  public updatePlayer(){

    //AQUI LLAMAMOS AL PUT Y LE PASAMOS EL OBJETO DE CURRENT PLAYER
    this.playerService.putPlayer(this.playerService.currentPlayer)
    .subscribe((data : any) => {
      console.log("DATOS DE PUT PLAYER: " + data);
      // this.router.navigateByUrl("/createhouse")
    })
    console.log("ASI QUEDAN LOS JUGADORES: " + JSON.stringify(this.playerService.playersOfCampaign));
    
    

  }

}


