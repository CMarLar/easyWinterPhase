import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignService } from 'src/app/shared/campaign.service';
import { PlayerService } from 'src/app/shared/player.service';
import { Player } from 'src/app/models/player';
import { HouseService } from 'src/app/shared/house.service';
import { House } from 'src/app/models/house';
import { YearService } from 'src/app/shared/year.service';
import { CharacterService } from 'src/app/shared/character.service';
import { Year } from 'src/app/models/year';
import { Character } from 'src/app/models/character';
import { AdicionalService } from 'src/app/shared/adicional.service';
import { UserService } from 'src/app/shared/user.service';
import { TextService } from 'src/app/shared/text.service';
import { Text } from 'src/app/models/text';


@Component({
  selector: 'app-winter-phase-main',
  templateUrl: './winter-phase-main.component.html',
  styleUrls: ['./winter-phase-main.component.css']
})
export class WinterPhaseMainComponent {

/*
NOTAS IMPORTANTES:
-Toda la funcionalidad de esta página se hace en el front. No hay ninguna llamada a la base de datos.

-Se ha creado un atributo en yearService que almacena el año que se crea en currentcampaign. Este atributo se llama nextYear y desde aquí se le llama con variables locales.

-Para pruebas, se ha hecho que cuando se pulse en el botón "Comenzar" de cada jugador, el atributo winterPhaseDone de ese jugador en PlayersAndHouses (un objeto local de este componente) cambie a 1. Cuando todos los playersAndHouses.players.winterPhaseDone están a 1, deja avanzar al siguiente año. Lo óptimo sería que el atributo winterPhaseDone del jugador en cuestión cambiara en el servicio al TERMINAR todas las fases de invierno.Este cambio se hace en la línea 110.

-Algunos console logs útiles se han comentado porque si hay que depurar, son útiles

-nextYear() lleva a currentCampaign tal cual esté.
*/
  public campaignName:string;

  public currentYear:Year;

  public players:Player[];

  public houses:House[];

  public playersAndHouses:any;//Array de objetos literales que agrupan las casa del jugador y el jugador.

  public playersNotReady:boolean;

  public currentHouseCharsWinterPhase:any;//ESTE ES EL ARRAY DE PERSONAJES DE LA CASA CON ID DEL ÚLTIMO AÑO que se crea

  public currentPlayerSpreadOperator:any;//hecho para intentar solucionar el problema de los jugadores duplicados
  public currentPlayer:any
  public currentPlayerCopy:any


  public modifiedPlayer:Player;//para modificar los jugadores al final cambiando el atributo winterPhaseMain

  public mainCharacters:Character[];

