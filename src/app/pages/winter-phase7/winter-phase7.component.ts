import { Component } from '@angular/core';
import { PlayerService } from 'src/app/shared/player.service';
import { House } from 'src/app/models/house';
import { HouseService } from 'src/app/shared/house.service';
import { CharacterService } from 'src/app/shared/character.service';
import { CampaignService } from 'src/app/shared/campaign.service';
import { YearService } from 'src/app/shared/year.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-winter-phase7',
  templateUrl: './winter-phase7.component.html',
  styleUrls: ['./winter-phase7.component.css']
})
export class WinterPhase7Component {

  WinterPhaseMainComponent: any;
  public nombre: string
  public apellidos: string
  public foto_escudo : string

  public personajes: string[]

  public houseCharacters;

  public currentPlayerName: string;
  
   constructor(public playerService:PlayerService, public houseService:HouseService, public characterService:CharacterService, public campaignService:CampaignService, public yearService: YearService){
    
    console.log("Current campaign name: " + this.campaignService.currentCampaign.campaign_name);
    console.log("Current year: " + JSON.stringify(this.yearService.currentYear));
    console.log("Current house: " + JSON.stringify(this.houseService.currentHouse));
    console.log("Current house characters (winter phase)" + JSON.stringify(this.characterService.currentHouseCharsWinterPhase));
    console.log("Active character: " + JSON.stringify(this.characterService.currentActiveChar));

    this.currentPlayerName = this.playerService.currentPlayer.player_name;
    this.foto_escudo = this.houseService.currentHouse.shield;

    this.personajes = ["Alain", "Robert", "Belengarius"];

    this.houseCharacters = 
    {
      characters:
      [
        {name:"Alain",role:"Hermano",age:14,sex:"Hombre"},
        {name:"Robert",role:"Hijo/a",age:21,sex:"Hombre"},
        {name:"Gwynneth",role:"Hijo/a",age:14,sex:"Woman"},
        {name:"Richard",role:"Escudero",age:18,sex:"Hombre"},
      ]
    }

    console.log(this.houseCharacters);
    console.log(this.houseCharacters.name);
    
   }
  
  }
  
 