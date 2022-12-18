import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-marriage-loyalty-modal',
  templateUrl: './marriage-loyalty-modal.component.html',
  styleUrls: ['./marriage-loyalty-modal.component.css']
})
export class MarriageLoyaltyModalComponent {

  public resultadoMatrimonio : boolean;
  public isHidden : boolean;
  public rol : string;
  public resultadoTirada : number;
  public resultadoFinal : string;
  public gloria : number;
  public libras : string;
  public datos : any;

  constructor(){
    this.isHidden = true;
  }

  //EN EL INPUT SE INTRODUCE EL VALOR POR LEALTAD EJ: 16
  //SE TIRARA UN DADO RANDOM QUE SI IGUALA O SUPERA EL VALOR DE LEALTAD SALDRA EXITO
  //SI SALE EXITO SE SUMA 1d6 A LA DOTE Y 10 A LA GLORIA
  //SI SALE FALLO EL SEÑOR NEGARA EL CASAMIENTO

  public calcularMatrimonioLealtad(lealtad : string){
    // this.isHidden = true;
    let dado : number = Math.floor((Math.random() * 20) + 1);

    if (dado >= parseInt(lealtad)){
      this.resultadoTirada = dado;
      this.resultadoFinal = "Exito";
      this.libras = "1d6 £";
      this.gloria = 10
    }else{
      
      this.resultadoFinal = "Fallo";
      this.libras = null;
      this.gloria = null;
      console.log(this.resultadoFinal);
    }

    this.isHidden = true;
  }

  public guardarDatos(name : string, age : string){
    
    if(this.resultadoFinal == "Exito"){

      this.datos = {
        nombreEsposa : name,
        edadEsposa : age,
        gloria : this.gloria,
        libras : this.libras
      }
    }
    
  }
  
}
