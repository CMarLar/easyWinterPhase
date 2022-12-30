import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Year } from 'src/app/models/year';
import { YearService } from 'src/app/shared/year.service';
import { PlayerService } from 'src/app/shared/player.service';
import { Player } from 'src/app/models/player';
import { CampaignService } from 'src/app/shared/campaign.service';
import { House } from 'src/app/models/house';
import { HouseService } from 'src/app/shared/house.service';

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

  //casas
  public houses : House[];



    constructor(public router:Router, public yearService : YearService, public playerService : PlayerService,public campaignService : CampaignService,public houseService : HouseService){
      this.campaignName="Campaña cojonuda"      
      
      this.isChangeCharacterHide = true;
      this.isnewPlayerNameHide = true;
      this.isHouseInfoHide = true;

      this.currentPlayers = playerService.playersOfCampaign;

      this.years = yearService.yearsOfCampaign;
      
      this.actualYear = this.years[this.years.length-1]

      console.log(this.actualYear);
      console.log("PLAYERS : " + JSON.stringify(this.playerService.playersOfCampaign));
      console.log("PLAYERS 2 : " + JSON.stringify(this.playerService.playersOfCampaign[2]));
      this.houses = [];
      this.ordenarArrayCasas();

    //Fin del constructor
    }


    public previousYear(){
      let yearIs = this.actualYear.yearNumber -1;
      let found = this.years.find( element => element.yearNumber == yearIs);
      this.actualYear = found;

      // console.log(this.actualYear.yearNumber);
      console.log(this.years.indexOf(this.actualYear));
      console.log(this.years.indexOf(this.actualYear) !=0 || this.years.indexOf(this.actualYear) != this.years.length-1);
      
      
      

      if(found = null){
        console.log("No hay más años antes de este.");
        
      } 
    }

    public nextYear(){
      let yearIs = this.actualYear.yearNumber +1;
      let found = this.years.find( element => element.yearNumber == yearIs);
      this.actualYear = found;

      console.log(this.actualYear.yearNumber);
      console.log(this.years.indexOf(this.actualYear) == this.years.length-1);



      if(found = null){
        console.log("No hay más años después de este.");
        
      }
    }


    public goNext(){
      this.router.navigateByUrl("/winterphasemain")
    }

    public goNewPlayer(){
      this.router.navigateByUrl("/addplayers")
    }

    public goCreateHouse(){
      this.router.navigateByUrl("/createhouse")
    }

    public showModalPlayer(){

      if(this.isnewPlayerNameHide == true){
        this.isnewPlayerNameHide = false;
      }else{
        this.isnewPlayerNameHide = true
      }

      

    }

    public showModalHouse(){

      if(this.isHouseInfoHide == true){
        this.isHouseInfoHide = false;
      }else{
        this.isHouseInfoHide = true
      }
      
      
    }

    public showModalCharacter(){

      if(this.isChangeCharacterHide == true){
        this.isChangeCharacterHide = false;
      }else{
        this.isChangeCharacterHide = true
      }
      
    }

    public ordenarArrayCasas(){
      this.houses
      for (let i = 0; i < this.currentPlayers.length; i++){

        if (this.currentPlayers[i].house_id == this.houseService.housesOfCamapaign[0].house_id){
          this.houses.push(this.houseService.housesOfCamapaign[0])
        }else if(this.currentPlayers[i].house_id == this.houseService.housesOfCamapaign[1].house_id){
          this.houses.push(this.houseService.housesOfCamapaign[1])
        }else if(this.currentPlayers[i].house_id == this.houseService.housesOfCamapaign[2].house_id){
          this.houses.push(this.houseService.housesOfCamapaign[2])
        }else if(this.currentPlayers[i].house_id == this.houseService.housesOfCamapaign[3].house_id){
          this.houses.push(this.houseService.housesOfCamapaign[3])
        }else if(this.currentPlayers[i].house_id == this.houseService.housesOfCamapaign[4].house_id){
          this.houses.push(this.houseService.housesOfCamapaign[4])
        }else if(this.currentPlayers[i].house_id == this.houseService.housesOfCamapaign[5].house_id){
          this.houses.push(this.houseService.housesOfCamapaign[5])
        }
      }
    }

}
