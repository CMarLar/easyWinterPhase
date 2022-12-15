import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'

@Component({
  selector: 'app-add-players',
  templateUrl: './add-players.component.html',
  styleUrls: ['./add-players.component.css']
})
export class AddPlayersComponent {

  public user : any = {};
  public campaigns : any = [];
  public currentCampaign : string;
  public jugadores : string[];
  public jugador1 : any;
  public jugador2 : any;
  public jugador3 : any;
  public jugador4 : any;
  public jugador5 : any;
  public jugador6 : any;


  constructor(public router : Router){

    this.currentCampaign = "LA GRAN CAMPAÑA DE PENDRAGON";
    this.user = {nombre : "Miguel Generoso Valero",
                correo : "gene17051996@gmail.com",
                password : "contraseñaMiguel_17",
                rol : "Master",
                campaignFinish : 3,
                imgProfile : "../../../assets/img/img_perfil.png",
                campaigns : ["Campaña 1","Campaña 2","Campaña 3","Campaña 4","Campaña 5","Campaña 6"]};

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
    
    this.router.navigateByUrl("housesmanagement")
  }

  public goBack(){
    this.router.navigateByUrl("/campaigns")
  }

}
