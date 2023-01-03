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



    constructor(public router:Router, public yearService : YearService, public playerService : PlayerService,public campaignService : CampaignService,public houseService : HouseService, public characterService : CharacterService){    
      
      this.characters = [];
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
      

      
          //CREAMOS EL NUEVO AÑO
          let newYear = new Year(null,this.yearService.currentYear.yearNumber + 1,0,1,"",this.yearService.currentYear.campaign_id);

          this.yearService.postYear(newYear)
          .subscribe((data : any) => {
            
            newYear.year_id = data.insertId

            this.yearService.currentYear = newYear;
            this.actualYear = newYear;
            this.yearService.yearsOfCampaign.push(newYear);
            this.yearService.yearsOfCampaign[this.yearService.yearsOfCampaign.length - 2].isLastYear = 0;

            // console.log("ENSEÑAMOS LA POSICION -2 DEL ARRAY: " + JSON.stringify(this.yearService.yearsOfCampaign[this.yearService.yearsOfCampaign.length - 2]));
            // console.log("TODOS LOS PUTOS AÑOS: " + JSON.stringify(this.yearService.yearsOfCampaign));
            // console.log("AÑO ACTUAL: " + JSON.stringify(this.actualYear));
            // console.log("PENULTIMO AÑO: " + JSON.stringify(this.yearService.yearsOfCampaign[this.yearService.yearsOfCampaign.length - 2]));
            
            //MODIFICAMOS EL AÑO ANTERIOR PARA IGUALAR EL CAMPO ISLASTYEAR A 0
            this.yearService.putYear(this.yearService.yearsOfCampaign[this.yearService.yearsOfCampaign.length - 2])
            .subscribe((data : any) => {
              console.log(data);
              
              for (let i = 0; i < this.playerService.playersOfCampaign.length; i++){

                //OBTENEMOS TODOS LOS PNJ DE TODOS LOS JUGADORES Y LOS METEMOS EN UN ARRAY
                // console.log("ESTOS SON LOS ID DE LA CASA DE CADA JUGADOR: " + this.playerService.playersOfCampaign[i].house_id);
                
                this.characterService.getCharacters(this.playerService.playersOfCampaign[i].house_id)
                .subscribe((data : Character[]) => {
                  
                  // console.log("ESTOS SON LOS PNJ: " + JSON.stringify(data));
        
                  //INICIALIZAMOS A 0 EL ARRAY DE PNJ
                  this.characters = [];

                  for (let j = 0; j < data.length; j++){
                    this.characters.push(data[j]);
                    this.characterService.allCharactersOfCampaign.push(data[j]);
                  }
        
                  // console.log("ESTOS SON LOS PNJ PUSHEADOS: " + this.characters);
                  //HACEMOS LA INSERCCION DE LOS NUEVOS PNJ CON EL AÑO CAMBIADO
            

                  //AQUI SE ENCUENTRA EL FALLO
                  // console.log("MOSTRANDO LOS PERSONAJES DEL FANTASTICO MUNDO DE GUMBALL: " + JSON.stringify(this.characters));

                  for (let l = 0; l < this.characters.length; l++){
                    this.characters[l].year_id = this.actualYear.year_id;
                  }
                  console.log(this.actualYear.year_id);
                  
                  this.characterService.postCharacters(this.characters)
                  .subscribe((data : any) => {
                    console.log(data);
                    
                  })
                  
                })
              }
              

            })
          })


      
      
      this.router.navigateByUrl("/winterphasemain");
    }

    public goNewPlayer(){
      this.router.navigateByUrl("/addplayers")
    }

    public goCreateHouse(){
      this.router.navigateByUrl("/createhouse")
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


    //MODALES

    public showModalPlayer(jugador : Player){

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

    public showModalCharacter(){

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

}
