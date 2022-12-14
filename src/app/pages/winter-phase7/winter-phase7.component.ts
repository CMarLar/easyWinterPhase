import { Component } from '@angular/core';

@Component({
  selector: 'app-winter-phase7',
  templateUrl: './winter-phase7.component.html',
  styleUrls: ['./winter-phase7.component.css']
})
export class WinterPhase7Component {


  public miUsuario: Usuario;
  WinterPhaseMainComponent: any;
  jugadores: any;
  
   constructor(){
    
    this.miUsuario = new Usuario( 1, "Irene", "Herrero Becker", "irenisima82@hotmail.com","../../../assets/img/escudo10.png","Serpiente");
    this.jugadores = new PNJ("Alain");

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

  export class PNJ{

    public name: string

    constructor(name: string){

      this.name = name;
    }

  }

