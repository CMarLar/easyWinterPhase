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

  //pnj
  public characters : Character[];



    constructor(public router:Router, public yearService : YearService, public playerService : PlayerService,public campaignService : CampaignService,public houseService : HouseService, public characterService : CharacterService,public adicionalService : AdicionalService){    
      
      
      console.log("houseService.housesOfCampaign: " + JSON.stringify(this.houseService.housesOfCamapaign));

      this.characters = [];

      //ocultar modales
      this.isChangeCharacterHide = true;
      this.isnewPlayerNameHide = true;
      this.isHouseInfoHide = true;

      this.currentPlayers = playerService.playersOfCampaign;

      console.log("PLAYERSERVICE.playersOfCampaign: " + JSON.stringify(this.playerService.playersOfCampaign));

      this.years = yearService.yearsOfCampaign;
      
      this.actualYear = this.years[this.years.length-1]

      console.log(this.actualYear);
      this.houses = [];
      // this.ordenarArrayCasas();

      console.log("houseService.housesOfCampaign: " + JSON.stringify(this.houseService.housesOfCamapaign));

      console.log("All chararcterss of campaign: " + JSON.stringify(this.characterService.allCharactersOfCampaign));

    //Fin del constructor
    }


    public previousYear(){

      this.yearService.getYearByNumber(this.campaignService.currentCampaign.campaign_id,this.yearService.currentYear.yearNumber - 1)
      .subscribe((data : Year) => {
        console.log("ESTE ES EL ULTIMO AÑO QUE QUIERO VER" + JSON.stringify(data));
        this.yearService.currentYear = new Year(data[0].year_id,data[0].yearNumber,data[0].isFirstYear.data[0],data[0].isLastYear.data[0],data[0].notes,data[0].campaign_id)
      })

    }

    public nextYear(){
      //OBTENEMOS DE LA BBDD EL AÑO ANTERIOR Y SE PONE COMO CURRENT YEAR
      this.yearService.getYearByNumber(this.campaignService.currentCampaign.campaign_id,this.yearService.currentYear.yearNumber + 1)
      .subscribe((data : Year) => {
        console.log("ESTE ES EL ULTIMO AÑO QUE QUIERO VER" + JSON.stringify(data));
        this.yearService.currentYear = new Year(data[0].year_id,data[0].yearNumber,data[0].isFirstYear.data[0],data[0].isLastYear.data[0],data[0].notes,data[0].campaign_id)
      })

    }

    public goNext(notas : string){
      
      this.yearService.currentYear.notes = notas;
      
      this.adicionalService.crearAñoPersonajes(this.yearService.currentYear)
      .subscribe((data : any) => {
        console.log("A PARTIR DE AQUI EMPIEZA LO TOCHO DE CURRENT CAMPAIGN");
        console.log("DATA CURRENT: " + JSON.stringify(data));
        
        
      })
    }

    public goNewPlayer(){
      this.router.navigateByUrl("/addplayers")
    }

    public goCreateHouse(){
      this.houseService.backToCurrentCampaign = true;
      this.houseService.modifyLayout = true;
      this.router.navigateByUrl("/createhouse")
    }


    //MODALES

    public showModalPlayer(jugador : Player = null){

      this.currentPlayer = jugador;
      console.log("JUGADOR ACTUAL: " + JSON.stringify(this.currentPlayer));
      
      if(this.isnewPlayerNameHide == true){
        this.isnewPlayerNameHide = false;
      }else{
        this.isnewPlayerNameHide = true
      }
      console.log(this.isnewPlayerNameHide);
      
      

    }

    public showModalHouse(){
      if(this.isHouseInfoHide == true){
        this.isHouseInfoHide = false;
      }else{
        this.isHouseInfoHide = true
      }
      
      
    }

    public showModalCharacter(house : House = null){
      //le pasamos el id de la casa
      this.houseService.currentHouse = house;
      console.log("ESTE ES EL LOG QUE QUIERO VER:  " + this.characterService.currentHouseChars);
      
      for (let i = 0; i < this.characterService.allCharactersOfCampaign.length; i++){

        if (this.characterService.allCharactersOfCampaign[i].house_id == house.house_id){

          this.characterService.currentHouseChars.push(this.characterService.allCharactersOfCampaign[i]);
        }
      }

      

      if(this.isChangeCharacterHide == true){
        this.isChangeCharacterHide = false;
      }else{
        this.isChangeCharacterHide = true;
      }
      
    }

    public changeName(nombre : string){

      for (let i = 0; i < this.playerService.playersOfCampaign.length;i++){

        if(this.playerService.playersOfCampaign[i] == this.currentPlayer){

          this.currentPlayer.player_name = nombre;
          this.playerService.playersOfCampaign[i].player_name = nombre;

        }
      }
      
      this.playerService.putPlayers(this.currentPlayer)
      .subscribe((data) => {

      })

      this.isnewPlayerNameHide = true;
    }

    // public changePJ(newPJ : string){

    //   // console.log("ACTUAL PJ: " + this.houseService.currentHouse.activeChar);
    //   // this.houseService.currentHouse.activeChar = newPJ;
    //   // console.log("NUEVO PJ: " + this.houseService.currentHouse.activeChar);
  
  
    // }

}
