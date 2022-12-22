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

  constructor(private http:HttpClient) 
  {
    

  }


  public postPlayer(player:Player){
    this.url = "http://localhost:3000/addplayers";

    return this.http.post(this.url,player);
  }



}
