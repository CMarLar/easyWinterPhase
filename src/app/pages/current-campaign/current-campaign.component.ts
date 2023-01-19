import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Year } from 'src/app/models/year';
import { YearService } from 'src/app/shared/year.service';
import { PlayerService } from 'src/app/shared/player.service';
import { Player } from 'src/app/models/player';
import { CampaignService } from 'src/app/shared/campaign.service';
import { House } from 'src/app/models/house';
import { HouseService } from 'src/app/shared/house.service';
import { CharacterService } from 'src/app/shared/character.service';
import { Character } from 'src/app/models/character';
import { AdicionalService } from 'src/app/shared/adicional.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-current-campaign',
  templateUrl: './current-campaign.component.html',
  styleUrls: ['./current-campaign.component.css']
})
export class CurrentCampaignComponent {

  public campaignName :string;

  //Años de la campaña
  public years : Year[];

  //Año actual de la campaña (el que se muestra)
  public actualYear : Year;

  //Añade un año más u otro año más.
  public yearSelectors:number;

  //Modales
  public isChangeCharacterHide : boolean;
  public isnewPlayerNameHide : boolean;
  public isHouseInfoHide : boolean;

  //players
  public currentPlayers : Player[];
  public currentPlayer : Player;

  //casas
  public houses : House[];
  public currentHouse : House;

  //pnj
  public characters : Character[];
  public currentCharacter : Character;



    constructor(public router:Router, public yearService : YearService, public playerService : PlayerService,public campaignService : CampaignService,public houseService : HouseService, public characterService : CharacterService,public adicionalService : AdicionalService,public userService : UserService){    
      
      if(this.userService.logueado==false){
        this.router.navigateByUrl("/login");
      }
      // console.log("ESTAS SON LAS NOTAS AL CARGAR CURRENTCAMPAIGN: " + this.yearService.currentYear.notes);
      // console.log("houseService.housesOfCampaign: " + JSON.stringify(this.houseService.housesOfCamapaign));

      this.characters = [];

      //ocultar modales
      this.isChangeCharacterHide = true;
      this.isnewPlayerNameHide = true;
      this.isHouseInfoHide = true;

      this.currentPlayers = playerService.playersOfCampaign;

      // console.log("PLAYERSERVICE.playersOfCampaign: " + JSON.stringify(this.playerService.playersOfCampaign));

      this.years = yearService.yearsOfCampaign;
      
      this.actualYear = this.years[this.years.length-1]

      // console.log(this.actualYear);
      this.houses = [];
      // this.ordenarArrayCasas();

      // console.log("houseService.housesOfCampaign: " + JSON.stringify(this.houseService.housesOfCamapaign));

      // console.log("All chararcterss of campaign: " + JSON.stringify(this.characterService.allCharactersOfCampaign));

    //Fin del constructor
    }


    public previousYear(){

      this.yearService.getYearByNumber(this.campaignService.currentCampaign.campaign_id,this.yearService.currentYear.yearNumber - 1)
      .subscribe((data : Year) => {
        this.yearService.currentYear = new Year(data[0].year_id,data[0].yearNumber,data[0].isFirstYear,data[0].isLastYear,data[0].notes,data[0].campaign_id)
      })

    }

    public nextYear(){
      //OBTENEMOS DE LA BBDD EL AÑO ANTERIOR Y SE PONE COMO CURRENT YEAR
      this.yearService.getYearByNumber(this.campaignService.currentCampaign.campaign_id,this.yearService.currentYear.yearNumber + 1)
      .subscribe((data : Year) => {
        this.yearService.currentYear = new Year(data[0].year_id,data[0].yearNumber,data[0].isFirstYear,data[0].isLastYear,data[0].notes,data[0].campaign_id)
      })

    }

    public goNext(notas : string){
      
      this.yearService.currentYear.notes = notas;
      
      
      this.adicionalService.crearAñoPersonajes(this.yearService.currentYear,this.characterService.mainCharacters)
      .subscribe((data : any) => {
        // console.log("DATA CURRENT: " + JSON.stringify(data));
        this.yearService.currentYear.year_id = data.insertId;
        this.yearService.currentYear.yearNumber = this.yearService.currentYear.yearNumber +1;
        this.yearService.currentYear.isFirstYear = 0;
        this.yearService.currentYear.notes = "";

        this.router.navigateByUrl("/winterphasemain");
        
      })
    }

    public goNewPlayer(notas : string){
      this.router.navigateByUrl("/addplayers");

      this.yearService.currentYear.notes = notas;
      this.yearService.putYear(this.yearService.currentYear)
      .subscribe((data : any) => {
        // console.log(data);
        
      })
    }

