import { Injectable } from '@angular/core';
import { Player } from '../models/player';
import { PlayerService } from './player.service';
import { House } from '../models/house';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  public currentPlayer : Player;
  private url : string;
  public currentHouse : House;
  public housesOfCamapaign : House[];

  public currentHouseId:number;//recoge el id para pasárselo a createhouse
  
  constructor(private playerService : PlayerService,private http:HttpClient) {

    this.currentPlayer = this.playerService.currentPlayer;
    this.housesOfCamapaign = [];
  }

  public postHouse(house:House){
    this.url = "http://localhost:3000/housesmanagement";

    return this.http.post(this.url,house);
  }

  public deleteHouse(house:House){
    let house_id = house.house_id;

  const httpOptions = {header : {"Content-type" : "application/json; charset= UTF-8"}, body : {"house_id" : house_id}}

  return this.http.delete(this.url,httpOptions);
  }


  public updateHouse(house:House){
    // let house_id = house.house_id;
    this.url = "http://localhost:3000/createhouse";
    return this.http.put(this.url,house)

  }


}



//house Management
//  -boton crear
//    .crear un año
//    .actualizar el id año de los PNJ
//    .insert en la tabla de relaccion player-years con los datos