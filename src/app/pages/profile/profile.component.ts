import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent {

  public user : User;

  public avatares; /* avatares */

  public avatar1= "../../../assets/img/avatar1.png"
  public avatar2= "../../../assets/img/avatar2.png"
  public avatar3= "../../../assets/img/avatar3.png"
  public avatar4= "../../../assets/img/avatar4.png"
  public avatar5= "../../../assets/img/avatar5.png"
  public avatar6= "../../../assets/img/avatar6.png"

  public selectedAvatar; /* hace ref.al avatar */

  constructor(public router : Router, private userService : UserService){

    this.user = this.userService.user;

    this.avatares = [this.avatar1, this.avatar2,this.avatar3, this.avatar4,this.avatar5, this.avatar6 ]

    /* mostrar el avatar seleccionado */
    this.selectedAvatar
  }
    /* selector de avatar */
   /*  public selectedUserAvatar(avatar: string){
      console.log(avatar);
      this.selectedAvatar = avatar;

    } */
    /////lo ha hecho Irene (por si la cago ;P

  public goBack(){
    this.router.navigateByUrl("/campaigns");
  }

  public goModifyUser(){
    this.router.navigateByUrl("/modifyprofile")
  }

}
