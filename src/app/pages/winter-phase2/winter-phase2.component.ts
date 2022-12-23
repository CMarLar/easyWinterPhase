import { Component } from '@angular/core';
import { TextService } from 'src/app/shared/text.service';
import { Text } from 'src/app/models/text';
import { PlayerService } from 'src/app/shared/player.service';
import { Player } from 'src/app/models/player';

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

  public jugadores: Player [];
  public textos: Text [];
  
   constructor(private textosService: TextService, private jugadorService: PlayerService ){
    
    this.foto_escudo = "../../../assets/img/escudo10.png"/* provisional */

    this.mostrarNombreJugador(1)
    this.jugadores = []

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
  public mostrarNombreJugador(id: number){  

    this.jugadorService.getPlayers(id).subscribe((data: Player[])=>{
    
    this.jugadores = data;
    console.log(data)
    
    })
  } 
  
  }
  

