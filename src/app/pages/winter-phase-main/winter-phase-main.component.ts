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

  public playersAndHouses:any;//Array de objetos literales que agrupan las casa del jugador y el jugador.

  public playersNotReady:boolean;

    constructor(public router:Router, public campaignService:CampaignService, public yearService:YearService, public playerService:PlayerService, public houseService:HouseService, public characterService:CharacterService, ){

      this.campaignName = this.campaignService.currentCampaign.campaign_name;
      console.log("CampaignName: " + this.campaignName);

      console.log("campaignService.currentCampaign: " + JSON.stringify(this.campaignService.currentCampaign)); 
      
      this.currentYear = this.yearService.currentYear//Esto debería importar el año
      console.log("Current year: " + JSON.stringify(this.currentYear));
      

      this.players = this.playerService.playersOfCampaign//Debería importar los jugadores de la campaña
      console.log("Players: " + JSON.stringify(this.players));

      this.houses = this.houseService.housesOfCamapaign//Importa todo el array de casas.
      console.log("Houses: " + JSON.stringify(this.houses));


      this.playersAndHouses = [];

      //Llenamos el array playersAndHouses
      for (let i = 0; i < this.players.length; i++) {
        this.playersAndHouses.push({player: {player_id:null,house_id:null,campaign_id:null,player_name:null,winterPhaseDone:null},
                                    house:{house_id:null,house_name:null,activeChar:null,holding_name:null,familyCharacteristic:null,shield:null,economyLevels:null}})
        
      }
      
      for (let i = 0; i < this.players.length; i++) {
        this.playersAndHouses[i].player.player_id = this.players[i].player_id;
        this.playersAndHouses[i].player.house_id = this.players[i].house_id;
        this.playersAndHouses[i].player.campaign_id = this.players[i].campaign_id;
        this.playersAndHouses[i].player.player_name = this.players[i].player_name;
        this.playersAndHouses[i].player.winterPhaseDone = this.players[i].winterPhaseDone;
        
      }

      for (let i = 0; i < this.houses.length; i++) {
        this.playersAndHouses[i].house.house_id = this.houses[i].house_id;
        this.playersAndHouses[i].house.house_name = this.houses[i].house_name;
        this.playersAndHouses[i].house.activeChar = this.houses[i].activeChar;
        this.playersAndHouses[i].house.holding_name = this.houses[i].holding_name;
        this.playersAndHouses[i].house.familyCharacteristic = this.houses[i].familyCharacteristic;
        this.playersAndHouses[i].house.shield = this.houses[i].shield;
        this.playersAndHouses[i].house.economyLevels = this.houses[i].economyLevels;

      }
      
      console.log("Players and Houses con players y houses"  + JSON.stringify(this.playersAndHouses));

      console.log("ALL CHARACTERS OF CAMPAIGN: " + JSON.stringify(this.characterService.allCharactersOfCampaign));//aquí da vacío, porque pasa de página antes de que el array se llene con los personajes. En el console log, se puede ver que después se llena.
      

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


    public doWinterPhase(house_id:number){

      console.log("ALL CHARACTERS OF CAMPAIGN: " + JSON.stringify(this.characterService.allCharactersOfCampaign))

      for (let i = 0; i < this.playersAndHouses.length; i++) {
        if(this.playersAndHouses[i].player.house_id == house_id){

          this.playersAndHouses[i].player.winterPhaseDone = 1//PRUEBA PARA VER EL CAMBIO DEL BOTÓN

          //Igualamos la casa del servicio a la casa del componente
          this.houseService.currentHouse.house_id = this.playersAndHouses[i].house.house_id;
          this.houseService.currentHouse.house_name = this.playersAndHouses[i].house.house_name;
          this.houseService.currentHouse.activeChar = this.playersAndHouses[i].house.activeChar;
          this.houseService.currentHouse.holding_name = this.playersAndHouses[i].house.holding_name;
          this.houseService.currentHouse.familyCharacteristic = this.playersAndHouses[i].house.familyCharacteristic;
          this.houseService.currentHouse.shield = this.playersAndHouses[i].house.shield;
          this.houseService.currentHouse.economyLevels = this.playersAndHouses[i].house.economyLevels;

          //Igualamos el jugador del servicio al jugador del componente
          this.playerService.currentPlayer.player_id = this.playersAndHouses[i].player.player_id
          this.playerService.currentPlayer.house_id = this.playersAndHouses[i].player.house_id
          this.playerService.currentPlayer.campaign_id = this.playersAndHouses[i].player.campaign_id
          this.playerService.currentPlayer.player_name = this.playersAndHouses[i].player.player_name
          this.playerService.currentPlayer.winterPhaseDone = this.playersAndHouses[i].player.winterPhaseDone


        }
        
      }
          //Introducimos los personajes de la casa seleccionada en el array currentHouseChars
          this.characterService.currentHouseChars = [];
      for (let i = 0; i < this.characterService.allCharactersOfCampaign.length; i++) {
        if(this.houseService.currentHouse.house_id == this.characterService.allCharactersOfCampaign[i].house_id){
          this.characterService.currentHouseChars.push(this.characterService.allCharactersOfCampaign[i])
        }
        
      }



      console.log("Current House en servicio: " + JSON.stringify(this.houseService.currentHouse));
      console.log("Current Player en servicio: " + JSON.stringify(this.playerService.currentPlayer));
      console.log("Current house Characters en servicio: " + JSON.stringify(this.characterService.currentHouseChars));
      // this.router.navigateByUrl("/phase1")//REACTIVAR CUANDO PASE BIEN EL CURRENTHOUSE Y TODO LO DEMÁS
    }

    // FALTA REHACER ESTA
    public checkPlayersReady(){
      for (let i = 0; i < this.playersAndHouses.length; i++) {

        if(this.playersAndHouses.player[i].winterPhaseDone==0 && this.playersAndHouses.player[i].player_id!=null){

          this.playersNotReady = true;
          console.log(`Falta por completar la FI de al menos un jugador: ${this.playersNotReady}`);
          break;//no se lo contéis a Jose.

        }else{

          this.playersNotReady = false;
          console.log(`Se puede avanzar de año`);

        }
        
      }

    }

    public nextYear(){
      //Esta función tendrá que añadir un nuevo año al objeto campaña con yearId + 1, yearNumber +1, notes = "", isLastYear=true y los datos actualizados de todas las casas 

      this.router.navigateByUrl("/currentcampaign")


    }

}
