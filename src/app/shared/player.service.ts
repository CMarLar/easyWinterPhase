import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { CampaignService } from './campaign.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private url:string = "https://api-easy-winter-phase.vercel.app/";
  //esto habrá que cambiarlo por lo de railway

  public player: Player;//mételo como parámetro en post

  //Jugadores de la campaña actual
  public playersOfCampaign: Player[];

  //Campaña logueada, apunta al servicio campaña, no es necesaria meterla aquí
  public currentCampaign;
  public currentPlayer : Player; //PARA EL JUGADOR ACTUAL

  constructor(private http:HttpClient) 
  {
    this.playersOfCampaign = [];

  }


  public postPlayer(player:Player[]){
    this.url = "https://api-easy-winter-phase.vercel.app/addplayers";

    return this.http.post(this.url,player);
  }

  public getPlayers(player_id:number){  ///revisar que ENDPOINT PONER Y CAMBIAR BACK
    
    let id= player_id;
    this.url = "https://api-easy-winter-phase.vercel.app/phases";

    return this.http.get(this.url + "?id=" + id);
  }

  public getPlayersByCampaign(campaign_id:number){  ///revisar que ENDPOINT PONER Y CAMBIAR BACK
    
    let id= campaign_id;
    this.url = "https://api-easy-winter-phase.vercel.app/campaignsPlayers";

    return this.http.get(this.url + "?campaign_id=" + id);
  }
  

  public putPlayer(player:Player){
    this.url = "https://api-easy-winter-phase.vercel.app/housesmanagement";
    console.log("ESTE ES EL JUGADOR A MODIFICAR" + player);
    

    return this.http.put(this.url,player);
  }
  public putPlayers(player : Player){

    this.url = "https://api-easy-winter-phase.vercel.app/currentcampaignPlayer";
    console.log("ESTE ES EL JUGADOR A MODIFICAR" + player);
    

    return this.http.put(this.url,player);
  }


  public updateWinterPhaseMain(player : Player){//cambia el estado de winterphasemain del current player a 1

    this.url = "https://api-easy-winter-phase.vercel.app/phase9";
    console.log("ESTE ES EL JUGADOR A MODIFICAR" + player);
    

    return this.http.put(this.url,player);
  }


  public winterPhaseMainReset(player : Player[]){//cambia el estado de winterphasemain del current player a 1. Se hace para todos los players.

    this.url = "https://api-easy-winter-phase.vercel.app/winterphasemain";
    console.log("ESTE ES EL JUGADOR A MODIFICAR" + JSON.stringify(player));
    

    return this.http.put(this.url,player);
  }

}

