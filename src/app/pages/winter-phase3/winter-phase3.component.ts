import { Component } from '@angular/core';
import { parseJsonConfigFileContent, StringMappingType } from 'typescript';
import { PlayerService } from 'src/app/shared/player.service';
import { Player } from 'src/app/models/player';
import { HouseService } from 'src/app/shared/house.service';
import { CharacterService } from 'src/app/shared/character.service';
import { CampaignService } from 'src/app/shared/campaign.service';
import { YearService } from 'src/app/shared/year.service';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { Character } from 'src/app/models/character';


@Component({
  selector: 'app-winter-phase3',
  templateUrl: './winter-phase3.component.html',
  styleUrls: ['./winter-phase3.component.css']
})
export class WinterPhase3Component {

  
  WinterPhaseMainComponent: any;

  public currentPlayerName:string;
  public foto_escudo : string

  public personaje: string
  public edad_personaje: number
  public personaje2: string
  public edad_personaje2: number
  public nombre_pnj: string


  public pj : any;
  public pnj : any;
  public isHide : boolean;
  public newEscudero : any;

  public nombres_personajes : Character[];
  public escudero_personaje : Character;

  public statschanges : any[];

  public makeNewSquire: boolean;

   constructor(public router : Router,public userService : UserService,public playerService: PlayerService, public houseService: HouseService, public characterService:CharacterService, public campaignService:CampaignService, public yearService:YearService){
    if(this.userService.logueado==false){
      this.router.navigateByUrl("/login");
    }
    console.log("Current campaign name: " + this.campaignService.currentCampaign.campaign_name);
    console.log("Current year: " + JSON.stringify(this.yearService.currentYear));
    console.log("Current house: " + JSON.stringify(this.houseService.currentHouse));
    console.log("Current house characters (winter phase)" + JSON.stringify(this.characterService.currentHouseCharsWinterPhase));
    console.log("Active character: " + JSON.stringify(this.characterService.currentActiveChar));
    console.log("PLAYERSERVICE.playersOfCampaign: " + JSON.stringify(this.playerService.playersOfCampaign));
    
    this.foto_escudo = this.houseService.currentHouse.shield

    this.currentPlayerName = this.playerService.currentPlayer.player_name;

    this.statschanges = [];

    this.nombres_personajes = [];

    this.makeNewSquire = false;

    //Rellenamos de personajes vÃ¡lidos
    for (let i = 0; i < this.characterService.currentHouseCharsWinterPhase.length; i++) {
      if(this.characterService.currentHouseCharsWinterPhase[i].character_id != this.houseService.currentHouse.activeChar && this.characterService.currentHouseCharsWinterPhase[i].age >= 35 && this.characterService.currentHouseCharsWinterPhase[i].char_status == 1)

      this.nombres_personajes.push(this.characterService.currentHouseCharsWinterPhase[i]);

      //añadimos el escudero
      if(this.characterService.currentHouseCharsWinterPhase[i].role == "Escudero" && this.characterService.currentHouseCharsWinterPhase[i].char_status != 0){
        this.escudero_personaje = this.characterService.currentHouseCharsWinterPhase[i];
      }


    }

    if (this.escudero_personaje.age >=21){

      for(let i = 0; i < this.characterService.currentHouseCharsWinterPhase.length; i++){
        if(this.characterService.currentHouseCharsWinterPhase[i].character_id == this.escudero_personaje.character_id){

          this.characterService.currentHouseCharsWinterPhase[i].role = "Caballero";
          this.escudero_personaje.role = "Caballero";
          this.characterService.modifyCharacter(this.escudero_personaje)
          .subscribe((data : any) => {
            console.log(data);
            
          })
        }
      }

      
    }
    this.isHide = true;


   }

   public envejecimientoAutomatico(){

    this.tiradaRandom();
    this.isHide = false;
   
  }

  nuevoEscudero(nombreEscudero : string){

    let newEscudero = new Character(null,this.escudero_personaje.house_id,this.escudero_personaje.year_id,nombreEscudero,15,1,0,0,0,"Escudero","Hombre");

    console.log("PERSONAJES FASE DE INVIERNO: " + this.characterService.currentHouseCharsWinterPhase);
    console.log("PERSONAJES DE TODA LA CASA: " + this.characterService.currentHouseChars);
    
    this.characterService.currentHouseCharsWinterPhase.push(newEscudero);

    this.characterService.newCharacter(newEscudero)
    .subscribe((data : any) => {
      console.log(data);
      
    })

    this.makeNewSquire = true;
  }

  //A PARTIR DE AQUI EMPIEZA LA VAINA DEL MODAL
  public tiradaRandom(){
    
    let dado1 : number;
    let dado2 : number;
    let result : number;

    if(this.statschanges.length > 0){
      this.statschanges = [];
    }

    dado1 = Math.floor((Math.random() * 5) +1);
    dado2 = Math.floor((Math.random() * 5) +1);
    result = dado1 + dado2;
    console.log("RESULTADO PRIMER DADO: " + result)

    if(result == 2 || result == 12){

      this.statschanges = this.calcularTiradaStats(4);

    }else if (result == 3 || result == 11){
      this.statschanges = this.calcularTiradaStats(3);
    }else if (result == 4 || result == 10){
      this.statschanges = this.calcularTiradaStats(2);
    }else if (result == 5 || result == 9){
      this.statschanges = this.calcularTiradaStats(1);
    }else{
      this.statschanges = ["Ninguna caracteristica se ha visto afectada"]
    }





    
  }

  public calcularTiradaStats(tiradas : number = 0) : string[]{
    let result : string[] = [];
    let dado1 : number;

    for (let i = 0; i < tiradas; i++){

      dado1 = Math.floor((Math.random() * 6) +1);
      console.log("Resultado dado estadisticas: " + dado1);

      if (dado1 == 1){
        result.push("TAM");
      }else if(dado1 == 2){
        result.push("DES");
      }else if(dado1 == 3){
        result.push("FUE");
      }else if(dado1 == 4){
        result.push("CON");
      }else if(dado1 == 5){
        result.push("APA");
      }else if(dado1 == 6){
        result.push("No hay perdida");
      }
    }

    console.log("RESULTADO: " + result);
    
    return result;
  }
  
  public cerrarModal(hide : boolean){

    this.isHide = hide;
  }
  }


