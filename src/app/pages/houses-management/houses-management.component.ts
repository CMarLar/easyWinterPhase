import { Component } from '@angular/core';

@Component({
  selector: 'app-houses-management',
  templateUrl: './houses-management.component.html',
  styleUrls: ['./houses-management.component.css']
})
export class HousesManagementComponent {

  public profilePic:string;
  public campaignName:string;
  public shieldImage:string;
  public emptyShield:string;
  public playerName:string;
  public houseName:string;
  public asignedHouse:boolean;

  constructor(){
    this.profilePic="../../../assets/img/carlos-marina_9131-bw.jpg"
    this.campaignName="Campaña de Carlos"
    this.shieldImage="../../../assets/img/escudo1.png"
    this.emptyShield="../../../assets/img/emptyshield.png"
    this.playerName="Carlos M"
    this.houseName="Salisbury"
    this.asignedHouse=true
  }

}
