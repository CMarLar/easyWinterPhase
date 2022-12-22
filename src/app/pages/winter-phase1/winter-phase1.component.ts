import { Component, OnInit } from '@angular/core';
import { TextService } from 'src/app/shared/text.service';
import { Text } from 'src/app/models/text';
import { json } from 'express';


@Component({
  selector: 'app-winter-phase1',
  templateUrl: './winter-phase1.component.html',
  styleUrls: ['./winter-phase1.component.css']
})

export class WinterPhase1Component{

WinterPhaseMainComponent: any;
public nombre: string
public apellidos: string
public foto_escudo : string
/* public texto2: string */

public textos: Text [];

 constructor(private textosService: TextService){

/*   this.texto2 = "Escoge una aventura en solitario  del libro básico de Pendragó juégala. Asegúrate que apunta en su hoja de personaje los puntos de gloria, atributos,rasgos, habilidades, etcétera que haya ganado y pulsa siguiente." */
  
  this.nombre = "Irene",
  this.apellidos = "Herrero Becker"
  this.foto_escudo = "../../../assets/img/escudo10.png"
  this.mostrarTextos(1) 
  this.textos = []


}

public mostrarTextos(id: number){

  this.textosService.getAllTexts(id).subscribe((data: Text[])=>{

    this.textos = data;
    console.log(data)
    console.log(JSON.stringify(data))
  })
} 

}

/*   public searchBooks(inputBookId:string){//los campos siempre devuelven strings
    if(inputBookId == ""){
      this.libroService.getAllBooks(this.usuarioService.usuario.id_usuario)//coge el id del usuario logueado
      .subscribe((data: Libro[]) =>{//data es el mismo tipo que el observable que viene de la api
        this.libros = data;
      })
    }else{
      this.libroService.getOneBook(this.usuarioService.usuario.id_usuario,parseInt(inputBookId))
      .subscribe((data: Libro[]) =>{
        this.libros = data;
      })
      // this.libros = [this.libroService.getOne(parseInt(inputBookId))]
    }
  } */



    



