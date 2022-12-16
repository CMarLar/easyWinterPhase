import { Component } from '@angular/core';

@Component({
  selector: 'app-aging-modal',
  templateUrl: './aging-modal.component.html',
  styleUrls: ['./aging-modal.component.css']
})
export class AgingModalComponent {
  
  public pj : any = {};
  public pnj : any = [];
  public tirada : number[];

  constructor(){
    this.tirada = [1,1,1,7];
    this.pj = {
      nombre : "Manolo",
      edad : 36,
      escudero : {
                  nombre : "Alfred",
                  edad : 21,
      },
      estats : {tamaño : 10,
                destreza : 11,
                fuerza : 12,
                constitucion : 13,
                apariencia : 14
              }
    }
    this.pnj = [{nombre : "Antonio",
    edad : 40,
    estats : {tamaño : 10,
              destreza : 11,
              fuerza : 12,
              constitucion : 13,
              apariencia : 14
            }},
          {nombre : "Pedro",
    edad : 33,
    estats : {tamaño : 10,
              destreza : 11,
              fuerza : 12,
              constitucion : 13,
              apariencia : 14
            }},
          {nombre : "Maria",
    edad : 27,
    estats : {tamaño : 10,
              destreza : 11,
              fuerza : 12,
              constitucion : 13,
              apariencia : 14
            }},
          {nombre : "Felipe",
    edad : 24,
    estats : {tamaño : 10,
              destreza : 11,
              fuerza : 12,
              constitucion : 13,
              apariencia : 14
            }},
          {nombre : "Josefa",
    edad : 30,
    estats : {tamaño : 10,
              destreza : 11,
              fuerza : 12,
              constitucion : 13,
              apariencia : 14
            }}]
  }
}
