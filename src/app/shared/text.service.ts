import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Text } from "../models/text";

 

@Injectable({
  providedIn: 'root'
})
export class TextService {
  getPhases() {
    throw new Error('Method not implemented.');
  }

  private url = "http://localhost:3000/phase1"

   public textos : Text[];

   constructor(private http: HttpClient) {

   
   }


// métodos públicos:
// con servicios
public getAllTexts (text_id:number){//GET “/phases?id=1”
  //get me pide un string:
  let id = text_id;

  return this.http.get(this.url + "?id=" + id)//retorna observable
}
}

