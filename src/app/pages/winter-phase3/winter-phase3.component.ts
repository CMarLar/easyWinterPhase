import { Component } from '@angular/core';

@Component({
  selector: 'app-winter-phase3',
  templateUrl: './winter-phase3.component.html',
  styleUrls: ['./winter-phase3.component.css']
})
export class WinterPhase3Component {

  public informacion: Informacion;
  WinterPhaseMainComponent: any;
  
   constructor(){
    
    this.informacion = new Informacion( 37, "Irene", "Herrero Becker", "Jules","../../../assets/img/escudo10.png","La edad de tu escudero es: 21 años. Ya es mayor de edad, así que necesitas un nuevo escudero de 15 años", "Belengarius");

   }
  
  }
  
  export class Informacion {
  
    public edad: number
    public nombre: string
    public apellidos: string
    public nombreAmante:string
    public imagen_escudo: string
    public infoEscudero: string
    public personaje: string
  
  
    constructor(edad: number, nombre: string, apellidos: string, nombreAmante: string, imagen_escudo: string,  infoEscudero: string, personaje: string){
  
        this.edad = edad;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.nombreAmante = nombreAmante;
        this.imagen_escudo = imagen_escudo;
        this.infoEscudero = infoEscudero;
        this.personaje = personaje;
  
    }
  }




