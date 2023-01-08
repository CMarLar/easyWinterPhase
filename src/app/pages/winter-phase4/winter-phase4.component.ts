import { Component } from '@angular/core';
import { WinterPhaseMainComponent } from '../winter-phase-main/winter-phase-main.component';
import { NgForm } from '@angular/forms';
import { PlayerService } from 'src/app/shared/player.service';
import { Player } from 'src/app/models/player';
import { House } from 'src/app/models/house';
import { HouseService } from 'src/app/shared/house.service';
import { CharacterService } from 'src/app/shared/character.service';
import { CampaignService } from 'src/app/shared/campaign.service';
import { YearService } from 'src/app/shared/year.service';

@Component({
  selector: 'app-winter-phase4',
  templateUrl: './winter-phase4.component.html',
  styleUrls: ['./winter-phase4.component.css']
})
export class WinterPhase4Component {

  public nombre: string
  public apellidos: string
  public foto_escudo : string

  public malTiempo: number
  public modificadores: number 
  public administracion: number
  public modificadores2: number
  public calcular: number
  public nivelesManutencion: any[]/* [{nivel:"Indigente"},{nivel:"Pobre"},{nivel:"Rico"},{nivel:"Muy Rico"}] */
  public nivel: string

  //Modelo para que funcione el ngForm

  public nivelesModel;

  public WinterPhaseMainComponent: any;

  public currentPlayerName:string;
  

    constructor(private playerService: PlayerService, public houseService: HouseService, public characterService:CharacterService, public campaignService:CampaignService, public yearService:YearService ){

      console.log("Current campaign name: " + this.campaignService.currentCampaign.campaign_name);
      console.log("Current year: " + JSON.stringify(this.yearService.currentYear));
      console.log("Current house: " + JSON.stringify(this.houseService.currentHouse));
      console.log("Current house characters (winter phase)" + JSON.stringify(this.characterService.currentHouseCharsWinterPhase));
      console.log("Active character: " + JSON.stringify(this.characterService.currentActiveChar));

      console.log();
      
      
      this.foto_escudo = this.houseService.currentHouse.shield;
  
      this.currentPlayerName = this.playerService.currentPlayer.player_name;
    
    

    this.nivelesManutencion = ["Indigente", "Pobre","Normal", "Rico", "Muy Rico"]

    this.nivel = "Introduce los valores y pulsa en calcular o selecciona el nivel directamente"

    this.nivelesModel = 
    {
      nivel:"",
    }

    }//fin constructor
  
