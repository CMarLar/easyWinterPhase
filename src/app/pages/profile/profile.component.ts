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

  constructor(public router : Router, private userService : UserService){

    this.user = this.userService.user;
  }

  public goBack(){
    this.router.navigateByUrl("/campaigns");
  }

  public goModifyUser(){
    this.router.navigateByUrl("/modifyprofile")
  }

}
