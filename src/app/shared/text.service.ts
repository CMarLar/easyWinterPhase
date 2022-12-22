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



/* public getAllBooks (id_usuario:number){//GET “/libros?id_usuario=Pepe”
  //get me pide un string:
  let id = id_usuario
  return this.http.get(this.url + "libros?id_usuario=" + id)//retorna observable
}

public getOneBook (id_usuario:number, id_libro:number){
  return this.http.get(this.url + "libro?id_usuario=" + id_usuario + "&id_libro=" + id_libro)
} */