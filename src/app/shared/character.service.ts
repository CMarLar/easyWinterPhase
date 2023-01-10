import { Injectable } from '@angular/core';
import { Character } from '../models/character';
import { House } from '../models/house';
import { HouseService } from './house.service';
import { HttpClient } from '@angular/common/http';
import { Year } from '../models/year';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private url:string = "http://localhost:3000/";

  public currentActiveChar:Character;//llama a active char
  public currentHouse:House;//llama a la casa activa
  public currentHouseChars: Character[];//array de personajes de una casa

  public allCharactersOfCampaign : Character[];

  public mainCharacters : Character[];

  public currentHouseCharsWinterPhase: Character[];//Array de personajes de una casa seleccionados para la fase de invierno en curso


  constructor(public houseService:HouseService, public http: HttpClient) { 

    this.currentHouse = this.houseService.currentHouse;

    this.currentHouseChars = [];
    this.allCharactersOfCampaign = [];
    this.mainCharacters = [];

    // this.currentActiveChar.character_id = this.houseService.currentHouse.activeChar //comentado porque jode CREATEHOUSE

  }

  public newCharacter(character:Character){
    this.url = "http://localhost:3000/createhouse"
    return this.http.post(this.url,character)//habría que cambiar esto al formato de arriba
  
  }


  public getCharacters(house_id:number){

    let id = house_id;
    this.url = "http://localhost:3000/"
    return this.http.get(this.url + "addnpc?house_id=" + id)
  }


  public deleteCharacter(character_id:number){

    let id = character_id;

    this.url = "http://localhost:3000/"
    
    const httpOptions = {header:null, body: {character_id}}

    return this.http.delete(this.url + "addnpc?character_id=" +id,httpOptions)

  }

  public deleteCharacterByHouse(house_id:number){

    let id = house_id;

    this.url = "http://localhost:3000/housemanagementDeleteHouse"
    
    const httpOptions = {header:null, body: {house_id}}

    return this.http.delete(this.url,httpOptions)

  }

  public modifyCharacter (character:Character){

    this.url = "http://localhost:3000/"

    return this.http.put(this.url + "addnpc", character)
  }

  //MODIFICA VARIOS CHARACTER JUNTOS
  public putCharacters (characters : Character[]){

    this.url = "http://localhost:3000/housemanagementCharacters"

    return this.http.put(this.url, {"characters" : characters})
  }
  //CREA VARIOS CHARACTERS JUNTOS
  public postCharacters(characters : Character[]){

    this.url = "http://localhost:3000/currentcampaignCharacter"

    return this.http.post(this.url, characters);
  }



}
