import { Component } from '@angular/core';
import { TextService } from 'src/app/shared/text.service';
import { Text } from 'src/app/models/text';
import { Player } from 'src/app/models/player';
import { PlayerService } from "src/app/shared/player.service"
import { House } from 'src/app/models/house';
import { HouseService } from 'src/app/shared/house.service';
import { CharacterService } from 'src/app/shared/character.service';
import { CampaignService } from 'src/app/shared/campaign.service';
import { YearService } from 'src/app/shared/year.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-winter-phase9',
  templateUrl: './winter-phase9.component.html',
  styleUrls: ['./winter-phase9.component.css']
})
export class WinterPhase9Component {

  public nombre: string
  public apellidos: string
  public foto_escudo : string
  public jugadores: Player[];
  public textos: Text [];
  public textos2: Text [];

  public currentPlayerName:string;
  
  constructor(private textosService: TextService, private playerService: PlayerService, public houseService:HouseService, public characterService:CharacterService, public campaignService:CampaignService, public yearService: YearService, public router:Router){

    console.log("Current campaign name: " + this.campaignService.currentCampaign.campaign_name);
    console.log("Current year: " + JSON.stringify(this.yearService.currentYear));
    console.log("Current house: " + JSON.stringify(this.houseService.currentHouse));
    console.log("Current house characters (winter phase)" + JSON.stringify(this.characterService.currentHouseCharsWinterPhase));
    console.log("Active character: " + JSON.stringify(this.characterService.currentActiveChar));

    this.currentPlayerName = this.playerService.currentPlayer.player_name;
    this.foto_escudo = this.houseService.currentHouse.shield;

    this.mostrarNombreJugador(1)
    this.jugadores = []
    
    this.mostrarTextos(4)
    this.mostrarTextos2(5)
    this.textos = []
    this.textos2 = []
   }

   public mostrarTextos(id: number){

    this.textosService.getAllTexts(id).subscribe((data: Text[])=>{
  
      this.textos = data;
      console.log(data)
      console.log(JSON.stringify(data))
    })
  } 
  public mostrarTextos2(id: number){

    this.textosService.getAllTexts(id).subscribe((data: Text[])=>{
  
      this.textos2 = data;
      console.log(data)
      console.log(JSON.stringify(data))
    })
  } 

  public mostrarNombreJugador(id: number){//Hecha desde el front, esta no haría falta.

    this.playerService.getPlayers(id).subscribe((data: Player[])=>{
    
    this.jugadores = data;
    console.log(data)
    
    })
  }

  public goToWinterPhaseMain(){


    // this.router.navigateByUrl("/winterphasemain")

  }


}




