import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';
import { getLocalePluralCase } from '@angular/common';
import { Character } from 'src/app/models/character';

@Component({
  selector: 'app-modify-profile',
  templateUrl: './modify-profile.component.html',
  styleUrls: ['./modify-profile.component.css']
})
export class ModifyProfileComponent {

  public user : User;
  public error : string;
  public isHide : boolean;

  public avatares; /* avatares */

  public avatar1= "../../../assets/img/avatar1.png"
  public avatar2= "../../../assets/img/avatar2.png"
  public avatar3= "../../../assets/img/avatar3.png"
  public avatar4= "../../../assets/img/avatar4.png"
  public avatar5= "../../../assets/img/avatar5.png"
  public avatar6= "../../../assets/img/avatar6.png"

  public selectedAvatar; /* hace ref.al avatar */

  constructor(public router : Router, private userService : UserService){
    if(this.userService.logueado==false){
      this.router.navigateByUrl("/login");
    }
    this.user = this.userService.user;
    this.isHide = true;

    this.avatares = [this.avatar1, this.avatar2,this.avatar3, this.avatar4,this.avatar5, this.avatar6 ]

    /* mostrar el avatar seleccionado */
    this.selectedAvatar
  }
    /* selector de avatar */
    public selectedUserAvatar(avatar: string){
      // console.log(avatar);
      this.selectedAvatar = avatar;
    }
     public onSubmit(form:NgForm){ //* para guardar cambio */
       form.value.avatar = this.selectedAvatar;

      //  console.log("Form value: "+ form.value);

      
    } 
    /////lo ha hecho Irene (por si la cago ;P

  public goBack(){
    this.router.navigateByUrl("/profile");
  }

  public modifyUser(name : string, mail : string, pass : string, avatar: string){

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

    if(avatar !=""){/* irene */

      this.user.avatar = avatar;
  
    }else{

      this.user.avatar = this.selectedAvatar;
    }

    this.userService.update(this.user = new User(this.user.password,this.user.email,this.user.avatar,this.user.username,this.userService.user.user_id))
    .subscribe(function (data){

    })
    
    
    this.goPlace();
    
  }

  public validatePass(pass : string) : boolean{
    let result : boolean = false;
    // console.log("longitud : " + pass.length);
    
    if(pass.length > 8 && pass.length < 20 ){
      // console.log("ENTRA");
      
      let regExp =new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&-_])[A-Za-z\d$@$!%*?&-_]{8,20}[^'\s]/)
      // console.log("REGEX VALUE: " + regExp.test(pass));
      result = true;
    }else{
      // console.log("NO ENTRA");
      
    }
    
    return result;
  }

  public validateEmail(email : string) : boolean{

    let regExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    // console.log("REGEX CORREO VALUE: " + regExp.test(email));
    
    return regExp.test(email);
  }

  public goPlace(){
    this.router.navigateByUrl("/profile");
  }
}
