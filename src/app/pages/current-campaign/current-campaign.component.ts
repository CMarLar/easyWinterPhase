import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-current-campaign',
  templateUrl: './current-campaign.component.html',
  styleUrls: ['./current-campaign.component.css']
})
export class CurrentCampaignComponent {

  public campaignName:string;

  //Años de la campaña
  public years:any = [];

  //Año actual de la campaña (el que se muestra)
  public actualYear:any

  //Añade un año más u otro año más.
  public yearSelectors:number;

  //Modales
  public isChangeCharacterHide : boolean;
  public isnewPlayerNameHide : boolean;
  public isHouseInfoHide : boolean;



    constructor(public router:Router){
      this.campaignName="Campaña cojonuda"      
      
      this.isChangeCharacterHide = true;
      this.isnewPlayerNameHide = true;
      this.isHouseInfoHide = true;

      this.years = 
      [

        
        //Esto sería más o menos un año tipo. Los años que se van sucediendo en la se añaden al array years cuando todos los jugadores completan la fase de invierno.
        {yearid:1,
        yearNumber:485,
        isFirstYear:true,
        isLastYear:false,
        notes:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        players:
          [
          {id:1, name:"Carlos",activeChar:"Sir Gawain",house:"Salisbury"},
          {id:2, name: "Irene", activeChar:"Sir Edward of Cambridge",house:"Cambridge"},
          {id:3, name: "Miguel", activeChar:"Sir Manfred",house:"Newton"},
          {id:null, name: null, activeChar:null,house:null,notes:null},
          {id:null, name: null, activeChar:null,house:null,notes:null},
          {id:null, name: null, activeChar:null,house:null,notes:null}
          ]
        },
        {yearid:2,
          yearNumber:486,
          isFirstYear:false,
          isLastYear:false,
          notes:"Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          players:
            [
            {id:1, name:"Carlos",activeChar:"Sir Gawain",house:"Salisbury"},
            {id:2, name: "Irene", activeChar:"Sir Edward of Cambridge",house:"Cambridge"},
            {id:3, name: "Miguel", activeChar:"Sir Manfred",house:"Newton"},
            {id:4, name: "María José", activeChar:"Lady Grey",house:"Grey"},
            {id:null, name: null, activeChar:null,house:null},
            {id:null, name: null, activeChar:null,house:null}
            ]
          },
          {yearid:3,
            yearNumber:487,
            isFirstYear:false,
            isLastYear:false,
            notes:"Mamasé, mamasá, mamá cusá",
            players:
              [
              {id:1, name:"Carlos",activeChar:"Sir Balin",house:"Salisbury"},
              {id:2, name: "Irene", activeChar:"Sir Edward of Cambridge",house:"Cambridge"},
              {id:3, name: "Miguel", activeChar:"Sir Manfred",house:"Newton"},
              {id:4, name: "María José", activeChar:"Lord Grey",house:"Grey"},
              {id:null, name: null, activeChar:null,house:null},
              {id:null, name: null, activeChar:null,house:null}
              ]
            },
            {yearid:4,
              yearNumber:488,
              isFirstYear:false,
              isLastYear:true,
              notes:"Mamasé, mamasá, mamá cusá",
              players:
                [
                {id:1, name:"Carlos",activeChar:"Sir Balin",house:"Salisbury"},
                {id:2, name: "Irene", activeChar:"Sir Edward of Cambridge",house:"Cambridge"},
                {id:3, name: "Miguel", activeChar:"Sir Manfred",house:"Newton"},
                {id:4, name: "María José", activeChar:"Lord Grey",house:"Grey"},
                {id:null, name: null, activeChar:null,house:null},
                {id:null, name: null, activeChar:null,house:null}
                ]
              },


      ]//Fin del array years
      
      this.actualYear=this.years[this.years.length-1]

      console.log(this.actualYear);
      




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

}
