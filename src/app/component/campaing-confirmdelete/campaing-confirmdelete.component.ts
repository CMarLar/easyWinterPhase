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

  @Input() campaignPadre : number;
  @Output() eventoModal = new EventEmitter<any>();
  public datos : any;

  constructor(public campaignService:CampaignService, private router:Router){
  
  }

  public cerrarModal(){
    this.datos = {"hidden" : true, "idCampaña" : null}
    this.eventoModal.emit(this.datos)

  }

  public borrarCampaing(campaign_id: number ){

    console.log(campaign_id);
    this.datos = {"hidden" : true, "idCampaña" : campaign_id}
    this.campaignService.deleteCampaign(campaign_id).subscribe((data:any)=>{
      
      console.log(data);
      
    // for (let i = 0; i < this.campaignsOfUser.length; i++) {


    //   if(this.campaignsOfUser[i].campaign_id == campaign_id){

    //     let indexOfDeleted = this.campaignsOfUser.indexOf(this.campaignsOfUser[i])

    //     this.campaignsOfUser.splice(indexOfDeleted,1);
    //   }
   
      

    //   }
    })
    
    this.eventoModal.emit(this.datos);
  }

}
