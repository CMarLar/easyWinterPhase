import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignService } from 'src/app/shared/campaign.service';
import { Campaign } from 'src/app/models/campaign';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/models/user';
import { HouseService } from 'src/app/shared/house.service';
import { PlayerService } from 'src/app/shared/player.service';
import { Player } from 'src/app/models/player';
import { House } from 'src/app/models/house';
import { CharacterService } from 'src/app/shared/character.service';
import { Character } from 'src/app/models/character';
import { YearService } from 'src/app/shared/year.service';
import { Year } from 'src/app/models/year';
import { AdicionalService } from 'src/app/shared/adicional.service';


@Component({
  selector: 'app-campaigns',
  templateUrl: './campaigns.component.html',
  styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent {

  public user : any = {};
  public campaigns : Campaign[] = [];//cambio para servicio
  public currentCampaign : Campaign;
  public isHide : boolean;

    //Modal para meter el nombre de la campaña
    public hiddenModal:boolean;
    public hiddenModal_confirmacion:boolean;

  //Servicio y usuario actual
  
  public currentUser: User;

  public campaignsOfUser:any;//creada para hacer los servicios.

  public noCampaigns:boolean;
  

  constructor(public router : Router, public campaignService:CampaignService,public userService: UserService, public houseService:HouseService, public playerService : PlayerService, public characterService : CharacterService, public yearService : YearService, public adicionalService : AdicionalService){
    
    if(this.userService.logueado==false){
      this.router.navigateByUrl("/login");
    }
    
    this.user = {nombre : "Miguel Generoso Valero",
                correo : "gene17051996@gmail.com",
                password : "contraseñaMiguel_17",
                rol : "Master",//no hará falta
                campaignFinished : 3,//no creo que haga falta esta stat
                imgProfile : "../../../assets/img/img_perfil.png",
                campaigns : this.campaignService.campaigns};//no se usa

    this.isHide = true;

    this.hiddenModal = true;
    this.hiddenModal_confirmacion = true;/* modal borrado campaña */

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
    console.log("Data getcampaigns: " + JSON.stringify(data));
    console.log("CampaignsOfUser: " + JSON.stringify(this.campaignsOfUser));
    

    // for (let i = 0; i < this.campaignsOfUser.length; i++) {
    //   if(campaign_id)
      
    // }



    // for (let i = 0; i < this.houseService.housesOfCamapaign.length; i++) {
    //   if
      
    // }
    

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
  
  for (let i = 0; i < this.campaignsOfUser.length; i++) {

    if(this.campaignsOfUser[i].campaign_id == campaign_id){
    
    }


  }

  this.campaignService.deleteCampaign(campaign_id).subscribe((data:any)=>{
    // this.campaignsOfUser=data;//para pasar de nuevo el array por pantalla
    console.log("Dentro del suscribe");
    console.log("Campaña borrada");    
    console.log("Data deletecampaigns" + data);

    for (let i = 0; i < this.campaignsOfUser.length; i++) {

     /*  this.hiddenModal_confirmacion = false; *//* esto de aquí */

      if(this.campaignsOfUser[i].campaign_id == campaign_id){

        let indexOfDeleted = this.campaignsOfUser.indexOf(this.campaignsOfUser[i])

        console.log("Indice:");
        
        console.log(indexOfDeleted);

        this.campaignsOfUser.splice(indexOfDeleted,1);
      }
   
      

      }
  })
  }
  public abrirModal_confirmacion(){

    return this.hiddenModal_confirmacion = false;
  }
  public cerrarModal_confirmacion(){

    return this.hiddenModal_confirmacion = true;
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
    // //SE ASIGNAN LA CAMPAÑA SELECCIONADA A LAS VARIABLES DE CAMPAÑA ACTUAL
    this.currentCampaign = this.campaignService.campaigns.find(objeto => objeto.campaign_id === campaign_id);
    this.campaignService.currentCampaign = this.campaignService.campaigns.find(objeto => objeto.campaign_id === campaign_id);

    // console.log("CAMPAÑA: " + JSON.stringify(this.campaignService.currentCampaign));
    this.getAll();
    
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

  public getAll(){
    
    this.adicionalService.getYearInfo(this.campaignService.currentCampaign.campaign_id)
    .subscribe((data:Year) => {
      console.log("AÑO: " + JSON.stringify(data));

      this.yearService.currentYear = new Year(data[0].year_id,data[0].yearNumber,data[0].isFirstYear,data[0].isLastYear,data[0].notes,data[0].campaign_id);
      console.log(data[0].isFirstYear);

      this.adicionalService.getCampaignInfo(this.campaignService.currentCampaign.campaign_id)

    .subscribe((data:any) => {
      console.log("**************************************************\n" + JSON.stringify(data));
      for (let i = 0; i < data.length; i++){

        this.playerService.playersOfCampaign.push(new Player(data[i].player_id,data[i].house_id,this.campaignService.currentCampaign.campaign_id,data[i].player_name,data[i].winterPhaseDone))

        this.houseService.housesOfCamapaign.push(new House(data[i].house_name,data[i].activeChar,null,null,data[i].shield,null,data[i].house_id))

        this.characterService.mainCharacters.push(new Character(data[i].activeChar,data[i].house_id,data[i].year_id,data[i].char_name,null,null,null,null,null,null,null));

      }

      this.router.navigateByUrl("/currentcampaign");
    })
      
    })

    
    
  }
}

