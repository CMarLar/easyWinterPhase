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
  public caballosSanos : string[]
  public caballosInsanos : string[]
  public valorDado: number
  public ncaballo: number
  public result: string;

  
   constructor(){

    this.nombre = "Irene",
    this.apellidos = "Herrero Becker"
    this.foto_escudo = "../../../assets/img/escudo10.png"
    this.modificador = "Circunstancia Económica"
    this.circunstanciaEconomica = -2
    this.caballos = ["El caballo 1 está sano","El caballo 2 está sano.","El caballo 3 está muerto o es inutil.","El caballo 4 está sano."]

  }
  public calcularSaludCaballo(valorDado: number, ncaballo: number){

    this.caballosSanos = ["El caballo 1 está sano", "El caballo 2 está sano", "El caballo 3 está sano","El caballo 4 está sano","El caballo 5 está sano","El caballo 6 está sano"]
    this.caballosInsanos = ["El caballo 1 está muerto o inútil", "El caballo 1 está muerto o inútil", "El caballo 1 está muerto o inútil","El caballo 1 está muerto o inútil","El caballo 1 está muerto o inútil","El caballo 1 está muerto o inútil"]
  

    if(this.valorDado <= 2){

      this.result = this.caballosInsanos.push[ncaballo - 1];

    }if(this.valorDado >= 3){

      this.result = this.caballosSanos.push[ncaballo  -1];
    }
         return this.result;
}
}

/*   public calcularSaludCaballo(valorDado: number, ncaballo: number){

    this.caballosSanos = ["El caballo 1 está sano", "El caballo 2 está sano", "El caballo 3 está sano","El caballo 4 está sano","El caballo 5 está sano","El caballo 6 está sano"]
    this.caballosInsanos = ["El caballo 1 está muerto o inútil", "El caballo 1 está muerto o inútil", "El caballo 1 está muerto o inútil","El caballo 1 está muerto o inútil","El caballo 1 está muerto o inútil","El caballo 1 está muerto o inútil"]
  

    if(this.valorDado <= 2){

      this.result = this.caballosInsanos.push[ncaballo - 1];

    }if(this.valorDado >= 3){

      this.result = this.caballosSanos.push[ncaballo  -1];
    }
         return this.result;
} 
    
}
  /* let caballos = [("El caballo 1 está sano"),("El caballo 2 está sano."),("El caballo 3 está muerto o es inutil."),("El caballo 4 está sano.")] */

/* function calcular(calcularCaballos: number)
{
     let resultado = Math.floor((Math.random() * (calcularCaballos + 1)));

    if(resultado <= 2){
      console.log( "El Caballo muere o queda inútil");
    }else{

      console.log("El Caballo está sano");
    }
    return (resultado);

    }  */
