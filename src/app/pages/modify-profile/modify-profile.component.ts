import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';
import { getLocalePluralCase } from '@angular/common';

@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrls: ['./modify-profile.component.css']
})
export class ModifyProfileComponent {

  public user : User;
  public error : string;
  public isHide : boolean;

  constructor(public router : Router, private userService : UserService){
    this.user = this.userService.user;
    this.isHide = true;
  }

  public goBack(){
    this.router.navigateByUrl("/profile");
  }

  public modifyUser(name : string, mail : string, pass : string){

    this.error = "";
    this.user.user_id = this.userService.user.user_id;

    if (mail != ""){
      if (this.validateEmail(mail)){
        this.user.email = mail;
      }else{
        this.isHide = false;
        this.error += "El correo electronico no es valido. "
      }
    }else{
      this.user.email = this.userService.user.email;
    }

    if (pass != ""){
      if (this.validatePass(pass)){
        this.user.password = pass;
      }else{
        this.isHide = false;
        this.error += "La contraseña no es valida. "
      }
    }else{
      this.user.password = this.userService.user.password;
    }

    if (name != ""){
      this.user.username = name;
    }else{
      this.user.username = this.userService.user.username;
    }

    this.userService.update(this.user = new User(this.user.password,this.user.email,this.user.avatar,this.user.username,this.userService.user.user_id))
    .subscribe(function (data){

    })
    
    
    this.goPlace();
    
  }

  public validatePass(pass : string) : boolean{
    let result : boolean = false;
    console.log("longitud : " + pass.length);
    
    if(pass.length > 8 && pass.length < 20 ){
      console.log("ENTRA");
      
      let regExp =new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&-_])[A-Za-z\d$@$!%*?&-_]{8,20}[^'\s]/)
      console.log("REGEX VALUE: " + regExp.test(pass));
      result = true;
    }else{
      console.log("NO ENTRA");
      
    }
    
    return result;
  }

  public validateEmail(email : string) : boolean{

    let regExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    console.log("REGEX CORREO VALUE: " + regExp.test(email));
    
    return regExp.test(email);
  }

  public goPlace(){
    this.router.navigateByUrl("/profile");
  }
}
