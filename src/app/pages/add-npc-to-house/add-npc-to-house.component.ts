import { Component } from '@angular/core';

@Component({
  selector: 'app-add-npc-to-house',
  templateUrl: './add-npc-to-house.component.html',
  styleUrls: ['./add-npc-to-house.component.css']
})
export class AddNpcToHouseComponent {

  public npcs;

  constructor(){
    this.npcs=
    [
      {name:"Ultan",age:10,role:"Hijo/a",status:"Vivo/a"},
      {name:"Jorge",age:16,role:"Escudero",status:"Muerto/a"},

    ]
  }

}
