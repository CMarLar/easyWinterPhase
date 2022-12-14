import { Component } from '@angular/core';

@Component({
  selector: 'app-winter-phase1',
  templateUrl: './winter-phase1.component.html',
  styleUrls: ['./winter-phase1.component.css']
})

export class WinterPhase1Component {

 public miUsuario: Usuario;
WinterPhaseMainComponent: any;

 constructor(){
  
  this.miUsuario = new Usuario( 1, "Irene", "Herrero Becker", "irenisima82@hotmail.com","https://w7.pngwing.com/pngs/993/324/png-transparent-leopard-middle-ages-lion-griffin-heraldry-leopard.png","Serpiente");


 }

}

export class Usuario {

  public id_usuario: number
  public nombre: string
  public apellidos: string
  public correo:string
  public imagen_escudo: string
  public password: string


  constructor(id_usuario: number, nombre: string, apellidos: string, correo: string, imagen_escudo: string, password: string){

      this.id_usuario = id_usuario;
      this.nombre = nombre;
      this.apellidos = apellidos;
      this.correo = correo;
      this.imagen_escudo = imagen_escudo;
      this.password = password

  }
}
////para meter la info de usuario, hacer clase, model??? 

// OBJETOS LITERALES 

/* export class PerfilComponent implements OnInit{

   public miUsuario: Usuario;

  constructor(){

    this.miUsuario = new Usuario( 1, "Irene", "Herrero Becker", "irenisima82@hotmail.com","https://i.pinimg.com/280x280_RS/71/7a/08/717a08bf7a48049f3e721cfdbf5daabb.jpg","Serpiente");
   }

   enviar(nuevoNombre: string, nuevoApellidos:  string, nuevoCorreo: string, nuevoFoto: string){

        (console.log(this.miUsuario.nombre));     /*   HTMLInputElement */

      /*   (nuevoNombre:HTMLInputElement, nuevoApellidos:  HTMLInputElement, nuevoCorreo:HTMLInputElement, nuevoUrl:HTMLInputElement) */

       /*   this.miUsuario.nombre = nuevoNombre.value;
         this.miUsuario.apellidos = nuevoApellidos.value;  /*  .value */
       /*   this.miUsuario.correo = nuevoCorreo.value;
         this.miUsuario.url =  nuevoUrl.value; */ 

 /*         this.miUsuario.nombre = nuevoNombre;
         this.miUsuario.apellidos = nuevoApellidos;  /*  .value */
 /*         this.miUsuario.correo = nuevoCorreo;
         this.miUsuario.foto =  nuevoFoto;
         
   }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

}  */