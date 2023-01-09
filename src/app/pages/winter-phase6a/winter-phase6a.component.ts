import { Component } from '@angular/core';
import { ModifierFlags } from 'typescript';
import { PlayerService } from 'src/app/shared/player.service';
import { House } from 'src/app/models/house';
import { HouseService } from 'src/app/shared/house.service';
import { CharacterService } from 'src/app/shared/character.service';
import { CampaignService } from 'src/app/shared/campaign.service';
import { YearService } from 'src/app/shared/year.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-winter-phase6a',
  templateUrl: './winter-phase6a.component.html',
  styleUrls: ['./winter-phase6a.component.css']
})

export class WinterPhase6aComponent {

  public nombre: string
  public apellidos: string
  public foto_escudo : string
  public isHideCourtesy : boolean;
  public isHideLoyalty : boolean;
  public newmarried : any;
  public isHide : boolean;
  public pj : any;

  public currentPlayerName:string;

  constructor(public playerService:PlayerService, public houseService:HouseService, public characterService:CharacterService, public campaignService:CampaignService, public yearService: YearService){

    console.log("Current campaign name: " + this.campaignService.currentCampaign.campaign_name);
    console.log("Current year: " + JSON.stringify(this.yearService.currentYear));
    console.log("Current house: " + JSON.stringify(this.houseService.currentHouse));
    console.log("Current house characters (winter phase)" + JSON.stringify(this.characterService.currentHouseCharsWinterPhase));
    console.log("Active character: " + JSON.stringify(this.characterService.currentActiveChar));
    console.log("PLAYERSERVICE.playersOfCampaign: " + JSON.stringify(this.playerService.playersOfCampaign));

    this.currentPlayerName = this.playerService.currentPlayer.player_name;
    this.foto_escudo = this.houseService.currentHouse.shield;

    this.isHideCourtesy = true;
    this.isHideLoyalty = true;
    this.isHide = true;

    this.newmarried = {isMarried : null,
                    nombre : "Rosa",
                    edad : 22,
                    rol : null}

    this.pj = {casado : false,
                esposa : null}
   }

   public matrimonioLealtad(){

    if (this.isHideLoyalty == true){
      this.isHideLoyalty  = false;
      this.isHideCourtesy  = true;
    }else{
      this.isHideLoyalty = true;
    }
  }
  
  public matrimonioCortesia(){
  
    if (this.isHideCourtesy == true){
      this.isHideCourtesy  = false;
      this.isHideLoyalty = true;
    }else{
      this.isHideCourtesy  = true;
    }
  }

  public guardarEsposa(){
    this.pj.casado = this.newmarried.isMarried;
    this.pj.esposa = {nombre : this.newmarried.nombre,
                      edad : this.newmarried.edad,
                      rol : this.newmarried.rol}
  }
}


