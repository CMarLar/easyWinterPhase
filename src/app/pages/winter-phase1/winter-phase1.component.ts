import { Component, OnInit } from '@angular/core';
import { TextService } from 'src/app/shared/text.service';
import { Text } from 'src/app/models/text';
import { Player } from 'src/app/models/player';
import { PlayerService } from "src/app/shared/player.service"
import { json } from 'express';
import { idText } from 'typescript';
import { HouseService } from 'src/app/shared/house.service';
import { CharacterService } from 'src/app/shared/character.service';
import { CampaignService } from 'src/app/shared/campaign.service';
import { YearService } from 'src/app/shared/year.service';


@Component({
  selector: 'app-winter-phase1',
  templateUrl: './winter-phase1.component.html',
  styleUrls: ['./winter-phase1.component.css']
})

export class WinterPhase1Component{

WinterPhaseMainComponent: any;

public foto_escudo : string

public jugadores: Player [];
public textos: Text [];

public currentPlayerName:string;

  constructor(private textosService: TextService, private jugadorService: PlayerService, public houseService: HouseService, public characterService:CharacterService, public campaignService:CampaignService, public yearService:YearService){

    console.log("Current campaign name: " + this.campaignService.currentCampaign.campaign_name);
    console.log("Current year: " + JSON.stringify(this.yearService.currentYear));
    console.log("Current house: " + JSON.stringify(this.houseService.currentHouse));
    console.log("Current house characters (winter phase)" + JSON.stringify(this.characterService.currentHouseCharsWinterPhase));
    console.log("Active character: " + JSON.stringify(this.characterService.currentActiveChar));
    console.log("PLAYERSERVICE.playersOfCampaign: " + JSON.stringify(this.jugadorService.playersOfCampaign));

    this.foto_escudo = this.houseService.currentHouse.shield;
    this.currentPlayerName = this.jugadorService.currentPlayer.player_name;

    // this.mostrarNombreJugador(1) //se puede hacer con servicios
    // this.jugadores = []

    this.mostrarTextos(1) 
    this.textos = []


}

public mostrarTextos(id: number){

  this.textosService.getAllTexts(id).subscribe((data: Text[])=>{

    this.textos = data;
    console.log(data)
    console.log(JSON.stringify(data))
  })
} 

// public mostrarNombreJugador(id: number){//Esto se puede hacer con el servicio, sin necesidad de llamar a la base de datos  

//   this.jugadorService.getPlayers(id).subscribe((data: Player[])=>{
  
//   this.jugadores = data;
//   console.log(data)
  
//   })
// }

}



    



