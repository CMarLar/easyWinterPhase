import { Component } from '@angular/core';
import { Router } from '@angular/router';

//importados para hacer servicios
import { CampaignService } from 'src/app/shared/campaign.service';
import { Campaign } from 'src/app/models/campaign';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/models/user';


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

    //Modal para meter el nombre de la campaña
    public hiddenModal:boolean;

  //Servicio y usuario actual
  
  public currentUser: User;

  public campaignsOfUser:any;//creada para hacer los servicios.

  public noCampaigns:boolean;

  constructor(public router : Router, public campaignService:CampaignService,public userService: UserService){
    this.user = {nombre : "Miguel Generoso Valero",
                correo : "gene17051996@gmail.com",
                password : "contraseñaMiguel_17",
                rol : "Master",//no hará falta
                campaignFinished : 3,//no creo que haga falta esta stat
                imgProfile : "../../../assets/img/img_perfil.png",
                campaigns : this.campaignService.campaigns};//no se usa

    this.isHide = true;

    this.hiddenModal = true;

    this.currentUser = this.userService.user;


    //debería mostrar esto por pantalla
    this.campaignsOfUser=this.getCampaigns(this.currentUser.user_id);
    console.log(this.getCampaigns(this.currentUser.user_id));


    this.campaignService.campaigns = this.campaignsOfUser


    
    
    
    
  }

///////////////NUEVAS FUNCIONES CON SERVICIOS///////////////

public getCampaigns(user_id:number){

  this.campaignService.getCampaigns(user_id).subscribe((data:Campaign[])=>{
    this.campaignsOfUser=data;
    this.campaignService.campaigns=this.campaignsOfUser;
    console.log("Data getcampaigns: " + data);
    

    if(data.length == 0){
      this.noCampaigns = true;
      console.log("No campaigns: " + this.noCampaigns);
      
    }else{
      this.noCampaigns = false;
      console.log("No campaigns: " + this.noCampaigns);
    }
    
  })//sin suscribe

}

public deleteCampaign(campaign_id:number){

  //igual tienes que cambiar este data a :any

  console.log("click");
  console.log("ID de campaña" + campaign_id);
  
  
  this.campaignService.deleteCampaign(campaign_id).subscribe((data:any)=>{
    // this.campaignsOfUser=data;//para pasar de nuevo el array por pantalla
    console.log("Dentro del suscribe");
    
    console.log("Campaña borrada");    
    console.log("Data deletecampaigns" + data);

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

  //Función nueva
  public createNewCampaign(){

    

    if(this.campaignsOfUser.length == 6){

      this.isHide = false;

    }else{

      // console.log(this.campaignService.currentCampaign);

      this.hiddenModal = false;

    }


  }





//FALTA CAMBIAR CON EL ROUTING. SE HA CREADO UN ATRIBUTO EN SERVICIO LLAMADO CURRENCAMPAIGN
  public selectCampaign(campaign_id:number){
    console.log("Campaña seleccionada con id: ");
    
    console.log(campaign_id);

    //Falta implementar el get en las campañas.
    // this.currentCampaign = campaña;
    this.router.navigateByUrl("/currentcampaign")
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
  //Función antigua
  public goAddCampaign(){
    
    if(this.user.campaigns.length == 6){

      this.isHide = false;
    }else{
      this.router.navigateByUrl("/addplayers");
    }
    
  }


}