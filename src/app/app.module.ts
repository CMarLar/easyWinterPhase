import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//FORMULARIOS TEMPLATE DRIVEN//
import { FormsModule } from '@angular/forms';

//PARA SERVICIOS://
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';
import { AddPlayersComponent } from './pages/add-players/add-players.component';
import { HousesManagementComponent } from './pages/houses-management/houses-management.component';
import { CreateHouseComponent } from './pages/create-house/create-house.component';
import { AddNpcToHouseComponent } from './pages/add-npc-to-house/add-npc-to-house.component';
import { CurrentCampaignComponent } from './pages/current-campaign/current-campaign.component';
import { WinterPhaseMainComponent } from './pages/winter-phase-main/winter-phase-main.component';
import { WinterPhase1Component } from './pages/winter-phase1/winter-phase1.component';
import { WinterPhase2Component } from './pages/winter-phase2/winter-phase2.component';
import { WinterPhase3Component } from './pages/winter-phase3/winter-phase3.component';
import { WinterPhase4Component } from './pages/winter-phase4/winter-phase4.component';
import { WinterPhase5Component } from './pages/winter-phase5/winter-phase5.component';
import { WinterPhase6aComponent } from './pages/winter-phase6a/winter-phase6a.component';
import { WinterPhase6bComponent } from './pages/winter-phase6b/winter-phase6b.component';
import { WinterPhase7Component } from './pages/winter-phase7/winter-phase7.component';
import { WinterPhase8Component } from './pages/winter-phase8/winter-phase8.component';
import { WinterPhase9Component } from './pages/winter-phase9/winter-phase9.component';
import { HeaderComponent } from './component/header/header.component';
import { NewPlayerNameModalComponent } from './component/new-player-name-modal/new-player-name-modal.component';
import { ChangeCharacterModalComponent } from './component/change-character-modal/change-character-modal.component';
import { HouseInfoModalComponent } from './component/house-info-modal/house-info-modal.component';
import { AgingModalComponent } from './component/aging-modal/aging-modal.component';
import { MarriageLoyaltyModalComponent } from './component/marriage-loyalty-modal/marriage-loyalty-modal.component';
import { MarriageCourtesyModalComponent } from './component/marriage-courtesy-modal/marriage-courtesy-modal.component';
import { BirthsModalComponent } from './component/births-modal/births-modal.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ModifyProfileComponent } from './pages/modify-profile/modify-profile.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { CampaignNameModalComponent } from './component/campaign-name-modal/campaign-name-modal.component';
import { CampaingConfirmdeleteComponent } from './component/campaing-confirmdelete/campaing-confirmdelete.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CampaignsComponent,
    AddPlayersComponent,
    HousesManagementComponent,
    CreateHouseComponent,
    AddNpcToHouseComponent,
    CurrentCampaignComponent,
    WinterPhaseMainComponent,
    WinterPhase1Component,
    WinterPhase2Component,
    WinterPhase3Component,
    WinterPhase4Component,
    WinterPhase5Component,
    WinterPhase6aComponent,
    WinterPhase6bComponent,
    WinterPhase7Component,
    WinterPhase8Component,
    WinterPhase9Component,
    HeaderComponent,
    NewPlayerNameModalComponent,
    ChangeCharacterModalComponent,
    HouseInfoModalComponent,
    AgingModalComponent,
    MarriageLoyaltyModalComponent,
    MarriageCourtesyModalComponent,
    BirthsModalComponent,
    ProfileComponent,
    ModifyProfileComponent,
    AboutUsComponent,
    CampaignNameModalComponent,
    CampaingConfirmdeleteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //FORMULARIOS TEMPLATE DRIVEN:
    FormsModule,

    //HttpClientModule para servicios

    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
