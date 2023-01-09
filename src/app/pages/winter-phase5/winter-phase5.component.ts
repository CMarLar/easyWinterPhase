import { Component } from '@angular/core';
import { PlayerService } from 'src/app/shared/player.service';
import { House } from 'src/app/models/house';
import { HouseService } from 'src/app/shared/house.service';
import { CharacterService } from 'src/app/shared/character.service';
import { CampaignService } from 'src/app/shared/campaign.service';
import { YearService } from 'src/app/shared/year.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-winter-phase5',
  templateUrl: './winter-phase5.component.html',
  styleUrls: ['./winter-phase5.component.css']
})
export class WinterPhase5Component {


  WinterPhaseMainComponent: any;


  public nombre: string
  public apellidos: string
  public foto_escudo : string
  public modificador : string
  public circunstanciaEconomica : number
  public caballos : string[]


  public currentPlayerName:string;

  public valorDado: number

  public ncaballo: number//número de caballos que introduce el usuario

  public caballosOutput:string[]//caballos con los resultados

  public result: string;

  
    constructor(public playerService:PlayerService, public houseService:HouseService, public characterService:CharacterService, public campaignService:CampaignService, public yearService: YearService){

    console.log("Current campaign name: " + this.campaignService.currentCampaign.campaign_name);
    console.log("Current year: " + JSON.stringify(this.yearService.currentYear));
    console.log("Current house: " + JSON.stringify(this.houseService.currentHouse));
    console.log("Current house characters (winter phase)" + JSON.stringify(this.characterService.currentHouseCharsWinterPhase));
    console.log("Active character: " + JSON.stringify(this.characterService.currentActiveChar));

    console.log("PLAYERSERVICE.playersOfCampaign: " + JSON.stringify(this.playerService.playersOfCampaign));

    console.log("NIVELES DE MANUTENCIÓN: " + this.houseService.currentHouse.economyLevels);

    if(this.houseService.currentHouse.economyLevels == "Indigente"){
      this.circunstanciaEconomica = -15
    }
    if(this.houseService.currentHouse.economyLevels == "Pobre"){
      this.circunstanciaEconomica = -3
    }
    if(this.houseService.currentHouse.economyLevels == "Normal"){
      this.circunstanciaEconomica = 0
    }
    if(this.houseService.currentHouse.economyLevels == "Rico"){
      this.circunstanciaEconomica = 0
    }
    if(this.houseService.currentHouse.economyLevels == "Muy Rico"){
      this.circunstanciaEconomica = 2
    }

    console.log("Modificador del nivel de manutención: " + this.circunstanciaEconomica);
    


    this.currentPlayerName = this.playerService.currentPlayer.player_name;
    this.foto_escudo = this.houseService.currentHouse.shield;
    this.modificador = "Circunstancia Económica";

    this.caballos = [];
    this.caballosOutput = [];

  }
  public calcularSaludCaballo(ncaballo: number){

    let caballosInput:string[]=[]
    let caballoString:string ="Caballo "
    let modificador:number = this.circunstanciaEconomica;//iguala la circunstancia económica, distinto del atributo modificador
    // let tirada = Math.floor(Math.random()*20)
    let appendMuere:string = ": muere o queda inútil."
    let appendVive:string = ": está sano."
    this.caballosOutput = [];


    for (let i = 0; i < ncaballo; i++) {
      caballosInput.push(caballoString + (i+1))
    }

    console.log(caballosInput);

    for (let i = 0; i < caballosInput.length; i++) {

      let tirada = Math.floor((Math.random()*20)+1)
      let modificado = tirada + modificador;
      
      console.log("Tirada: ");
      
      console.log(tirada);

      console.log("Modificado");
      

      console.log(modificado);
      
      

      if((tirada + modificador) <= 2){

        this.caballosOutput.push(caballosInput[i] + appendMuere);

      }else if((tirada + modificador) > 2){

        this.caballosOutput.push(caballosInput[i] + appendVive);

      }
      
    }

    console.log(this.caballosOutput);
    

  }


}