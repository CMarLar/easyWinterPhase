import { Component } from '@angular/core';
import { parseCommandLine } from 'typescript';
import { PlayerService } from 'src/app/shared/player.service';
import { House } from 'src/app/models/house';
import { HouseService } from 'src/app/shared/house.service';
import { CharacterService } from 'src/app/shared/character.service';
import { CampaignService } from 'src/app/shared/campaign.service';
import { YearService } from 'src/app/shared/year.service';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/character';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-winter-phase6b',
  templateUrl: './winter-phase6b.component.html',
  styleUrls: ['./winter-phase6b.component.css']
})
export class WinterPhase6bComponent {

  public nombre: string
  public apellidos: string
  public foto_escudo : string

  public cisrcunstanciaEconomica: number
  public edadMadre: number

  // public mujer: string[]
  public mujerRol: string[]

  public pj : any;
  public isHide : boolean;
  public resultadoHijos : string;
  public sexoHijo : string;

  public currentPlayerName:string;


  public wife:Character
  public lover:Character;//no se usa de momento
  public lovers:Character[];

  public circunstanciaEconomica : number;
  public modificadorMadre : number;

  public datosBirth : any;

  constructor(public router : Router,public userService : UserService,public playerService:PlayerService, public houseService:HouseService, public characterService:CharacterService, public campaignService:CampaignService, public yearService: YearService){

    if(this.userService.logueado==false){
      this.router.navigateByUrl("/login");
    }

    // console.log("Current house: " + JSON.stringify(this.houseService.currentHouse));
    // console.log("Current house characters (winter phase)" + JSON.stringify(this.characterService.currentHouseCharsWinterPhase));
    // console.log("Active character: " + JSON.stringify(this.characterService.currentActiveChar));


    //Bucle para recoger a la esposa:

    for (let i = 0; i < this.characterService.currentHouseCharsWinterPhase.length; i++) {

      if (this.characterService.currentHouseCharsWinterPhase[i].role == "Esposa"){
        this.wife = this.characterService.currentHouseCharsWinterPhase[i]
        // console.log("Esposa: " + this.characterService.currentHouseCharsWinterPhase[i].char_name);
        
      }
      
    }
    if(this.wife == null || undefined){
      this.characterService.haveWife = false;
    }else{
      this.characterService.haveWife = true;
    }

    //Bucle para recoger a las amantes:

    this.lovers = [];

    for (let i = 0; i < this.characterService.currentHouseCharsWinterPhase.length; i++) {


      if (this.characterService.currentHouseCharsWinterPhase[i].role == "Amante"){
        this.lovers.push(this.characterService.currentHouseCharsWinterPhase[i])
        // console.log("Amantes: "  + JSON.stringify(this.characterService.currentHouseCharsWinterPhase[i]));
        
      }
      
    }

    //CALCULAR MODIFICACION ECONOMICA
    if(this.houseService.currentHouse.economyLevels == "Indigente"){
      this.circunstanciaEconomica = -15
    }
    if(this.houseService.currentHouse.economyLevels == "Pobre"){
      this.circunstanciaEconomica = -5
    }
    if(this.houseService.currentHouse.economyLevels == "Normal"){
      this.circunstanciaEconomica = 0
    }
    if(this.houseService.currentHouse.economyLevels == "Rico"){
      this.circunstanciaEconomica = 3
    }
    if(this.houseService.currentHouse.economyLevels == "Muy Rico"){
      this.circunstanciaEconomica = 5
    }

    //OBJETO QUE SE LE PASA AL HIJO
    this.datosBirth = {
      "resultado" : null,
      "modificadorEconomico" : this.circunstanciaEconomica,
      "modificadorMadre" : null,
      "sexoHijo" : ""
    },

    this.currentPlayerName = this.playerService.currentPlayer.player_name;
    this.foto_escudo = this.houseService.currentHouse.shield;

    this.mujerRol = ["Esposa", "Amante"]

    this.isHide = true;
    
   }

   //AQUI AMANTES
   public calcularNacimientos(name : string){

    let dado = Math.floor((Math.random() * 20) + 1);
    let dadoHijo = Math.floor((Math.random() * 6) + 1);
    let modificadorMadre;
    let amante : Character;
    // console.log("ESTE ES EL PARAMETRO: " + name);
    // console.log("ESTE ES LOVER ANTES DE ASIGNARA  AMANTE");
    
    
    // console.log("DADOS ANTES DE MODIFICAR: " + dado);

    for(let i = 0; i < this.lovers.length; i++){

      if(this.lovers[i].char_name == name){
        amante = this.lovers[i];
        // console.log("ESTA ES LA AMANTE: " + amante);
      }
    }
    

    if(amante.age > 30){
      modificadorMadre = amante.age - 30;
      this.datosBirth.modificadorMadre = modificadorMadre;
    }

    dado = (dado - modificadorMadre) + this.circunstanciaEconomica;
    if(dado <= 0){
      dado = 0;
    }
    // console.log("DADOS: " + dado);
    
    
    

    if (dado <= 10){
    
      // console.log("NINGUN HIJO");
      this.resultadoHijos = "No has tenido ningun hijo";
      this.datosBirth.resultado = this.resultadoHijos;
      

    }else if(dado == 11){

      // console.log("LA MUJER Y EL HIJO MUEREN DURANTE EL PARTO");
      this.resultadoHijos = "Tu mujer y tu hijo mueren durante el parto";
      amante.char_status = 0;
      amante.role = "Amante (muerta)";
      this.datosBirth.resultado = this.resultadoHijos;
      this.modificarEsposa(amante);
      this.modificarPersonajeActivo();
      // this.pj.esposa = null;


    }else if(dado == 12){

      // console.log("EL HIJO VIVE PERO LA MUJER MUERE DURANTE EL PARTO");
      this.resultadoHijos = "El hijo vive pero tu mujer muere durante el parto";
      this.characterService.currentActiveChar.isMarried = 0;
      amante.char_status = 0;
      this.wife.role = "Amante (muerta)";
      // this.pj.esposa = null;

      if (dadoHijo % 2 == 0){
        this.datosBirth.sexoHijo = "Hombre";
      }else{
        this.datosBirth.sexoHijo = "Mujer";
      }
      this.datosBirth.resultado = this.resultadoHijos;
      this.modificarEsposa(amante);
      this.modificarPersonajeActivo();
      
      
    }else{

      // console.log("NACE UN HIJO");
      this.resultadoHijos = "Nace un hijo";
      this.datosBirth.resultado = this.resultadoHijos;
      
    }

    this.isHide = false;
   }

