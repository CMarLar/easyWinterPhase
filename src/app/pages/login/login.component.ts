import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';

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

  constructor(private router : Router, private userService : UserService){
    this.user = "miguelGeneroso@gmail.com";
    this.password = "contraseñaMiguel";
    this.usuarioConectado = false;
    this.dataOk = true;
  }

  public userValidate(email : string,password : string){
    
    this.userService.login(new User(password,email,null,null,null))
    .subscribe((data : User[]) => {

      console.log(data);
      if(data[0] != undefined){

        this.userService.user = new User(data[0].password,data[0].email,data[0].avatar,data[0].username,data[0].user_id);
        this.userService.logueado = true;
        console.log("LOGUEADO");
        this.goPlace();
        

      }else{

        this.userService.logueado = false;
        this.dataOk = false;
        
      }
      
    })

  }

  public goPlace(){

    this.router.navigateByUrl('/campaigns');

  }
}