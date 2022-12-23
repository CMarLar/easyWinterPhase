import { Component, OnInit } from '@angular/core';
import { TextService } from 'src/app/shared/text.service';
import { Text } from 'src/app/models/text';
import { Player } from 'src/app/models/player';
import { PlayerService } from "src/app/shared/player.service"
import { json } from 'express';
import { idText } from 'typescript';


@Component({
  selector: 'app-winter-phase1',
  templateUrl: './winter-phase1.component.html',
  styleUrls: ['./winter-phase1.component.css']
})

export class WinterPhase1Component{

WinterPhaseMainComponent: any;

public foto_escudo : string

public jugadores: Player [];
public textos: Text [];

 constructor(private textosService: TextService, private jugadorService: PlayerService ){

  this.foto_escudo = "../../../assets/img/escudo10.png"/* provisional */

  this.mostrarNombreJugador(1)
  this.jugadores = []

  this.mostrarTextos(1) 
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



    



