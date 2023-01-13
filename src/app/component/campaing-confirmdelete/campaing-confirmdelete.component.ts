import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Campaign } from 'src/app/models/campaign';
import { CampaignService } from 'src/app/shared/campaign.service';
import { Router } from '@angular/router';
import { ThisReceiver } from '@angular/compiler';
import { ModifierFlags } from 'typescript';

@Component({
  selector: 'app-campaing-confirmdelete',
  templateUrl: './campaing-confirmdelete.component.html',
  styleUrls: ['./campaing-confirmdelete.component.css']
})

export class CampaingConfirmdeleteComponent {

/* @Output()borrarCampana: new EventEmitter<Boolean>(); */

public hiddenModal_confirmacion: boolean;

  constructor(public campaignService:CampaignService, private router:Router){

  
  }
  public cerrarModal_confirmacion(){

    this.hiddenModal_confirmacion = true;
 }
}
 /*  public cerrarModal(){
    this.modal.close()
    this.router.navigateByUrl("/campaings")
 
  } 
  public borrarCampaing(campaing_id: number ){

    let campaing = this.campaignService.deleteCampaign(campaing_id)
    if(!campaing){

      console.log("La Campaña no existe");
    }
  }

  }*/
