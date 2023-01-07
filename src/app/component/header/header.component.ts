import { Component } from '@angular/core';
import { CampaignService } from 'src/app/shared/campaign.service';
import { CharacterService } from 'src/app/shared/character.service';
import { HouseService } from 'src/app/shared/house.service';
import { PlayerService } from 'src/app/shared/player.service';
import { UserService } from 'src/app/shared/user.service';
import { YearService } from 'src/app/shared/year.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public conectado: boolean;


  constructor(private userService : UserService,private campaignService : CampaignService, private yearService : YearService, private characterService : CharacterService, private houseService : HouseService, private playerService : PlayerService,){
 
    this.conectado = this.userService.logueado;

  }
  public comprobarlogin(): boolean{


    if(this.conectado == true){

    this.conectado = true;
    // console.log(this.conectado);
        
     }else{

     this.conectado = false;
    }
    return this.conectado; 

  }

  public logOut(){

    this.userService.logueado = false;
    this.userService.user=null;

    this.campaignService.campaigns = [];
    this.campaignService.currentCampaign = null;

    this.playerService.playersOfCampaign = [];
    this.playerService.currentPlayer = null;
    this.playerService.currentCampaign = null;
    this.playerService.player = null;

    this.houseService.housesOfCamapaign = [];
    this.houseService.currentHouse = null;
    this.houseService.currentHouseId = null;
    this.houseService.currentPlayer = null;

    this.characterService.allCharactersOfCampaign = [];
    this.characterService.currentHouseCharsWinterPhase = null;
    this.characterService.currentActiveChar = null;
    this.characterService.currentHouse = null;
    this.characterService.currentHouseChars = null;

    this.yearService.yearsOfCampaign = [];
    this.yearService.currentYear = null;
    this.yearService.nextYear = null;
  }
  

}


