import { Component } from '@angular/core';

@Component({
  selector: 'app-new-player-name-modal',
  templateUrl: './new-player-name-modal.component.html',
  styleUrls: ['./new-player-name-modal.component.css']
})
export class NewPlayerNameModalComponent {

  public nombreJugador : string;

  constructor(){
    this.nombreJugador = "Carlos";
  }

  public changeName(name : string){
    this.nombreJugador = name;
  }
}