  public calcularNivelManutencion(malTiempo:number, modMalTiempo:number, administracion:number, modAdmin:number){
    //Importante: para que haga la suma de los números y no los concatene hay que añadir + delante del número (ej: +12 + +16), o como está aquí en calcular con variables
    let calcular:number;
    calcular = +malTiempo + +modMalTiempo + +administracion + +modAdmin;

    let tiradaAdmin = Math.floor(Math.random()*20);
    let tiradaMaltiempo = Math.floor(Math.random()*20);
    let sumaMalTiempo = +malTiempo + +modMalTiempo;
    let sumaAdmin = +administracion + +modAdmin;
    let resultadoTiradaAdmin;
    let resultadoTiradaMalTiempo;

    let resultadoFinal:string;


    if((+tiradaAdmin <= +sumaAdmin)&&((+tiradaAdmin) < 20)){

      resultadoTiradaAdmin = "Éxito";
      console.log("Tirada del jugador: " + resultadoTiradaAdmin);

    }else if((+tiradaAdmin > sumaAdmin)&&((+tiradaAdmin) < 20)){
      
      resultadoTiradaAdmin = "Fallo"
      console.log("Tirada del jugador: "+ resultadoTiradaAdmin);


    }else if((+tiradaAdmin == sumaAdmin)&&(tiradaAdmin < 20)){

      resultadoTiradaAdmin = "Crítico"
      console.log("Tirada del jugador: "+ resultadoTiradaAdmin);

    }else if((+tiradaAdmin == 20) && (+sumaAdmin < 20)){

      resultadoTiradaAdmin = "Pifia"
      console.log("Tirada del jugador: "+ resultadoTiradaAdmin);

    }else if((+tiradaAdmin == 20) && (+sumaAdmin > 20)){

      resultadoTiradaAdmin = "Crítico"
      console.log("Tirada del jugador: "+ resultadoTiradaAdmin);
    }



    if((+tiradaMaltiempo <= +sumaMalTiempo)&&((+tiradaMaltiempo) < 20)){

      resultadoTiradaMalTiempo = "Éxito";
      console.log("Tirada de mal tiempo: " + resultadoTiradaMalTiempo);

    }else if((+tiradaMaltiempo > sumaMalTiempo)&&((+tiradaMaltiempo) < 20)){
      
      resultadoTiradaMalTiempo = "Fallo"
      console.log("Tirada de mal tiempo: "+ resultadoTiradaMalTiempo);


    }else if((+tiradaMaltiempo == sumaMalTiempo)&&(tiradaMaltiempo < 20)){

      resultadoTiradaMalTiempo = "Crítico"
      console.log("Tirada de mal tiempo: "+ resultadoTiradaMalTiempo);

    }else if((+tiradaMaltiempo == 20) && (+sumaMalTiempo < 20)){

      resultadoTiradaMalTiempo = "Pifia"
      console.log("Tirada de mal tiempo: "+ resultadoTiradaMalTiempo);

    }else if((+tiradaMaltiempo == 20) && (+sumaMalTiempo > 20)){

      resultadoTiradaMalTiempo = "Crítico"
      console.log("Tirada de mal tiempo: "+ resultadoTiradaMalTiempo);

    }


    if(resultadoTiradaAdmin == resultadoTiradaMalTiempo){

      console.log("Normal");
      resultadoFinal="Normal";
      
    }else if (resultadoTiradaAdmin == "Crítico" && resultadoTiradaMalTiempo == "Éxito"){

      console.log("Rico");
      resultadoFinal="Rico";

    }else if (resultadoTiradaAdmin == "Crítico" && resultadoTiradaMalTiempo == "Fallo"){

      console.log("Muy Rico");
      resultadoFinal="Muy Rico";

    }else if (resultadoTiradaAdmin == "Crítico" && resultadoTiradaMalTiempo == "Pifia"){

      console.log("Muy Rico. Además, el caballero vive por encima de los medios de uno de los caballeros más ricos de su estación, ganando al menos 16 £ por año");
      resultadoFinal="Muy Rico. Además, el caballero vive por encima de los medios de uno de los caballeros más ricos de su estación, ganando al menos 16 £ por año";

    }else if (resultadoTiradaAdmin == "Éxito" && resultadoTiradaMalTiempo == "Crítico"){

      console.log("Pobre");
      resultadoFinal="Pobre";

    }else if (resultadoTiradaAdmin == "Éxito" && resultadoTiradaMalTiempo == "Fallo"){

      console.log("Rico");
      resultadoFinal="Rico";

    }else if (resultadoTiradaAdmin == "Éxito" && resultadoTiradaMalTiempo == "Pifia"){

      console.log("Muy Rico");
      resultadoFinal="Muy Rico";


    }else if (resultadoTiradaAdmin == "Fallo" && resultadoTiradaMalTiempo == "Crítico"){

      console.log("Indigente");
      resultadoFinal="Indigente";

    }else if (resultadoTiradaAdmin == "Fallo" && resultadoTiradaMalTiempo == "Éxito"){

      console.log("Pobre");
      resultadoFinal="Pobre";

    }else if (resultadoTiradaAdmin == "Fallo" && resultadoTiradaMalTiempo == "Pifia"){

      console.log("Rico");
      resultadoFinal="Rico";

    }else if (resultadoTiradaAdmin == "Pifia" && resultadoTiradaMalTiempo == "Crítico"){

      console.log("Indigente");
      resultadoFinal="Indigente";

    }else if (resultadoTiradaAdmin == "Pifia" && resultadoTiradaMalTiempo == "Éxito"){

      console.log("Indigente");
      resultadoFinal="Indigente";

    }else if (resultadoTiradaAdmin == "Pifia" && resultadoTiradaMalTiempo == "Fallo"){

      console.log("Pobre");
      resultadoFinal="Pobre"

    }

    this.nivel = resultadoFinal;

  }//fin CalcularNivelManutencion

  public onSelect(form:NgForm){
    console.log(form.value.nivelManutencion);
    this.nivel = form.value.nivelManutencion;
  }



}

