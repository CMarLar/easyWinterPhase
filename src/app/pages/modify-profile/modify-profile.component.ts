import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrls: ['./modify-profile.component.css']
})
export class ModifyProfileComponent {

  public user : any = {};
  public error : string;

  constructor(public router : Router){
    this.user = {nombre : "Miguel Generoso Valero",
                correo : "gene17051996@gmail.com",
                password : "contraseñaMiguel_17",
                rol : "Master",
                campaignFinish : 3,
                imgProfile : "../../../assets/img/img_perfil.png"}
  }

  public goBack(){
    this.router.navigateByUrl("/profile");
  }

  public modifyUser(name : string, mail : string, pass : string){

    if (mail != ""){
      if (this.validateEmail(mail)){
        this.user.correo = mail;
      }else{
        this.error = "El correo electronico no es valido"
      }
    }

    if (pass != ""){
      if (this.validatePass(pass)){
        this.user.password = pass;
      }else{
        this.error = "La contraseña no es valida"
      }
    }

    if (name != ""){
      this.user.nombre = name;
    }

    
    
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
}
