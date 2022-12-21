import { Component } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public conectado: boolean;


  constructor(private userService : UserService){
 
    this.conectado = this.userService.logueado;

  }
  public comprobarlogin(): boolean{


    if(this.conectado == true){

    this.conectado = true;
    console.log(this.conectado);
        
     }else{

     this.conectado = false;
    }
    return this.conectado; 

  }

  public logOut(){

    this.userService.logueado = false;
    this.userService.user=null;
  }
  

}


