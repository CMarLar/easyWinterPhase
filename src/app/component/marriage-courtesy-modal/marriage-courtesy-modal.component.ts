import { Component } from '@angular/core';

@Component({
  selector: 'app-marriage-courtesy-modal',
  templateUrl: './marriage-courtesy-modal.component.html',
  styleUrls: ['./marriage-courtesy-modal.component.css']
})
export class MarriageCourtesyModalComponent {

  public resultadoMatrimonio : boolean;
  public isHidden : boolean;
  public rol : string;
  public resultadoTirada : number;
  public resultadoFinal : string;
  public gloria : number;
  public libras : string;
  public casarse : boolean;
  public casadoCon : boolean;
  public noRelleno :  boolean;
  public objeto : any;
  public botonPulsado : boolean;
  public noSeCasa: string;

  constructor(){
    this.isHidden = true;
    this.casarse = null;
    this.casadoCon = false;
    this.noRelleno = true;
    this.botonPulsado = false;
    this.noSeCasa = ""
    this.objeto = {
      rol : this.rol,
      gloria : this.gloria,
      libras : this.libras
    }

  }

  //A PARTIR DE AQUI ES EL CASAMIENTO POR CORTESIA
  //EN EL INPUT SE INTRODUCE EL VALOR DE CORTESIA
  //SE TIRA UN DADO RANDOM QUE SI IGUALA O SUPERA EL VALOR DE CORTESIA SALDRA EXITO
  //SI SALE EXITO SE INTRODUCIRA EL VALOR DE UNA TIRADA DE MATRIMONIO

  public calcularMatrimonioCortesia(value : string){

    let dado : number = Math.floor((Math.random() * 20) + 1);
    if(dado >= parseInt(value)){
      this.resultadoFinal = "Exito";
      console.log(this.resultadoFinal);
      
    }else if (dado <= parseInt(value)){
      this.resultadoFinal = "Fallo";
    }

  }

  public casarseResult(){
    this.casarse = true;
    this.botonPulsado = true;
  }

  public esposaResult(value : string){

    let dadoHija : number;
    let dadoHermanos : number;

      if(parseInt(value) <= 5){

      this.rol = "Plebeya adinerada";
      this.gloria = 0;
      this.libras = "3d6 + 6£";
      
    }else if (parseInt(value) >= 6 && parseInt(value) <= 8){

      dadoHija = Math.floor((Math.random() * 6) + 1);
      this.rol = "Hija " + dadoHija + " de un escudero";
      this.gloria = 10;
      this.libras = "3£";

    }else if (parseInt(value) >= 9 && parseInt(value) <= 10){

      dadoHija = Math.floor((Math.random() * 6) + 1);
      this.rol = "Hija " + dadoHija + "de caballero mantenido";
      this.gloria = 50;
      this.libras = "1d6 £";

    }else if (parseInt(value) == 11){

      this.rol = "Hija mayor de caballero vasallo adinerado";
      this.gloria = 100;
      this.libras = "1d3 + 6£";

    }else if (parseInt(value) >= 12 && parseInt(value) <= 20){

      dadoHija = Math.floor((Math.random() * 6) + 1);
      dadoHermanos = Math.floor((Math.random() * 6) + 1);
      this.rol = "Hija " + dadoHija + "/" + dadoHermanos + " de caballero vasallo";
      this.gloria = 100;
      this.libras = "1d6 £";

    }else if (parseInt(value) >= 21 && parseInt(value) <= 25){

      this.rol = "Heredera de caballero vasallo";
      this.gloria = 100;
      this.libras = "1 señorío, 1d6+ 10£";

    }
    else if (parseInt(value) >= 26 && parseInt(value) <= 27){

      this.rol = "Heredera de caballero vasallo adinerado";
      this.gloria = 300;
      this.libras = "2 señoríos, 1d6 £";

    }else if (parseInt(value) >= 28){

      this.rol = "Hija más joven de un barón";
      this.gloria = 250;
      this.libras = "1 señorío, 1d6+ 10£"

    }
    this.casadoCon = true;  
  }

  public noMarriage(){
    this.noSeCasa = "No";
    this.botonPulsado = true;
  }
}
