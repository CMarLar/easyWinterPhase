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

  private url:string = "https://api-easy-winter-phase.vercel.app/";

  public currentActiveChar:Character;//llama a active char
  public currentHouse:House;//llama a la casa activa
  public currentHouseChars: Character[];//array de personajes de una casa

  public allCharactersOfCampaign : Character[];

  public mainCharacters : Character[];

  public currentHouseCharsWinterPhase: Character[];//Array de personajes de una casa seleccionados para la fase de invierno en curso
  public haveWife : boolean;

  constructor(public houseService:HouseService, public http: HttpClient) { 

    this.currentHouse = this.houseService.currentHouse;

    this.currentHouseChars = [];
    this.allCharactersOfCampaign = [];
    this.mainCharacters = [];
    this.haveWife = false;
    // this.currentActiveChar.character_id = this.houseService.currentHouse.activeChar //comentado porque jode CREATEHOUSE

  }

  public newCharacter(character:Character){
    this.url = "https://api-easy-winter-phase.vercel.app/createhouse"
    return this.http.post(this.url,character)//habría que cambiar esto al formato de arriba
  
  }


  public getCharacters(house_id:number){

    let houseId = house_id;
    
    this.url = "https://api-easy-winter-phase.vercel.app/"
    return this.http.get(this.url + "addnpc?house_id=" + houseId)
  }

/* irene // EL BACK FUNSSIONA */ //mostrar los personajes mayores de 15 años de la casa
public getCharactersNames(house_id: number, year_id: number){

  this.url = "https://api-easy-winter-phase.vercel.app/phase7"
  return this.http.get(this.url + "?house_id=" + house_id + "&year_id=" + year_id)
}
/*  */
  public getCharactersByYear(house_id:number,year_id : number){

    // console.log("LLEGA ESTO: " + house_id + " Y " + year_id);
    
    this.url = "https://api-easy-winter-phase.vercel.app/"
    return this.http.get(this.url + "currentcampaignCharacterByYear?house_id=" + house_id + "&year_id=" + year_id)
  }


  public deleteCharacter(character_id:number){

    let id = character_id;

    this.url = "https://api-easy-winter-phase.vercel.app/"
    
    const httpOptions = {header:null, body: {character_id}}

    return this.http.delete(this.url + "addnpc?character_id=" +id,httpOptions)

  }

  public deleteCharacterByHouse(house_id:number){

    let id = house_id;

    this.url = "https://api-easy-winter-phase.vercel.app/housemanagementDeleteHouse"
    
    const httpOptions = {header:null, body: {house_id}}

    return this.http.delete(this.url,httpOptions)

  }

  public modifyCharacter (character:Character){

    this.url = "https://api-easy-winter-phase.vercel.app/"

    return this.http.put(this.url + "addnpc", character)
  }

  //CREA VARIOS CHARACTERS JUNTOS
  public postCharacters(characters : Character[]){

    this.url = "https://api-easy-winter-phase.vercel.app/currentcampaignCharacter"

    return this.http.post(this.url, characters);
  }

  public getMainChar(character_id:number){

    let id = character_id;
    this.url = "https://api-easy-winter-phase.vercel.app/"
    return this.http.get(this.url + "phase8?character_id=" + id)
  }

  public resetMarriageGlory (character:Character){

    this.url = "https://api-easy-winter-phase.vercel.app/"

    return this.http.put(this.url + "phase9", character)
  }

  public getWinterPhaseChars(house_id:number,year_id:number){

    let houseId = house_id;
    let yearId = year_id;
    
    this.url = "https://api-easy-winter-phase.vercel.app/"
    return this.http.get(this.url + "winterphasemain?house_id=" + houseId + "&year_id=" + yearId)
  }





}