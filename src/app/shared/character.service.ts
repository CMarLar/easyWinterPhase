import { Injectable } from '@angular/core';
import { Character } from '../models/character';
import { House } from '../models/house';
import { HouseService } from './house.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private url:string = "http://localhost:3000/";

  public currentActiveChar:Character;//llama a active char
  public currentHouse:House;//llama a la casa activa
  public currentHouseChars: Character[];//array de personajes de una casa


  constructor(public houseService:HouseService, public http: HttpClient) { 

    this.currentHouse = this.houseService.currentHouse;

    this.currentHouseChars = [];

    // this.currentActiveChar.character_id = this.houseService.currentHouse.activeChar //comentado porque jode CREATEHOUSE

  }

  public newCharacter(character:Character){
    this.url = "http://localhost:3000/createhouse"
    return this.http.post(this.url,character)
  
  }









}
