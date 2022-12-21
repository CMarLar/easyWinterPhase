import { Injectable } from '@angular/core';
import { Campaign } from '../models/campaign';
import { HttpClient } from '@angular/common/http';//los objetos HttpClient son los que tienen los métodos post, get, put, delete

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  private url:string = "http://localhost:3000/"
  //esto habrá que cambiarlo por lo de railway

  public campaigns: Campaign[];

  //Es la campaña logueada
  public currentCampaign;

  constructor(private http:HttpClient) 
  {
    let newCampaignTest = new Campaign(null,"Campaña de prueba 3",1)
    let newCampaignTest2 = new Campaign(null,"Otra campaña 2022",1)

    this.campaigns=[newCampaignTest,newCampaignTest2]
  }

// GET CAMPAIGNS
  public getCampaigns(user_id:number) {
    
    let id = user_id;

    return this.http.get(this.url + "campaigns?user_id=" + id)

  }


// DELETE CAMPAIGNS
public deleteCampaign(campaign_id:number) {

  let id = campaign_id;

  const httpOptions = {header:null, body: {campaign_id}}

  return this.http.delete(this.url + "campaigns?user_id=" +id,httpOptions)

}


}//fin servicio
