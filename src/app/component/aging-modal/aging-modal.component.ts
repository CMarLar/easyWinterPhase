import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-aging-modal',
  templateUrl: './aging-modal.component.html',
  styleUrls: ['./aging-modal.component.css']
})
export class AgingModalComponent {
  
  @Input() informacionPadre : any;
  @Output() cerrar = new EventEmitter<Boolean>();

  public statschanges : any[];

  constructor(){
    this.statschanges = [];
    // this.tiradaRandom();
  }

  // public tiradaRandom(){
    
  //   let dado1 : number;
  //   let dado2 : number;
  //   let result : number;

  //   if(this.statschanges.length > 0){
  //     this.statschanges = [];
  //   }

  //   dado1 = Math.floor((Math.random() * 5) +1);
  //   dado2 = Math.floor((Math.random() * 5) +1);
  //   result = dado1 + dado2;
  //   console.log("RESULTADO PRIMER DADO: " + result)

  //   if(result == 2 || result == 12){

  //     this.statschanges = this.calcularTiradaStats(4);

  //   }else if (result == 3 || result == 11){
  //     this.statschanges = this.calcularTiradaStats(3);
  //   }else if (result == 4 || result == 10){
  //     this.statschanges = this.calcularTiradaStats(2);
  //   }else if (result == 5 || result == 9){
  //     this.statschanges = this.calcularTiradaStats(1);
  //   }else{
  //     this.statschanges = ["Ninguna caracteristica se ha visto afectada"]
  //   }





    
  // }

  // public calcularTiradaStats(tiradas : number = 0) : string[]{
  //   let result : string[] = [];
  //   let dado1 : number;

  //   for (let i = 0; i < tiradas; i++){

  //     dado1 = Math.floor((Math.random() * 6) +1);
  //     console.log("Resultado dado estadisticas: " + dado1);

  //     if (dado1 == 1){
  //       result.push("TAM");
  //     }else if(dado1 == 2){
  //       result.push("DES");
  //     }else if(dado1 == 3){
  //       result.push("FUE");
  //     }else if(dado1 == 4){
  //       result.push("CON");
  //     }else if(dado1 == 5){
  //       result.push("APA");
  //     }else if(dado1 == 6){
  //       result.push("No hay perdida");
  //     }
  //   }

  //   console.log("RESULTADO: " + result);
    
  //   return result;
  // }

  public cerrarModal(){
    this.cerrar.emit(true);
  }
}
