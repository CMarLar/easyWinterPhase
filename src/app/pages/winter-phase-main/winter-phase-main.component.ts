import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignService } from 'src/app/shared/campaign.service';
import { PlayerService } from 'src/app/shared/player.service';
import { Player } from 'src/app/models/player';
import { HouseService } from 'src/app/shared/house.service';
import { House } from 'src/app/models/house';
import { YearService } from 'src/app/shared/year.service';
import { CharacterService } from 'src/app/shared/character.service';
import { Year } from 'src/app/models/year';

@Component({
  selector: 'app-winter-phase-main',
  templateUrl: './winter-phase-main.component.html',
  styleUrls: ['./winter-phase-main.component.css']
})
export class WinterPhaseMainComponent {

  public campaignName:string;

  public actualYear:any;//no se usa

  public currentYear:Year;

  public players:Player[];

  public houses:House[];

  public playersAndHouses:any;

  public playersNotReady:boolean;

    constructor(public router:Router, public campaignService:CampaignService, public yearService:YearService, public playerService:PlayerService, public houseService:HouseService, ){

      this.campaignName = this.campaignService.currentCampaign.campaign_name//Esto debería importar el nombre de la campaña sin problemas
      console.log("CampaignName: " + this.campaignName);
      console.log("campaignService.currentCampaign: " + JSON.stringify(this.campaignService.currentCampaign)); 
      
      this.currentYear = this.yearService.currentYear//Esto debería importar el año
      console.log("Current year: " + JSON.stringify(this.currentYear));
      

      this.players = this.playerService.playersOfCampaign//Debería importar los jugadores de la campaña
      console.log("Players: " + JSON.stringify(this.players));

      this.houses = this.houseService.housesOfCamapaign//Importa todo el array de casas.
      console.log("Houses: " + JSON.stringify(this.houses));

      console.log("houseService.housesOfCampaign: " + JSON.stringify(this.houseService.housesOfCamapaign));

      /*Tenemos dos arrays (players y houses) y hay que convertirlo en uno para que salgan los dos en la misma línea

      La posición de una casa en el array houses pertenece al jugador con la misma posición en el array players. Los dos arrays tienen misma length.

      */

      for (let i = 0; i < this.players.length; i++) {
        this.playersAndHouses[i].player.player_id = this.players[i].player_id;
        this.playersAndHouses[i].player.house_id = this.players[i].house_id;
        this.playersAndHouses[i].player.campaign_id = this.players[i].campaign_id;
        this.playersAndHouses[i].player.player_name = this.players[i].player_name;
        this.playersAndHouses[i].player.winterPhaseDone = this.players[i].winterPhaseDone;
        console.log(this.playersAndHouses.player[i]);
        
      }

      for (let i = 0; i < this.houses.length; i++) {
        this.playersAndHouses[i].houses.house_id = this.houses[i].house_id;
        this.playersAndHouses[i].houses.house_name = this.houses[i].house_name;
        this.playersAndHouses[i].houses.activeChar = this.houses[i].activeChar;
        this.playersAndHouses[i].houses.holding_name = this.houses[i].holding_name;
        this.playersAndHouses[i].houses.familyCharacteristic = this.houses[i].familyCharacteristic;
        this.playersAndHouses[i].houses.shield = this.houses[i].shield;
        this.playersAndHouses[i].houses.economyLevels = this.houses[i].economyLevels;
        console.log(this.playersAndHouses.houses[i]);
      }
      
      console.log("Players and Houses"  + this.playersAndHouses);
      console.log("Players and Houses stringy"  + JSON.stringify(this.playersAndHouses));
      

      // this.actualYear = 
      // {
      //   yearid:4,
      //   yearNumber:488,
      //   isFirstYear:false,
      //   isLastYear:true,
      //   notes:"Mamasé, mamasá, mamá cusá",
      //   players:
      //     [
      //     {id:1, name:"Carlos",activeChar:"Sir Balin",house:"Salisbury",shield:"../../../assets/img/escudo1.png",winterPhaseDone:false},
      //     {id:2, name: "Irene", activeChar:"Sir Edward of Cambridge",house:"Cambridge",shield:"../../../assets/img/escudo2.png",winterPhaseDone:false},
      //     {id:3, name: "Miguel", activeChar:"Sir Manfred",house:"Newton",shield:"../../../assets/img/escudo3.png",winterPhaseDone:true},
      //     {id:4, name: "María José", activeChar:"Lord Grey",house:"Grey",shield:"../../../assets/img/escudo4.png",winterPhaseDone:true},
      //     {id:null, name: null, activeChar:null,house:null,shield:"../../../assets/img/escudo5.png",winterPhaseDone:false},
      //     {id:null, name: null, activeChar:null,house:null,shield:"../../../assets/img/escudo6.png",winterPhaseDone:false}
      //     ]
      // }


      this.playersNotReady = true//puesto en true para hacer pruebas
      console.log(`Falta por completar la FI de al menos un jugador: ${this.playersNotReady}`);
      
      // this.checkPlayersReady();

    }


    public doWinterPhase(){
      this.router.navigateByUrl("/phase1")
    }

    // // FALTA REHACER ESTA
    // public checkPlayersReady(){
    //   for (let i = 0; i < this.actualYear.players.length; i++) {

    //     if(this.actualYear.players[i].winterPhaseDone==false && this.actualYear.players[i].id!=null){

    //       this.playersNotReady = true;
    //       console.log(`Falta por completar la FI de al menos un jugador: ${this.playersNotReady}`);
    //       break;//no se lo contéis a Jose.

    //     }else{

    //       this.playersNotReady = false;
    //       console.log(`Falta por completar la FI de al menos un jugador: ${this.playersNotReady}`);

    //     }
        
    //   }

    // }

    public nextYear(){
      //Esta función tendrá que añadir un nuevo año al objeto campaña con yearId + 1, yearNumber +1, notes = "", isLastYear=true y los datos actualizados de todas las casas 

      this.router.navigateByUrl("/currentcampaign")


    }

}