    constructor(public router:Router, public campaignService:CampaignService, public yearService:YearService, public playerService:PlayerService, public houseService:HouseService, public characterService:CharacterService, public adicionalService:AdicionalService,public userService : UserService, public textService : TextService){

      if(this.userService.logueado==false){
        this.router.navigateByUrl("/login");
      }

      // this.playersAndHouses = [];

      //RECOGEMOS PERSONAJES , CASAS Y PERSONAJES:


      // console.log("BLOQUE DE CONTROL");
      // console.log("//////////////////");
      // console.log("Current house: " + JSON.stringify(this.houseService.currentHouse));
      // console.log("Current house characters (winter phase)" + JSON.stringify(this.characterService.currentHouseCharsWinterPhase));
      // console.log("Active character: " + JSON.stringify(this.characterService.currentActiveChar));//Se rellena en la página, cuando carga por primera vez, es undefined
      // console.log("Players and Houses con players y houses: "  + JSON.stringify(this.playersAndHouses));
      // console.log("Houses of Campaign (service): " + JSON.stringify(this.houseService.housesOfCamapaign));
      // console.log("//////////////////");

      //NOMBRE DE LA CAMPAÑA IMPORTADA DEL SERVICIO.
      this.campaignName = this.campaignService.currentCampaign.campaign_name;
      // console.log("CampaignName: " + this.campaignName);

      // console.log("campaignService.currentCampaign: " + JSON.stringify(this.campaignService.currentCampaign)); 
      
      //AÑO IMPORTADO DEL SERVICIO
      this.currentYear = this.yearService.currentYear
      // console.log("Current year: " + JSON.stringify(this.currentYear));
      
      //RECIBIENDO JUGADORES Y CASAS DE LOS SERVICIOS.
      this.players = this.playerService.playersOfCampaign//Jugadores
      // console.log("Players: " + JSON.stringify(this.players));
      this.houses = this.houseService.housesOfCamapaign//Casas
      // console.log("Houses: " + JSON.stringify(this.houses));

      // console.log("Service, next year: " + JSON.stringify(this.yearService.nextYear));//igual no hace falta

      //RECIBIENDO PERSONAJES PRINCIPALES DE LOS SERVICIOS:
      this.mainCharacters = this.characterService.mainCharacters;

      //PlayersAndHouses es un objeto del front que sirve para construir la vista con la tabla de esta página.
        this.playersAndHouses = [];
        //Llenamos el array playersAndHouses
        for (let i = 0; i < this.players.length; i++) {
          this.playersAndHouses.push({player: {player_id:null,house_id:null,campaign_id:null,player_name:null,winterPhaseDone:null},
                                      house:{house_id:null,house_name:null,activeChar:null,holding_name:null,familyCharacteristic:null,shield:null,economyLevels:null}})
          
        }
        
        for (let i = 0; i < this.players.length; i++) {
          this.playersAndHouses[i].player.player_id = this.players[i].player_id;
          this.playersAndHouses[i].player.house_id = this.players[i].house_id;
          this.playersAndHouses[i].player.campaign_id = this.players[i].campaign_id;
          this.playersAndHouses[i].player.player_name = this.players[i].player_name;
          this.playersAndHouses[i].player.winterPhaseDone = this.players[i].winterPhaseDone;
          
        }

        for (let i = 0; i < this.houses.length; i++) {
          this.playersAndHouses[i].house.house_id = this.houses[i].house_id;
          this.playersAndHouses[i].house.house_name = this.houses[i].house_name;
          this.playersAndHouses[i].house.activeChar = this.houses[i].activeChar;
          this.playersAndHouses[i].house.holding_name = this.houses[i].holding_name;
          this.playersAndHouses[i].house.familyCharacteristic = this.houses[i].familyCharacteristic;
          this.playersAndHouses[i].house.shield = this.houses[i].shield;
          this.playersAndHouses[i].house.economyLevels = this.houses[i].economyLevels;

        }

        // console.log("LAS CASAS SE CREAN POR PRIMERA VEZ EN WINTERPHASEMAIN");
        

        this.houseService.allPlayersAndAllHouses = this.playersAndHouses;//igualamos el servicio.

        // console.log("houseService.allPlayersAndAllHouses: " + JSON.stringify(this.houseService.allPlayersAndAllHouses));
        


      // console.log("PlayersService.playersOfCampaign: " + JSON.stringify(this.playerService.playersOfCampaign));

      // console.log("Players and Houses con players y houses"  + JSON.stringify(this.playersAndHouses));

      this.playersNotReady = true//puesto en true para hacer pruebas
      // console.log(`Falta por completar la FI de al menos un jugador: ${this.playersNotReady}`);
      
      this.checkPlayersReady();
      this.getAllText();

    }


