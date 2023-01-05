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

/*
NOTAS IMPORTANTES:
-Toda la funcionalidad de esta página se hace en el front. No hay ninguna llamada a la base de datos.

-Se ha creado un atributo en yearService que almacena el año que se crea en currentcampaign. Este atributo se llama nextYear y desde aquí se le llama con variables locales.

-Para pruebas, se ha hecho que cuando se pulse en el botón "Comenzar" de cada jugador, el atributo winterPhaseDone de ese jugador en PlayersAndHouses (un objeto local de este componente) cambie a 1. Cuando todos los playersAndHouses.players.winterPhaseDone están a 1, deja avanzar al siguiente año. Lo óptimo sería que el atributo winterPhaseDone del jugador en cuestión cambiara en el servicio al TERMINAR todas las fases de invierno.Este cambio se hace en la línea 110.

-Algunos console logs útiles se han comentado porque si hay que depurar, son útiles

-nextYear() lleva a currentCampaign tal cual esté.
*/
  public campaignName:string;

  public currentYear:Year;

  public players:Player[];

  public houses:House[];

  public playersAndHouses:any;//Array de objetos literales que agrupan las casa del jugador y el jugador.

  public playersNotReady:boolean;

  public currentHouseCharsWinterPhase:any;//ESTE ES EL ARRAY DE PERSONAJES DE LA CASA CON ID DEL ÚLTIMO AÑO que se crea

    constructor(public router:Router, public campaignService:CampaignService, public yearService:YearService, public playerService:PlayerService, public houseService:HouseService, public characterService:CharacterService, ){

      this.campaignName = this.campaignService.currentCampaign.campaign_name;
      console.log("CampaignName: " + this.campaignName);

      // console.log("campaignService.currentCampaign: " + JSON.stringify(this.campaignService.currentCampaign)); 
      
      this.currentYear = this.yearService.currentYear//Esto debería importar el año
      console.log("Current year: " + JSON.stringify(this.currentYear));
      

      this.players = this.playerService.playersOfCampaign//Debería importar los jugadores de la campaña
      console.log("Players: " + JSON.stringify(this.players));

      this.houses = this.houseService.housesOfCamapaign//Importa todo el array de casas.
      console.log("Houses: " + JSON.stringify(this.houses));

      console.log("Service, next year: " + JSON.stringify(this.yearService.nextYear));

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

      this.playersNotReady = true//puesto en true para hacer pruebas
      console.log(`Falta por completar la FI de al menos un jugador: ${this.playersNotReady}`);
      
      this.checkPlayersReady();

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

      // console.log("Current House en servicio: " + JSON.stringify(this.houseService.currentHouse));
      // console.log("Current Player en servicio: " + JSON.stringify(this.playerService.currentPlayer));
      // console.log("Current house Characters en servicio: " + JSON.stringify(this.characterService.currentHouseChars));
      // console.log("Current year: " + JSON.stringify(this.currentYear));
      
      //Cogemos solo los que tienen year_id del último año que se que es yearservice.nextYear
      this.currentHouseCharsWinterPhase = [];
      
      for (let i = 0; i < this.characterService.currentHouseChars.length; i++) {

        if(this.yearService.nextYear.year_id == this.characterService.currentHouseChars[i].year_id){//se asegura de coger los personajes con id del último año creado.
          this.currentHouseCharsWinterPhase.push(this.characterService.currentHouseChars[i])
        }
      }

      this.characterService.currentHouseCharsWinterPhase = this.currentHouseCharsWinterPhase;//igualamos con el servicio
      console.log("Current year: " +  JSON.stringify(this.currentYear));
      console.log("Service, next year: " + JSON.stringify(this.yearService.nextYear));
      console.log("Current house characters for Winter Phase, component: " + JSON.stringify(this.currentHouseCharsWinterPhase));
      console.log("Current house characters for Winter Phase, service: " + JSON.stringify(this.characterService.currentHouseCharsWinterPhase));
      
      this.checkPlayersReady()//hace la función de checkeo de nuevo

      this.router.navigateByUrl("/phase1")
    }

    public checkPlayersReady(){


      for (let i = 0; i < this.playersAndHouses.length; i++) {

        if(this.playersAndHouses[i].player.winterPhaseDone==0){

          this.playersNotReady = true;
          console.log(`Falta por completar la FI de al menos un jugador`);
          break;//no se lo contéis a Jose.

        }else{

          this.playersNotReady = false;
          console.log(`Se puede avanzar de año`);

        }
        
      }

    }

    public nextYear(){

      this.router.navigateByUrl("/currentcampaign")

    }

}
