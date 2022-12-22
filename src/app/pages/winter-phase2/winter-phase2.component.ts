import { Component } from '@angular/core';
import { TextService } from 'src/app/shared/text.service';
import { Text } from 'src/app/models/text';

@Component({
  selector: 'app-winter-phase2',
  templateUrl: './winter-phase2.component.html',
  styleUrls: ['./winter-phase2.component.css']
})
export class WinterPhase2Component {


  public nombre: string
  public apellidos: string
  public foto_escudo : string

  WinterPhaseMainComponent: any;

  public textos: Text [];
  
   constructor(private textosService: TextService){
    
    this.nombre = "Irene",
    this.apellidos = "Herrero Becker"
    this.foto_escudo = "../../../assets/img/escudo10.png"

    this.mostrarTextos(2) 
    this.textos = []
  
   }
   public mostrarTextos(id: number){

    this.textosService.getAllTexts(id).subscribe((data: Text[])=>{
  
      this.textos = data;
      console.log(data)
      console.log(JSON.stringify(data))
    })
  } 
  
  }
  

