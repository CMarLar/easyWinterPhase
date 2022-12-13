import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  public conectado: boolean;


  constructor( ){
 
    this.conectado = false;

  }
  public  comprobarlogin(): boolean{


    if(this.conectado == true){

    this.conectado = true;
    console.log(this.conectado);
        
     }else{

     this.conectado = false;
    }
    return this.conectado; 

   /*  return false; */
  }
  

}


