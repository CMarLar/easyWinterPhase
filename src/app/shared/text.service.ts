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

  private url = "https://api-easy-winter-phase.vercel.app/phase1"

   public textos : Text[];

   constructor(private http: HttpClient) {

   this.textos = [];
   }


// métodos públicos:
// con servicios
public getAllTexts (text_id:number){//GET “/phases?id=1”
  //get me pide un string:
  let resultado;
  // console.log("ESTO ES EL RESULTADO DE TEXTO" + text_id);
  

  if(text_id != null){
    // console.log("TAL VEZ ENTRO AQUI?");
    
    let id = text_id;
    resultado = this.http.get(this.url + "?id=" + id);
  }else{
    // console.log("ENTRO AQUI");
    
    resultado = this.http.get(this.url);
  }
  

  return resultado//retorna observable
}
}

