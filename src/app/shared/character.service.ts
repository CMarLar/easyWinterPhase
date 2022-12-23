import { Injectable } from '@angular/core';
import { Character } from '../models/character';
//posiblemente haya que importar el servicio house

@Injectable({
  providedIn: 'root'
})
export class CharacterService {

  private url:string = "http://localhost:3000/";;

  public currentActiveChar;//llama a active char

  public currentHouse;//llama a la casa activa

  public currentHouseChars;//array de personajes de una casa

  constructor() { }
}
