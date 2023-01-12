import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Character } from '../models/character';
import { Player } from '../models/player';
import { Year } from '../models/year';
import { CharacterService } from './character.service';

@Injectable({
  providedIn: 'root'
})
export class AdicionalService {

  private url : string = "http://localhost:3000/";

  constructor(private http : HttpClient) {

  }

  public getCampaignInfo(campaign_id : number){
    this.url = "http://localhost:3000/";
    return this.http.get(this.url + "currentcampaignInfo?campaign_id=" + campaign_id);
  }

  public getYearInfo(campaign_id : number){
    this.url = "http://localhost:3000/";
    return this.http.get(this.url + "currentcampaignYear?campaign_id=" + campaign_id);
  }

  public crearAñoPersonajes(year : Year,mainCharacters : Character[]){

    this.url = "http://localhost:3000/currentcampaignToWinterPhase"
    return this.http.post(this.url,{year,mainCharacters});
  }

  public getHouseAndCharacters(house_id : number, year_id : number){

    this.url = "http://localhost:3000/modalInfoCasa";

    return this.http.get(this.url + "?house_id=" + house_id + "&year_id=" + year_id);
  }
  
}