    public doWinterPhase(house_id:number){
      

      // console.log("PlayersService.playersOfCampaign: " + JSON.stringify(this.playerService.playersOfCampaign));

      // console.log("ALL CHARACTERS OF CAMPAIGN: " + JSON.stringify(this.characterService.allCharactersOfCampaign))

      // console.log("CURRENT YEAR " + JSON.stringify(this.yearService.currentYear))

      for (let i = 0; i < this.playersAndHouses.length; i++) {
        
        //Coge la casa del objeto del front playersAndHouses, le cambia el winterPhaseDone a 1 en el front e iguala el currentplayerdel servicio.
        if(this.playersAndHouses[i].player.house_id == house_id){
          // this.playersAndHouses[i].player.winterPhaseDone = 1 //esto se cambiará en la fase 9 en front y back
          this.playerService.currentPlayer = this.playersAndHouses[i].player;

          //Igualamos la casa del servicio a la casa del componente
          this.houseService.currentHouse = this.playersAndHouses[i].house;

            // console.log("Old active char: " + JSON.stringify(this.characterService.currentActiveChar));
            
        }
      }

      this.adicionalService.getHouseAndCharacters(this.houseService.currentHouse.house_id,this.yearService.currentYear.year_id)
      .subscribe((data:any)=>{
        
        // console.log(data);

        this.houseService.currentHouse = data.casa[0];

        this.characterService.currentHouseCharsWinterPhase = data.personajes;

        // console.log("getHouseAndCharacters - CURRENT HOUSE: " + JSON.stringify(this.houseService.currentHouse));
        // console.log("getHouseAndCharacters - CURRENT HOUSE CHARS (Winter Phase): " + JSON.stringify(this.characterService.currentHouseCharsWinterPhase));
        
        // console.log("data.personajes: "  + JSON.stringify(data.personajes));

        for (let i = 0; i < data.personajes.length; i++) {

          if(data.personajes[i].character_id == this.houseService.currentHouse.activeChar){//el [0] es porque currentHouse devuelve un array.

            this.characterService.currentActiveChar = data.personajes[i];//Marcamos el personaje activo en el servicio.
            // console.log("getHouseAndCharacters, Personaje Activo: " + this.characterService.currentActiveChar);
            

          }
          
        }
        
        this.router.navigateByUrl("/phase1");
      })
      

      
      // this.checkPlayersReady()//hace la función de checkeo de nuevo

      
    }

    public checkPlayersReady(){


      for (let i = 0; i < this.playersAndHouses.length; i++) {

        if(this.playersAndHouses[i].player.winterPhaseDone==0){

          this.playersNotReady = true;
          // console.log(`Falta por completar la FI de al menos un jugador`);
          break;//no se lo contéis a Jose.

        }else{

          this.playersNotReady = false;
          // console.log(`Se puede avanzar de año`);

        }
        
      }

    }

    public nextYear(){


      for (let i = 0; i < this.playerService.playersOfCampaign.length; i++) {

        this.playerService.playersOfCampaign[i].winterPhaseDone = 0;


      }

          this.playerService.winterPhaseMainReset(this.playerService.playersOfCampaign).subscribe((data:any)=>{//CAMBIAR EN SERVICIO Y CONTROLLER BACK A ARRAY DE PLAYERS
    
            // console.log(data);

            this.getAll();
            

    
          })

    }

    public getAll(){
    
      this.playerService.playersOfCampaign = [];
      this.houseService.housesOfCamapaign = [];
      this.characterService.mainCharacters = []
  
      this.adicionalService.getCampaignInfo(this.campaignService.currentCampaign.campaign_id)
      .subscribe((data:any) => {
        // console.log("**************************************************\n" + JSON.stringify(data));
        for (let i = 0; i < data.length; i++){
  
          this.playerService.playersOfCampaign.push(new Player(data[i].player_id,data[i].house_id,this.campaignService.currentCampaign.campaign_id,data[i].player_name,data[i].winterPhaseDone))
  
          this.houseService.housesOfCamapaign.push(new House(data[i].house_name,data[i].activeChar,null,null,data[i].shield,null,data[i].house_id))
  
          this.characterService.mainCharacters.push(new Character(data[i].activeChar,data[i].house_id,data[i].year_id,data[i].char_name,null,null,null,null,null,null,null));
  
        }
  
        // console.log(JSON.stringify(this.playerService.playersOfCampaign));
        // console.log(JSON.stringify(this.houseService.housesOfCamapaign));
        // console.log(JSON.stringify(this.characterService.mainCharacters));

        this.router.navigateByUrl("/currentcampaign")

      })
        
      }

    public getAllText(){
      let id = null;
      this.textService.getAllTexts(id)
      .subscribe((data : Text[]) => {

        // console.log("ESTOS VAN A SER LOS TEXTOS" + JSON.stringify(data));
        this.textService.textos = data;
        // console.log("ESTOS VAN A SER LOS TEXTOS" + JSON.stringify(this.textService.textos));
      })
      
    }



}
