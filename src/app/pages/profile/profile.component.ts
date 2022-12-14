import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  public user : any = {};

  constructor(public router : Router){
    this.user = {nombre : "Miguel Generoso Valero",
                correo : "gene17051996@gmail.com",
                password : "contraseñaMiguel_17",
                rol : "Master",
                campaignFinish : 3,
                imgProfile : "../../../assets/img/img_perfil.png"}
  }

  public goBack(){
    this.router.navigateByUrl("/campaigns");
  }

  public goModifyUser(){
    this.router.navigateByUrl("/modifyprofile")
  }

}
