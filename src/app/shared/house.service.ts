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

  public modifyLayout:boolean;//indica si se modifican los botones en función de si la casa es nueva (false) o se se modifica. Empieza en false y cuando la casa tiene house_name, holding_name y familyCharacteristic, pasa a true.

  public backToCurrentCampaign:boolean;//comprueba si se accede a createcampaign desde currentcampaign y devuelve a currentcampaign.

  public allPlayersAndAllHouses:any;//Se utiliza en winterphasemain para guardar el array de all players y all houses en las mismas posiciones y que no vuelvan a construirse
  
  constructor(private playerService : PlayerService,private http:HttpClient) {

    this.currentPlayer = this.playerService.currentPlayer;
    this.housesOfCamapaign = [];
  }

  public postHouse(house:House){
    this.url = "https://api-easy-winter-phase.vercel.app/housesmanagement";

    return this.http.post(this.url,house);
  }

  public getHouse(house_id:number){
    this.url = "https://api-easy-winter-phase.vercel.app/housesmanagement?house_id=" + house_id;
    // console.log("House_id: " + house_id);
    

    return this.http.get(this.url);
  }

  public deleteHouse(house:House){
    let house_id = house.house_id;

    this.url = "https://api-easy-winter-phase.vercel.app/housesmanagement"
  const httpOptions = {header : {"Content-type" : "application/json; charset= UTF-8"}, body : {"house_id" : house_id}}

  return this.http.delete(this.url,httpOptions);
  }


  public updateHouse(house:House){
    // let house_id = house.house_id;
    this.url = "https://api-easy-winter-phase.vercel.app/createhouse";
    return this.http.put(this.url,house)

  }

  public updateEconomyLevels(house:House){
    // let house_id = house.house_id;
    this.url = "https://api-easy-winter-phase.vercel.app/phase4";
    return this.http.put(this.url,house)

  }


}



//house Management
//  -boton crear
//    .crear un año
//    .actualizar el id año de los PNJ
//    .insert en la tabla de relaccion player-years con los datos