import { Component } from '@angular/core';
import { TextService } from 'src/app/shared/text.service';
import { Text } from 'src/app/models/text';

@Component({
  selector: 'app-winter-phase8',
  templateUrl: './winter-phase8.component.html',
  styleUrls: ['./winter-phase8.component.css']
})
export class WinterPhase8Component {

  WinterPhaseMainComponent: any;
  public nombre: string
  public apellidos: string
  public foto_escudo : string
  public gloria: number

  public textos: Text [];
  
   constructor(private textosService: TextService){
    
    this.nombre = "Irene",
    this.apellidos = "Herrero Becker"
    this.foto_escudo = "../../../assets/img/escudo10.png"
    this.gloria = 200

    this.mostrarTextos(3) 
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
  
  