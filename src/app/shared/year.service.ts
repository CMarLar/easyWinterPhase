import { Injectable } from '@angular/core';
import { Year } from '../models/year';
import { HttpClient } from '@angular/common/http';
import { Player } from '../models/player';

@Injectable({
  providedIn: 'root'
})
export class YearService {

  public yearsOfCampaign : Year[];
  public currentYear : Year;
  private url : string;
  public nextYear: Year;//coge el nuevo año creado en currentcampaign.

  constructor(private http:HttpClient) {

    this.yearsOfCampaign = [];
  }

  public postYear(year : Year){

    this.url = "https://api-easy-winter-phase.vercel.app/housesmanagementYear";

    return this.http.post(this.url,year);
  }

  public getYears(campaign_id : number){
    console.log("QUE COJONES ES ESTO: " + campaign_id);
    
    this.url = "https://api-easy-winter-phase.vercel.app/campaignsYears?campaign_id=" + campaign_id;

    return this.http.get(this.url)
  }
  
  public postPlayerYear(year : Year,players : Player[]){

    this.url = "https://api-easy-winter-phase.vercel.app/housesmanagementPlayerYear";
    return this.http.post(this.url,{"year" : year, "players" : players});
  }

  public putYear(year : Year){

    this.url = "https://api-easy-winter-phase.vercel.app/currentCampaignYear";
    return this.http.put(this.url,year);
  }

  public getYearByNumber(campaign_id : number, yearNumber : number){

    this.url = "https://api-easy-winter-phase.vercel.app/currentcampaignYearNumber";
    return this.http.get(this.url + "?campaign_id=" + campaign_id + "&yearNumber=" + yearNumber);
  }
}
