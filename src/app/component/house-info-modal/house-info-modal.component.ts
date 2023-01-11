import { Component, Input } from '@angular/core';
import { Character } from 'src/app/models/character';
import { House } from 'src/app/models/house';

@Component({
  selector: 'app-house-info-modal',
  templateUrl: './house-info-modal.component.html',
  styleUrls: ['./house-info-modal.component.css']
})
export class HouseInfoModalComponent {

  @Input() housePadre : House;
  @Input() charactersPadre : Character[];

  public nombreCasa:string;
  public feudo:string;
  public caracteristicaFamiliar:string;
  public nivelManutencion:string;
  public nombrePJ:string;
  public edad:string;
  public nombreEscudero:string;
  public house : any;
  public npc : any[];
  public nombreJugador : string;

  constructor(){
    this.npc = [{nombre : "Carlos",estado : true,rol : "esposa"},{nombre : "Irene",estado : false, rol : "hijo"},{nombre : "Miguel",estado : true, rol : "escudero"},{nombre : "Javier",estado : true, rol : "amante"},
    
    // {nombre : "Carlos",estado : true,rol : "esposa"},{nombre : "Irene",estado : false, rol : "hijo"},{nombre : "Miguel",estado : true, rol : "escudero"},{nombre : "Javier",estado : true, rol : "amante"},{nombre : "Carlos",estado : true,rol : "esposa"},{nombre : "Irene",estado : false, rol : "hijo"},{nombre : "Miguel",estado : true, rol : "escudero"},{nombre : "Javier",estado : true, rol : "amante"},{nombre : "Carlos",estado : true,rol : "esposa"},{nombre : "Irene",estado : false, rol : "hijo"},{nombre : "Miguel",estado : true, rol : "escudero"},{nombre : "Javier",estado : true, rol : "amante"},{nombre : "Carlos",estado : true,rol : "esposa"},{nombre : "Irene",estado : false, rol : "hijo"},{nombre : "Miguel",estado : true, rol : "escudero"},{nombre : "Javier",estado : true, rol : "amante"},{nombre : "Carlos",estado : true,rol : "esposa"},{nombre : "Irene",estado : false, rol : "hijo"},{nombre : "Miguel",estado : true, rol : "escudero"},{nombre : "Javier",estado : true, rol : "amante"},{nombre : "Carlos",estado : true,rol : "esposa"},{nombre : "Irene",estado : false, rol : "hijo"},{nombre : "Miguel",estado : true, rol : "escudero"},{nombre : "Javier",estado : true, rol : "amante"},{nombre : "Carlos",estado : true,rol : "esposa"},{nombre : "Irene",estado : false, rol : "hijo"},{nombre : "Miguel",estado : true, rol : "escudero"},{nombre : "Javier",estado : true, rol : "amante"},{nombre : "Carlos",estado : true,rol : "esposa"},{nombre : "Irene",estado : false, rol : "hijo"},{nombre : "Miguel",estado : true, rol : "escudero"},{nombre : "Javier",estado : true, rol : "amante"},{nombre : "Carlos",estado : true,rol : "esposa"},{nombre : "Irene",estado : false, rol : "hijo"},{nombre : "Miguel",estado : true, rol : "escudero"},{nombre : "Javier",estado : true, rol : "amante"},{nombre : "Carlos",estado : true,rol : "esposa"},{nombre : "Irene",estado : false, rol : "hijo"}
  
  ];
    this.nombrePJ = "Pepe";
    this.nombreJugador = "Miguel";
    this.feudo = "../../../assets/img/escudo1.png";
    this.nombreCasa = "Casa Newton";
    this.caracteristicaFamiliar = "Buenos con los caballos"
    this.house = {nombreJugador : this.nombreJugador,
      nombreCasa:this.nombreCasa,
      feudo:this.feudo,
      caracteristicaFamiliar:this.caracteristicaFamiliar,
      nivelManutencion:this.nivelManutencion,
      nombrePJ:this.nombrePJ,
      edad:this.edad,
      nombreEscudero:this.nombreEscudero,
      npc:this.npc}
  }
}
