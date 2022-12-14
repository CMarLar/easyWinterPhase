import { Component } from '@angular/core';

@Component({
  selector: 'app-winter-phase8',
  templateUrl: './winter-phase8.component.html',
  styleUrls: ['./winter-phase8.component.css']
})
export class WinterPhase8Component {


  public miUsuario: Usuario;
  WinterPhaseMainComponent: any;
  jugadores: any;
  
   constructor(){
    
    this.miUsuario = new Usuario( 200, "Irene", "Herrero Becker", "irenisima82@hotmail.com","../../../assets/img/escudo10.png","Serpiente");

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
