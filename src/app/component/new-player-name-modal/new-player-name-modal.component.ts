import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-player-name-modal',
  templateUrl: './new-player-name-modal.component.html',
  styleUrls: ['./new-player-name-modal.component.css']
})
export class NewPlayerNameModalComponent {

  
  @Output() cambioNombre = new EventEmitter<String>();
  
  public nombreJugador : string;

  constructor(){
    this.nombreJugador = "Carlos";
  }

  public changeName(name : string){

    this.cambioNombre.emit(name);
  }
}
