import { Component } from '@angular/core';
import { parseJsonConfigFileContent, StringMappingType } from 'typescript';
import { PlayerService } from 'src/app/shared/player.service';
import { Player } from 'src/app/models/player';
import { HouseService } from 'src/app/shared/house.service';
import { CharacterService } from 'src/app/shared/character.service';
import { CampaignService } from 'src/app/shared/campaign.service';
import { YearService } from 'src/app/shared/year.service';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-winter-phase3',
  templateUrl: './winter-phase3.component.html',
  styleUrls: ['./winter-phase3.component.css']
})
export class WinterPhase3Component {

  
  WinterPhaseMainComponent: any;

  public currentPlayerName:string;
  public foto_escudo : string

  public personaje: string
  public edad_personaje: number
  public personaje2: string
  public edad_personaje2: number
  public nombre_pnj: string


  public pj : any;
  public pnj : any;
  public isHide : boolean;
  public newEscudero : any;

   constructor(public router : Router,public userService : UserService,public playerService: PlayerService, public houseService: HouseService, public characterService:CharacterService, public campaignService:CampaignService, public yearService:YearService){
    if(this.userService.logueado==false){
      this.router.navigateByUrl("/login");
    }
    console.log("Current campaign name: " + this.campaignService.currentCampaign.campaign_name);
    console.log("Current year: " + JSON.stringify(this.yearService.currentYear));
    console.log("Current house: " + JSON.stringify(this.houseService.currentHouse));
    console.log("Current house characters (winter phase)" + JSON.stringify(this.characterService.currentHouseCharsWinterPhase));
    console.log("Active character: " + JSON.stringify(this.characterService.currentActiveChar));
    console.log("PLAYERSERVICE.playersOfCampaign: " + JSON.stringify(this.playerService.playersOfCampaign));
    
    this.foto_escudo = this.houseService.currentHouse.shield;

    this.currentPlayerName = this.playerService.currentPlayer.player_name;


    this.edad_personaje = 34
    this.edad_personaje2 = 36
    this.personaje = "Espartacus"
    this.personaje2 = "Belengarius"
    this.nombre_pnj = "Julian"


    this.pj = {nombre : "Antonito",
              edad : 33,
              escudero : {nombre : "pedro",
                          edad : 19}
            }
    this.pnj = [{nombre : "Belengarius", edad : 26},
                {nombre : "Espartacus" , edad :35},
                {nombre : "Alfrodo" , edad :36},
                {nombre : "Morfinus" , edad : 32},
                {nombre : "Anulus", edad : 40}];

    this.isHide = true;


   }

   public envejecimientoAutomatico(){

    
    if(this.isHide == true){
        this.isHide = false;
    }else{
      this.isHide = true;
    }

    
   
  }

  nuevoEscudero(nombreEscudero : string){
    this.newEscudero = {nombre : nombreEscudero,
                        edad : 15}
  }

  public sumarAge(){

    this.pj.edad = this.pj.edad + 1;
    this.pj.escudero.edad = this.pj.escudero.edad + 1;

    for(let i = 0; i < this.pnj.length; i++){

      this.pnj[i].edad = this.pnj[i].edad + 1;
    }

    if (this.pj.escudero.edad >= 21){
      this.pj.escudero = this.newEscudero;
    }

  }
  
  }


