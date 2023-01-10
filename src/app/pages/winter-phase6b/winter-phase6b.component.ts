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
  public lovers:any;

  constructor(public playerService:PlayerService, public houseService:HouseService, public characterService:CharacterService, public campaignService:CampaignService, public yearService: YearService){


    console.log("Current house: " + JSON.stringify(this.houseService.currentHouse));
    console.log("Current house characters (winter phase)" + JSON.stringify(this.characterService.currentHouseCharsWinterPhase));
    console.log("Active character: " + JSON.stringify(this.characterService.currentActiveChar));


    //Bucle para recoger a la esposa:

    for (let i = 0; i < this.characterService.currentHouseCharsWinterPhase.length; i++) {

      if (this.characterService.currentHouseCharsWinterPhase[i].role == "Esposa"){
        this.wife = this.characterService.currentHouseCharsWinterPhase[i]
        console.log("Esposa: " + this.characterService.currentHouseCharsWinterPhase[i].char_name);
        
      }
      
    }

    //Bucle para recoger a las amantes:

    for (let i = 0; i < this.characterService.currentHouseCharsWinterPhase.length; i++) {

      this.lovers = [];
      if (this.characterService.currentHouseCharsWinterPhase[i].role == "Amante"){
        this.lovers.push(this.characterService.currentHouseCharsWinterPhase[i])
        console.log("Amantes: "  + JSON.stringify(this.characterService.currentHouseCharsWinterPhase[i]));
        
      }
      
    }






    this.currentPlayerName = this.playerService.currentPlayer.player_name;
    this.foto_escudo = this.houseService.currentHouse.shield;

    this.mujerRol = ["Esposa", "Amante"]

    this.pj = {nombre : this.characterService.currentActiveChar.char_name,
              edad : 35,
              isMarried : true,
              esposa : {nombre : "Carlos",
                      edad : 33,
                      partoLastYear : false,
                      rol : "Esposa",
                      isAlive : true},
              amantes : [{
                nombre : "Antonia",
                edad : 29,
                partoLastYear : true,
                rol : "Amante",
                isAlive : true
              },
              {
                nombre : "Paquito",
                edad : 28,
                isAlive : true
              }],

            hijos : [{nombre : "paco",
                      edad : 3,
                      sexo : "hombre"}]}

    this.isHide = true;
    
   }

   public calcularNacimientos(name : string){

    for (let i = 0; i < this.lovers.length;i++){

      if(name == this.lovers[i].char_name){

        let dado = Math.floor((Math.random() * 20) + 1);
        let dadoHijo = Math.floor((Math.random() * 6) + 1);

        if (dado > 0 && dado <=10){
        
          console.log("NINGUN HIJO");
          this.resultadoHijos = "No has tenido ningun hijo";
          
    
        }else if(dado == 11){
    
          console.log("Tu amante y tu hijo mueren durante el parto");
          this.resultadoHijos = "Tu amante y tu hijo mueren durante el parto";
          this.lovers[i].char_status = 0;
          
          this.lovers.splice(i,1);
  
    
        }else if(dado == 12){
    
          console.log("EL HIJO VIVE PERO LA MUJER MUERE DURANTE EL PARTO");
          this.resultadoHijos = "El hijo vive pero tu mujer muere durante el parto";
          this.lovers[i].char_status = 0;
          this.lovers.splice(i,1);
  
          if (dadoHijo % 2 == 0){
            this.sexoHijo = "Hombre";
          }else{
            this.sexoHijo = "Mujer";
          }
          
          
        }else if(dado == 13){
          
          console.log("NACEN GEMELOS");
          this.resultadoHijos = "Nacen gemelos";
          
    
        }else{
    
          console.log("NACE UN HIJO");
          this.resultadoHijos = "Nace un hijo";
          
        }
  
      }


    }
    


    
    this.isHide = false;
   }

   public calcularNacimientosEsposa(){

      let dado = Math.floor((Math.random() * 20) + 1);
      let dadoHijo = Math.floor((Math.random() * 6) + 1);

      if (dado > 0 && dado <=10){
      
        console.log("NINGUN HIJO");
        this.resultadoHijos = "No has tenido ningun hijo";
        
  
      }else if(dado == 11){
  
        console.log("LA MUJER Y EL HIJO MUEREN DURANTE EL PARTO");
        this.resultadoHijos = "Tu mujer y tu hijo mueren durante el parto";
        this.characterService.currentActiveChar.isMarried = 0;
        this.wife.char_status = 0;
        this.wife.role = "Esposa (muerta)"
        // this.pj.esposa = null;

  
      }else if(dado == 12){
  
        console.log("EL HIJO VIVE PERO LA MUJER MUERE DURANTE EL PARTO");
        this.resultadoHijos = "El hijo vive pero tu mujer muere durante el parto";
        this.characterService.currentActiveChar.isMarried = 0;
        this.wife.char_status = 0;
        // this.pj.esposa = null;

        if (dadoHijo % 2 == 0){
          this.sexoHijo = "Hombre";
        }else{
          this.sexoHijo = "Mujer";
        }
        
        
      }else if(dado == 13){
        
        console.log("NACEN GEMELOS");
        this.resultadoHijos = "Nacen gemelos";
        
  
      }else{
  
        console.log("NACE UN HIJO");
        this.resultadoHijos = "Nace un hijo";
        
      }

      this.isHide = false;

   }
  
}
