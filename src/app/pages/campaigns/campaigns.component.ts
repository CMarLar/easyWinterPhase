import { Component } from '@angular/core';
import { Router } from '@angular/router';

//importados para hacer servicios
import { CampaignService } from 'src/app/shared/campaign.service';
import { Campaign } from 'src/app/models/campaign';


@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent {

  public user : any = {};
  public campaigns : Campaign[] = [];//cambio para servicio
  public currentCampaign : string;
  public isHide : boolean;

  public campaignsOfUser:any;//creada para hacer los servicios.

  constructor(public router : Router, public campaignService:CampaignService){
    this.user = {nombre : "Miguel Generoso Valero",
                correo : "gene17051996@gmail.com",
                password : "contraseñaMiguel_17",
                rol : "Master",//no hará falta
                campaignFinished : 3,//no creo que haga falta esta stat
                imgProfile : "../../../assets/img/img_perfil.png",
                campaigns : this.campaignService.campaigns};//no se usa

    this.isHide = true;


    //debería mostrar esto por pantalla
    this.campaignsOfUser=this.getCampaigns(1);
    console.log(this.getCampaigns(1));

    //HAY que cambiarlo cuando se autentifique el usuario
    
    
  }

///////////////NUEVAS FUNCIONES CON SERVICIOS///////////////

public getCampaigns(user_id:number){

  this.campaignService.getCampaigns(user_id).subscribe((data:Campaign[])=>{
    this.campaignsOfUser=data;
    console.log(data);
    
  })

}

public deleteCampaign(campaign_id:number){

  //igual tienes que cambiar este data a :any
  this.campaignService.deleteCampaign(campaign_id).subscribe((data:any)=>{
    // this.campaignsOfUser=data;//para pasar de nuevo el array por pantalla
    
    console.log("Campaña borrada");    
    console.log(data);

    for (let i = 0; i < this.campaignsOfUser.length; i++) {

      if(this.campaignsOfUser[i].campaign_id == campaign_id){

        let indexOfDeleted = this.campaignsOfUser.indexOf(this.campaignsOfUser[i])

        console.log("Indice:");
        
        console.log(indexOfDeleted);

        this.campaignsOfUser.splice(indexOfDeleted,1)
        
      }

    }
    
  })
}







//FALTA CAMBIAR CON EL ROUTING. SE HA CREADO UN ATRIBUTO EN SERVICIO LLAMADO CURRENCAMPAIGN
  public selectCampaign(campaña : string){
    console.log(campaña);
    this.currentCampaign = campaña;
    this.router.navigateByUrl("/currentcampaign")
  }

  public removeCampaignFromList (campaign_id){
    console.log(campaign_id);
    console.log(this.campaignsOfUser);


  }

  public deleteCampaign2(campaign_id : number){//nombre cambiado para que me funcione a mí, lol
    console.log(campaign_id);
    console.log(this.campaignsOfUser);

    
    for(let i = 0; i < this.campaignsOfUser.length;i++){
      console.log("CAMPAÑA " + this.campaignsOfUser[i]);
      
      if (this.campaignsOfUser.campaign_id == campaign_id){
        this.campaignsOfUser.splice(i,1);
        this.campaignsOfUser;
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
