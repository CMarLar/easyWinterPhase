import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CampaignService } from 'src/app/shared/campaign.service';
import { Player } from 'src/app/models/player';
import { PlayerService } from 'src/app/shared/player.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-add-players',
  templateUrl: './add-players.component.html',
  styleUrls: ['./add-players.component.css']
})
export class AddPlayersComponent {

  public currentUser : User;
  public campaigns : any = [];
  public currentCampaign : string;
  // public jugadores : string[];
  public jugador1 : Player;
  public jugador2 : Player;
  public jugador3 : Player;
  public jugador4 : Player;
  public jugador5 : Player;
  public jugador6 : Player;

  public players:Player[]


  constructor(public router : Router, public campaignService:CampaignService, public userService:UserService, public playerService:PlayerService){

    //Cambiar por la campaña de servicio
    console.log(this.campaignService.currentCampaign);
    
    // this.currentCampaign = this.campaignService.currentCampaign.campaign_name;

    this.currentUser = this.userService.user;

    // this.players = [];

    // this.currentUser = {nombre : "Miguel Generoso Valero",
    //             correo : "gene17051996@gmail.com",
    //             password : "contraseñaMiguel_17",
    //             rol : "Master",
    //             campaignFinish : 3,
    //             imgProfile : "../../../assets/img/img_perfil.png",
    //             campaigns : ["Campaña 1","Campaña 2","Campaña 3","Campaña 4","Campaña 5","Campaña 6"]};

    
    this.jugador1 = {player_id:null,house_id:null,campaign_id:this.campaignService.currentCampaign.campaign_id,player_name : "",winterPhaseDone:false};
    this.jugador2 = {player_id:null,house_id:null,campaign_id:this.campaignService.currentCampaign.campaign_id,player_name : "",winterPhaseDone:false};
    this.jugador3 = {player_id:null,house_id:null,campaign_id:this.campaignService.currentCampaign.campaign_id,player_name : "",winterPhaseDone:false};
    this.jugador4 = {player_id:null,house_id:null,campaign_id:this.campaignService.currentCampaign.campaign_id,player_name : "",winterPhaseDone:false};
    this.jugador5 = {player_id:null,house_id:null,campaign_id:this.campaignService.currentCampaign.campaign_id,player_name : "",winterPhaseDone:false};
    this.jugador6 = {player_id:null,house_id:null,campaign_id:this.campaignService.currentCampaign.campaign_id,player_name : "",winterPhaseDone:false};

    this.players = [];//array de objetos jugadores


  }

  public onSubmit(form : NgForm){

    for (let values in form.value) {
      console.log(form.value[values]);//Esto se hace porque estaba metiendo las claves, no el valor.
      console.log("------------------------------");
      console.log(values);
      

      if(form.value[values] != undefined){

        this.players.push(new Player(null,null,this.campaignService.currentCampaign.campaign_id,form.value[values],false))

      }

    }

    console.log(this.players);
    // console.log(this.jugadores.length);
    this.playerService.playersOfCampaign = this.players;

    console.log(this.playerService.playersOfCampaign);

    this.playerService.postPlayer(this.players)
    .subscribe((data : any) => {
      console.log(data);
      let id = data.insertId;
      console.log(this.players.length);
      
      this.sumarId(data.insertId)
      for (let i = 0; i < this.players.length ; i++){
        
        console.log("LONGITUD DE PLAYERS: " + this.players.length);
        console.log("I = " + i);
  
        this.players[i].player_id = id + i;
        this.playerService.playersOfCampaign[i].player_id = id + i;
  
        console.log(this.players[i]);
          
        }
      //PROBLEMA AQUI CON EL ID DE PLAYERS
    })
    
    
    
    
    
    this.router.navigateByUrl("housesmanagement")
  }
  
  public sumarId(id:number){
    console.log(id);
    
  }

  public goBack(){
    this.router.navigateByUrl("/campaigns")
  }

}
