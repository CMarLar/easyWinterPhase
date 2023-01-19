import { Component } from '@angular/core';
import { Campaign } from 'src/app/models/campaign';
import { CampaignService } from 'src/app/shared/campaign.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-campaign-name-modal',
  templateUrl: './campaign-name-modal.component.html',
  styleUrls: ['./campaign-name-modal.component.css']
})
export class CampaignNameModalComponent {


  constructor(public campaignService:CampaignService, private router:Router,private userService: UserService){

  }

  public changeName(name : string){

    // console.log(this.campaignService.campaigns);

    let newCampaign:Campaign;

    this.campaignService.postCampaign(newCampaign = new Campaign(null,name,this.userService.user.user_id)).subscribe((data:any)=>{

      // console.log(data);

      newCampaign.campaign_id = data.insertId//mete el id de la camapaña nueva como id de la campaña que se mete en el array ESTO ES MUY IMPORTANTE

      this.campaignService.campaigns.push(newCampaign)
      
      this.campaignService.currentCampaign = newCampaign;
      // console.log(this.campaignService.currentCampaign);
      
      this.router.navigateByUrl("/addplayers")//va a addplayers
  
    })



  }



  // //Función nueva
  // public createNewCampaign(){

  //   if(this.campaignsOfUser.length == 6){

  //     this.isHide = false;

  //   }else{
  //     this.campaignService.postCampaign(new Campaign(null,"",this.currentUser.user_id)).subscribe((data:any)=>{
  //       console.log(data);
        
  //     })
  //     console.log(this.campaignService.currentCampaign);
      

  //   }

  // }



}