    public goCreateHouse(notas : string, pj : Player, house : House){
      this.houseService.backToCurrentCampaign = true;
      this.houseService.modifyLayout = true;
      
      this.playerService.currentPlayer = pj;
      this.houseService.currentHouse = house;
      this.yearService.currentYear.notes = notas;
      this.yearService.putYear(this.yearService.currentYear)
      .subscribe((data : any) => {
        // console.log(data);
        
      })
      this.characterService.getCharacters(house.house_id)
      .subscribe((data : Character[]) => {
        this.characterService.currentHouseChars = [];
        for (let i = 0; i < data.length; i++){
          this.characterService.currentHouseChars.push(data[i]);
        }
        this.router.navigateByUrl("/createhouse");
      })
      
    }


    //MODALES

    public showModalPlayer(jugador : Player = null){
      // console.log("-----------------------------------------------------------------------");
      // console.log(JSON.stringify(this.characterService.mainCharacters));
      
      // console.log("-----------------------------------------------------------------------");
      this.currentPlayer = jugador;
      this.playerService.currentPlayer = jugador;
      // console.log("JUGADOR ACTUAL: " + JSON.stringify(this.currentPlayer));
      
      if(this.isnewPlayerNameHide == true){
        this.isnewPlayerNameHide = false;
      }else{
        this.isnewPlayerNameHide = true
      }
      // console.log(this.isnewPlayerNameHide);
      
      

    }

    public changeName(name : string){

      // console.log(name);
      if(name != "" && name != null){

        this.playerService.currentPlayer.player_name = name;
        this.isnewPlayerNameHide = true
        this.playerService.putPlayer(this.playerService.currentPlayer)
        .subscribe((data : any) => {
          // console.log(JSON.stringify(data));
          
        })
      }
      
    }

    public showModalHouse(house_id : number){
      //TENGO QUE HACER UN SELECT EN LA BBDD QUE RECOJA LA CASA Y SUS JUGADORES NO SOLO LOS JUGADORES
      this.adicionalService.getHouseAndCharacters(house_id,this.yearService.currentYear.year_id)
      .subscribe((data : any) => {
        // console.log(JSON.stringify(data));
        
        this.currentHouse = data.casa[0];
        this.characters = data.personajes;
        
        this.isHouseInfoHide = false;
      })
      
      
    }

    public cerrarHouse(hide : boolean){
      this.isHouseInfoHide = hide;
    }

    public showModalCharacter(house : number = null,mainCharacter : Character){
      // console.log(JSON.stringify(this.yearService.currentYear));
      // console.log(JSON.stringify(house));
      // console.log(JSON.stringify(this.characterService.mainCharacters));
      this.characterService.currentActiveChar = mainCharacter;
      
      
      
      this.characterService.getCharactersByYear(house,this.yearService.currentYear.year_id)
      .subscribe((data : Character[]) => {
        // console.log(JSON.stringify(data));
        
        this.characters = data;
      })

      this.isChangeCharacterHide = false;
      
    }

    public changeCharacter(newPj : number){
      // console.log("TODOS LOS PNJ ALMACENADOS " + JSON.stringify(this.characters));
      if(newPj != null || newPj != undefined){

        //BUSCAMOS LA POSICION DEL PERSONAJE ACTUAL EN EL ARRAY MAINCHARACTERS
        let position : number;
        position = this.characterService.mainCharacters.findIndex(element => element.character_id = this.characterService.currentActiveChar.character_id);

        //TENIENDO SU POSICION TENEMOS QUE IGUALAR ESE OBJETO DE ESA POSICION AL NUEVO OBJETO CON EL ID RECIBIDO POR PARAMETRO
        for (let i = 0; i < this.characters.length; i++){

          if (this.characters[i].character_id == newPj){
            this.characterService.mainCharacters[position] = this.characters[i];

            this.houseService.updateHouse(new House(null,this.characters[i].character_id,null,null,null,null,this.characters[i].house_id))
            .subscribe((data : any) => {
              // console.log(JSON.stringify(data));
              
            })
          }
        }

      }
      
      this.isChangeCharacterHide = true;
    }

    // public changePJ(newPJ : string){

    //   // console.log("ACTUAL PJ: " + this.houseService.currentHouse.activeChar);
    //   // this.houseService.currentHouse.activeChar = newPJ;
    //   // console.log("NUEVO PJ: " + this.houseService.currentHouse.activeChar);
  
  
    // }

}
