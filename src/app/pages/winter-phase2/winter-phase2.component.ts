import { Component } from '@angular/core';
import { TextService } from 'src/app/shared/text.service';
import { Text } from 'src/app/models/text';
import { PlayerService } from 'src/app/shared/player.service';
import { Player } from 'src/app/models/player';
import { HouseService } from 'src/app/shared/house.service';
import { CharacterService } from 'src/app/shared/character.service';
import { CampaignService } from 'src/app/shared/campaign.service';
import { YearService } from 'src/app/shared/year.service';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-winter-phase2',
  templateUrl: './winter-phase2.component.html',
  styleUrls: ['./winter-phase2.component.css']
})
export class WinterPhase2Component {


  public foto_escudo : string

  WinterPhaseMainComponent: any;

  public jugadores: Player [];
  public textos: Text [];

  public currentPlayerName:string;
  
   constructor(public router : Router,public userService : UserService,public textosService: TextService, public jugadorService: PlayerService, public houseService: HouseService, public characterService:CharacterService, public campaignService:CampaignService, public yearService:YearService ){
    if(this.userService.logueado==false){
      this.router.navigateByUrl("/login");
    }
    //este bloque es para marcar de nuevo el active character:

    // for (let index = 0; index < this.characterService.currentHouseCharsWinterPhase.length; index++) {

    //   if(this.characterService.currentHouseCharsWinterPhase)
      
    // }


    // console.log("Current campaign name: " + this.campaignService.currentCampaign.campaign_name);
    // console.log("Current year: " + JSON.stringify(this.yearService.currentYear));
    // console.log("Current house: " + JSON.stringify(this.houseService.currentHouse));
    // console.log("Current house characters (winter phase)" + JSON.stringify(this.characterService.currentHouseCharsWinterPhase));
    // console.log("Active character: " + JSON.stringify(this.characterService.currentActiveChar));
    // console.log("PLAYERSERVICE.playersOfCampaign: " + JSON.stringify(this.jugadorService.playersOfCampaign));
    
    this.foto_escudo = this.houseService.currentHouse.shield;

    this.currentPlayerName = this.jugadorService.currentPlayer.player_name;

    // this.mostrarNombreJugador(1)//se puede hacer con servicios
    // this.jugadores = []

    // this.mostrarTextos(2) 
    this.textos = []
  
   }
  //  public mostrarTextos(id: number){

  //   this.textosService.getAllTexts(id).subscribe((data: Text[])=>{
  
  //     this.textos = data;
  //     console.log(data)
  //     console.log(JSON.stringify(data))
  //   })
  // } 
  // public mostrarNombreJugador(id: number){  

  //   this.jugadorService.getPlayers(id).subscribe((data: Player[])=>{
    
  //   this.jugadores = data;
  //   console.log(data)
    
  //   })
  // } 
  
  }
  

