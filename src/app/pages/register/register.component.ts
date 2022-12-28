import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public isHide : boolean;
  public error : string;

  constructor(private router : Router, private userService : UserService){
    this.isHide = true
  }

  public addUser(user : string, mail : string,pass : string,confirmPass : string){

    console.log(user);
    
    if(user != ""){
      // console.log("PASO");
      
      if(this.validateEmail(mail)){

        // console.log("Correo electronico valido");
        if(this.validatePass(pass)){
          
          if(pass == confirmPass){
  
            this.userService.register(this.userService.user = new User(pass,mail,"../../../assets/img/img_perfil.png",user))
            .subscribe(function (data){
              console.log(data);
            })
            console.log(this.userService.user);
            
            this.goPlace();

          }else{
            // console.log("las contraseñas no coinciden");
            this.isHide = false;
            this.error = "LAS CONTRASEÑAS NO COINCIDEN";
        
            
          }
        }else{
          // console.log("La contraseña debe contener al menos una minuscula, una mayuscula, un digito y un caracter especial");
          this.isHide = false;
          this.error = "La contraseña debe contener al menos una minúscula, una mayúscula, un digito y un carácter especial";
        }
  
      }else{
        // console.log("Correo electronico invalido");
        this.isHide = false;
        this.error = "CORREO ELECTRÓNICO NO VÁLIDO";
        
      }

    }else{
      // console.log("NO PASO");
      this.isHide = false;
      this.error = "DEBES INTRODUCIR UN NOMBRE DE USUARIO"
    }

    


  }

  // ESTA FUNCION COMPRUEBA QUE LA CONTRASEÑA INTRODUCIDA TENGA UNA LETRA MAYUSCULA,MINUSCULA,
  // UN DIGITO, Y UN CARACTER ESPECIAL, ADEMAS DE TENER UNA LONGITUD ENTRE 8 y 20
  public validatePass(pass : string) : boolean{
    let result : boolean = false;
    console.log("longitud : " + pass.length);
    
    if(pass.length > 8 && pass.length < 20 ){
      console.log("ENTRA");
      
      let regExp =new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&-_])[A-Za-z\d$@$!%*?&-_]{8,20}[^'\s]/)
      console.log("REGEX VALUE: " + regExp.test(pass));
      result = true;
    }else{
      console.log("NO ENTRA");
      
    }
    
    return result;
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
