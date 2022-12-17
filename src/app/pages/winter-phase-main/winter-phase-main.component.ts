import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-winter-phase-main',
  templateUrl: './winter-phase-main.component.html',
  styleUrls: ['./winter-phase-main.component.css']
})
export class WinterPhaseMainComponent {

  public campaignName:string;

  public actualYear:any;

  public playersNotReady:boolean;

    constructor(public router:Router){

      this.campaignName = "Campaña de Carlos"

      this.actualYear = 
      {
        yearid:4,
        yearNumber:488,
        isFirstYear:false,
        isLastYear:true,
        notes:"Mamasé, mamasá, mamá cusá",
        players:
          [
          {id:1, name:"Carlos",activeChar:"Sir Balin",house:"Salisbury",shield:"../../../assets/img/escudo1.png",winterPhaseDone:true},
          {id:2, name: "Irene", activeChar:"Sir Edward of Cambridge",house:"Cambridge",shield:"../../../assets/img/escudo2.png",winterPhaseDone:true},
          {id:3, name: "Miguel", activeChar:"Sir Manfred",house:"Newton",shield:"../../../assets/img/escudo3.png",winterPhaseDone:true},
          {id:4, name: "María José", activeChar:"Lord Grey",house:"Grey",shield:"../../../assets/img/escudo4.png",winterPhaseDone:true},
          {id:null, name: null, activeChar:null,house:null,shield:"../../../assets/img/escudo5.png",winterPhaseDone:false},
          {id:null, name: null, activeChar:null,house:null,shield:"../../../assets/img/escudo6.png",winterPhaseDone:false}
          ]
      }


      this.playersNotReady = true
      console.log(`Falta por completar la FI de al menos un jugador: ${this.playersNotReady}`);
      
      this.checkPlayersReady();

    }


    public doWinterPhase(){
      this.router.navigateByUrl("/phase1")
    }

    public checkPlayersReady(){
      for (let i = 0; i < this.actualYear.players.length; i++) {

        if(this.actualYear.players[i].winterPhaseDone==false && this.actualYear.players[i].id!=null){

          this.playersNotReady = true;
          console.log(`Falta por completar la FI de al menos un jugador: ${this.playersNotReady}`);
          break;//no se lo contéis a Jose.

        }else{

          this.playersNotReady = false;
          console.log(`Falta por completar la FI de al menos un jugador: ${this.playersNotReady}`);

        }
        
      }

    }

    public nextYear(){
      //Esta función tendrá que añadir un nuevo año al objeto campaña con yearId + 1, yearNumber +1, notes = "", isLastYear=true y los datos actualizados de todas las casas 

      this.router.navigateByUrl("/currentcampaign")


    }

}
