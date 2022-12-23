import { Component } from '@angular/core';
import { TextService } from 'src/app/shared/text.service';
import { Text } from 'src/app/models/text';
import { Player } from 'src/app/models/player';
import { PlayerService } from "src/app/shared/player.service"

@Component({
  selector: 'app-winter-phase9',
  templateUrl: './winter-phase9.component.html',
  styleUrls: ['./winter-phase9.component.css']
})
export class WinterPhase9Component {

  public nombre: string
  public apellidos: string
  public foto_escudo : string
  public jugadores: Player[];
  public textos: Text [];
  public textos2: Text [];
  
  constructor(private textosService: TextService, private jugadorService: PlayerService ){

    this.foto_escudo = "../../../assets/img/escudo10.png"/* provisional */

    this.mostrarNombreJugador(1)
    this.jugadores = []
    
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
  public mostrarNombreJugador(id: number){  

    this.jugadorService.getPlayers(id).subscribe((data: Player[])=>{
    
    this.jugadores = data;
    console.log(data)
    
    })
  } 
}




