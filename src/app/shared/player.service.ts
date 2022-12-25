import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { CampaignService } from './campaign.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private url:string = "http://localhost:3000/";
  //esto habrá que cambiarlo por lo de railway

  public player: Player;//mételo como parámetro en post

  //Jugadores de la campaña actual
  public playersOfCampaign: Player[];

  //Campaña logueada, apunta al servicio campaña, no es necesaria meterla aquí
  public currentCampaign;
  public currentPlayer : Player; //PARA EL JUGADOR ACTUAL

  constructor(private http:HttpClient) 
  {
    

  }


  public postPlayer(player:Player[]){
    this.url = "http://localhost:3000/addplayers";

    return this.http.post(this.url,player);
  }

  public getPlayers(player_id:number){  ///revisar que ENDPOINT PONER Y CAMBIAR BACK
    
    let id= player_id;
    this.url = "http://localhost:3000/phases";

    return this.http.get(this.url + "?id=" + id);
  }

  public putPlayer(player:Player){
    this.url = "http://localhost:3000/housesmanagement";
    console.log("ESTE ES EL JUGADOR A MODIFICAR" + player);
    

    return this.http.put(this.url,player);
  }

}

