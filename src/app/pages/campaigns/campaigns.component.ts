import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent {

  public user : any = {};
  public campaigns : any = [];
  public currentCampaign : string;
  public isHide : boolean;

  constructor(public router : Router){
    this.user = {nombre : "Miguel Generoso Valero",
                correo : "gene17051996@gmail.com",
                password : "contraseñaMiguel_17",
                rol : "Master",
                campaignFinish : 3,
                imgProfile : "../../../assets/img/img_perfil.png",
                campaigns : ["Campaña 1","Campaña 2","Campaña 3","Campaña 4","Campaña 5","Campaña 6"]};

    this.isHide = true;
  }

  public selectCampaign(campaña : string){
    console.log(campaña);
    this.currentCampaign = campaña;
    this.router.navigateByUrl("/currentcampaign")
  }

  public deleteCampaign(campaña : string){
    console.log(this.user.campaigns);
    console.log(campaña);
    
    for(let i = 0; i < this.user.campaigns.length;i++){
      console.log("CAMAPAÑA " + this.user.campaigns[i]);
      
      if (this.user.campaigns[i] == campaña){
        this.user.campaigns.splice(i,1);
        this.user.campaigns;
        this.isHide = true;
      }
    }
  }

  public goAddCampaign(){
    
    if(this.user.campaigns.length == 6){

      this.isHide = false;
    }else{
      this.router.navigateByUrl("/addplayers");
    }

    
  }
}
