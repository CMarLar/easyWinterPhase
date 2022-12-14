import { Component } from '@angular/core';

@Component({
  selector: 'app-winter-phase2',
  templateUrl: './winter-phase2.component.html',
  styleUrls: ['./winter-phase2.component.css']
})
export class WinterPhase2Component {


  public miUsuario: Usuario;
  WinterPhaseMainComponent: any;
  
   constructor(){
    
    this.miUsuario = new Usuario( 1, "Irene", "Herrero Becker", "irenisima82@hotmail.com","https://w7.pngwing.com/pngs/993/324/png-transparent-leopard-middle-ages-lion-griffin-heraldry-leopard.png","Serpiente");
  
  
   }
  
  }
  
  export class Usuario {
  
    public id_usuario: number
    public nombre: string
    public apellidos: string
    public correo:string
    public imagen_escudo: string
    public password: string
  
  
    constructor(id_usuario: number, nombre: string, apellidos: string, correo: string, imagen_escudo: string, password: string){
  
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.imagen_escudo = imagen_escudo;
        this.password = password
  
    }
  }
