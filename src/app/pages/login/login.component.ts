import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  public user : string;
  public password : string;
  public usuarioConectado : boolean;
  public dataOk : boolean;

  constructor(private router : Router){
    this.user = "miguelGeneroso@gmail.com";
    this.password = "contraseñaMiguel";
    this.usuarioConectado = false;
    this.dataOk = true;
  }

  public userValidate(user,password){

    if (user == this.user && password == this.password){

      this.router.navigateByUrl('/campaigns');
      this.usuarioConectado = true;

    }else{

      console.log("Error al introducir el usuario o la contraseña");
      this.usuarioConectado = false;
      this.dataOk = false;

    }

  }
}
