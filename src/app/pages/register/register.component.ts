import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public user : {}
  constructor(private router : Router){

  }

  public addUser(mail : string,pass : string,confirmPass : string){

    if(this.validateEmail(mail)){

      console.log("Correo electronico valido");
      if(this.validatePass){
        
        if(pass == confirmPass){

          this.user = {correo : mail, contraseña : pass};
          this.goPlace();

        }else{
          console.log("las contraseñas no coinciden");
          
        }
      }else{
        console.log("La contraseña debe contener al menos una minuscula, una mayuscula, un digito y un caracter especial");
        
      }

    }else{

      console.log("Correo electronico invalido");
      
    }


  }

  // ESTA FUNCION COMPRUEBA QUE LA CONTRASEÑA INTRODUCIDA TENGA UNA LETRA MAYUSCULA,MINUSCULA,
  // UN DIGITO, Y UN CARACTER ESPECIAL, ADEMAS DE TENER UNA LONGITUD ENTRE 8 y 20
  public validatePass(pass : string) : boolean{
    let regExp =new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&-_])[A-Za-z\d$@$!%*?&-_]{8,20}[^'\s]/)
    console.log("REGEX VALUE: " + regExp.test(pass))
    return regExp.test(pass);
  }

  public validateEmail(email : string) : boolean{

    let regExp = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    console.log("REGEX CORREO VALUE: " + regExp.test(email));
    
    return regExp.test(email);
  }

  public goPlace(){

    this.router.navigateByUrl("/login");
  }
}

// EN PRINCIPIO LA VALIDACION DEL CORREO ESTA TERMINADA SOLO HAY QUE COMPROBARLA EN EL METODO ON CLICK Y CON ESO CREAR EL OBJETO Y ENVIAR A LA PAGINA LOGIN
