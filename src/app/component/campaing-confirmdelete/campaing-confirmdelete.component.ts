import { Component } from '@angular/core';
import { Campaign } from 'src/app/models/campaign';
import { CampaignService } from 'src/app/shared/campaign.service';
import { Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-campaing-confirmdelete',
  templateUrl: './campaing-confirmdelete.component.html',
  styleUrls: ['./campaing-confirmdelete.component.css']
})

export class CampaingConfirmdeleteComponent {

  public modal: any;


  constructor(public campaignService:CampaignService, private router:Router){


  }
 public cerrarModal(){
    this.modal.close()
    this.router.navigateByUrl("/campaings")
 
  } 
  public borrarCampaing(campaing_id: number ){

    let campaing = this.campaignService.deleteCampaign(campaing_id)
    if(!campaing){

      console.log("La Campaña no existe");
    }
  }

  }
 


