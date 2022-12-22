import { Component } from '@angular/core';
import { TextService } from 'src/app/shared/text.service';
import { Text } from 'src/app/models/text';

@Component({
  selector: 'app-winter-phase9',
  templateUrl: './winter-phase9.component.html',
  styleUrls: ['./winter-phase9.component.css']
})
export class WinterPhase9Component {

  public nombre: string
  public apellidos: string
  public foto_escudo : string

  public textos: Text [];
  public textos2: Text [];
  
  constructor(private textosService: TextService){

    this.nombre = "Irene"
    this.apellidos = "Herrero Becker"
    this.foto_escudo = "../../../assets/img/escudo10.png"
    
    this.mostrarTextos(4)
    this.mostrarTextos2(5)
    this.textos = []
    this.textos2 = []
   }

   public mostrarTextos(id: number){

    this.textosService.getAllTexts(id).subscribe((data: Text[])=>{
  
      this.textos = data;
      console.log(data)
      console.log(JSON.stringify(data))
    })
  } 
  public mostrarTextos2(id: number){

    this.textosService.getAllTexts(id).subscribe((data: Text[])=>{
  
      this.textos2 = data;
      console.log(data)
      console.log(JSON.stringify(data))
    })
  } 
}