   //AQUI ESPOSA
   public calcularNacimientosEsposa(){

      let dado = Math.floor((Math.random() * 20) + 1);
      let dadoHijo = Math.floor((Math.random() * 6) + 1);
      let modificadorMadre;
      // console.log("DADOS ANTES DE MODIFICAR: " + dado);
      

      if(this.wife.age > 30){
        modificadorMadre = this.wife.age - 30;
        this.datosBirth.modificadorMadre = modificadorMadre;
      }

      dado = (dado - modificadorMadre) + this.circunstanciaEconomica;
      if(dado <= 0){
        dado = 0;
      }
      // console.log("DADOS: " + dado);
      
      
      

      if (dado <= 10){
      
        // console.log("NINGUN HIJO");
        this.resultadoHijos = "No has tenido ningun hijo";
        this.datosBirth.resultado = this.resultadoHijos;
        
  
      }else if(dado == 11){
  
        // console.log("LA MUJER Y EL HIJO MUEREN DURANTE EL PARTO");
        this.resultadoHijos = "Tu mujer y tu hijo mueren durante el parto";
        this.characterService.currentActiveChar.isMarried = 0;
        this.wife.char_status = 0;
        this.wife.role = "Esposa (muerta)";
        this.datosBirth.resultado = this.resultadoHijos;
        this.modificarEsposa();
        this.modificarPersonajeActivo();
        // this.pj.esposa = null;

  
      }else if(dado == 12){
  
        // console.log("EL HIJO VIVE PERO LA MUJER MUERE DURANTE EL PARTO");
        this.resultadoHijos = "El hijo vive pero tu mujer muere durante el parto";
        this.characterService.currentActiveChar.isMarried = 0;
        this.wife.char_status = 0;
        this.wife.role = "Esposa (muerta)";
        // this.pj.esposa = null;

        if (dadoHijo % 2 == 0){
          this.datosBirth.sexoHijo = "Hombre";
        }else{
          this.datosBirth.sexoHijo = "Mujer";
        }
        // this.datosBirth.sexoHijo = this.sexoHijo;
        this.datosBirth.resultado = this.resultadoHijos;
        this.modificarEsposa();
        this.modificarPersonajeActivo();
        
        
      }else{
  
        if (dadoHijo % 2 == 0){
          this.datosBirth.sexoHijo = "Hombre";
        }else{
          this.datosBirth.sexoHijo = "Mujer";
        }
        
        // console.log("NACE UN HIJO");
        this.resultadoHijos = "Nace un hijo";
        this.datosBirth.resultado = this.resultadoHijos;
        
      }
      // console.log(JSON.stringify(this.datosBirth.sexoHijo));
      
      this.isHide = false;

   }

   public modificarPersonajeActivo(){
    
    this.characterService.modifyCharacter(this.characterService.currentActiveChar)
      .subscribe((data : any) => {
        // console.log(data);
        
      })
   }

   public modificarEsposa(amante : Character = null){
    
    if(amante == null){
      for(let i = 0; i < this.characterService.currentHouseCharsWinterPhase.length; i++) {
      
        if(this.characterService.currentHouseCharsWinterPhase[i].character_id == this.wife.character_id){
          this.characterService.currentHouseCharsWinterPhase[i].char_status = this.wife.char_status;
          this.characterService.currentHouseCharsWinterPhase[i].role = this.wife.role;
  
        }
      }
      this.characterService.modifyCharacter(this.wife)
    .subscribe((data : any) => {
      // console.log(data);
      
    })
    }else{
      for(let i = 0; i < this.characterService.currentHouseCharsWinterPhase.length; i++) {
      
        if(this.characterService.currentHouseCharsWinterPhase[i].character_id == amante.character_id){
          this.characterService.currentHouseCharsWinterPhase[i].char_status = amante.char_status;
          this.characterService.currentHouseCharsWinterPhase[i].role = amante.role;
  
        }
      }
      this.characterService.modifyCharacter(amante)
    .subscribe((data : any) => {
      // console.log(data);
      
    })
    }
    
   }
   public cerrarModal(hide : boolean){
    this.isHide = hide;
   }
  
}
