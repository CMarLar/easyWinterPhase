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
  public jugadores : string[];
  public jugador1 : any;
  public jugador2 : any;
  public jugador3 : any;
  public jugador4 : any;
  public jugador5 : any;
  public jugador6 : any;

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

    this.jugadores = [];
    this.jugador1 = {nombre : ""};
    this.jugador2 = {nombre : ""};
    this.jugador3 = {nombre : ""};
    this.jugador4 = {nombre : ""};
    this.jugador5 = {nombre : ""};
    this.jugador6 = {nombre : ""};
  }

  public onSubmit(form : NgForm){
    console.log(form.value);
    
    this.jugadores.push(form.value)
    console.log("JUGADORES: " + JSON.stringify(this.jugadores));
    // console.log(this.jugadores.length);
    
    
    this.router.navigateByUrl("housesmanagement")
  }

  public goBack(){
    this.router.navigateByUrl("/campaigns")
  }

}
