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

  constructor(private http:HttpClient) {

    this.yearsOfCampaign = [];
  }

  public postYear(year : Year){

    this.url = "http://localhost:3000/housesmanagementYear";

    return this.http.post(this.url,year);
  }
  
  public postPlayerYear(year : Year,players : Player[]){

    this.url = "http://localhost:3000/housesmanagementPlayerYear";
    return this.http.post(this.url,{"year" : year, "players" : players});
  }
}