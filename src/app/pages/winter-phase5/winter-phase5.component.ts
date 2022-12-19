import { Component } from '@angular/core';


@Component({
  selector: 'app-winter-phase5',
  templateUrl: './winter-phase5.component.html',
  styleUrls: ['./winter-phase5.component.css']
})
export class WinterPhase5Component {


  WinterPhaseMainComponent: any;


  public nombre: string
  public apellidos: string
  public foto_escudo : string
  public modificador : string
  public circunstanciaEconomica : number
  public caballos : string[]
  // public caballosSanos : string[]
  // public caballosInsanos : string[]
  public valorDado: number

  public ncaballo: number//número de caballos que introduce el usuario

  public caballosOutput:string[]//caballos con los resultados

  public result: string;

  
    constructor(){

    this.nombre = "Irene";
    this.apellidos = "Herrero Becker";
    this.foto_escudo = "../../../assets/img/escudo10.png";
    this.modificador = "Circunstancia Económica";
    this.circunstanciaEconomica = -2
    this.caballos = [];
    this.caballosOutput = [];

  }
  public calcularSaludCaballo(ncaballo: number){

    let caballosInput:string[]=[]
    let caballoString:string ="Caballo "
    let modificador:number = this.circunstanciaEconomica;
    // let tirada = Math.floor(Math.random()*20)
    let appendMuere:string = ": muere o queda inútil."
    let appendVive:string = ": está sano."
    this.caballosOutput = [];


    for (let i = 0; i < ncaballo; i++) {
      caballosInput.push(caballoString + (i+1))
    }

    console.log(caballosInput);

    for (let i = 0; i < caballosInput.length; i++) {

      let tirada = Math.floor((Math.random()*20)+1)
      let modificado = tirada + modificador;
      
      console.log("Tirada: ");
      
      console.log(tirada);

      console.log("Modificado");
      

      console.log(modificado);
      
      

      if((tirada + modificador) <= 2){

        this.caballosOutput.push(caballosInput[i] + appendMuere);

      }else if((tirada + modificador) > 2){

        this.caballosOutput.push(caballosInput[i] + appendVive);

      }
      
    }

    console.log(this.caballosOutput);
    

  }


}
