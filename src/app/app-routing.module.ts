import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';
import { AddPlayersComponent } from './pages/add-players/add-players.component';
import { HousesManagementComponent } from './pages/houses-management/houses-management.component';
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
import { CreateHouseComponent } from './pages/create-house/create-house.component';

const routes: Routes = [
{path:"",redirectTo:"/home",pathMatch:"full"},
{path:"home",component:HomeComponent},
{path:"login",component:LoginComponent},
{path:"register",component:RegisterComponent},
{path:"campaigns",component:CampaignsComponent},
{path:"addplayers",component:AddPlayersComponent},
{path:"housesmanagement",component:HousesManagementComponent},
{path:"createhouse",component:CreateHouseComponent},
{path:"addnpc",component:AddNpcToHouseComponent},
{path:"currentcampaign",component:CurrentCampaignComponent},
{path:"winterphasemain",component:WinterPhaseMainComponent},
{path:"phase1",component:WinterPhase1Component},
{path:"phase2",component:WinterPhase2Component},
{path:"phase3",component:WinterPhase3Component},
{path:"phase4",component:WinterPhase4Component},
{path:"phase5",component:WinterPhase5Component},
{path:"phase6a",component:WinterPhase6aComponent},
{path:"phase6b",component:WinterPhase6bComponent},
{path:"phase7",component:WinterPhase7Component},
{path:"phase8",component:WinterPhase8Component},
{path:"phase9",component:WinterPhase9Component},
{path:"header",component:HeaderComponent},
{path:"changeplayer",component:NewPlayerNameModalComponent},
{path:"changecharacter",component:ChangeCharacterModalComponent},
{path:"houseinfomodal ",component:HouseInfoModalComponent},
{path:"agingmodal",component:AgingModalComponent},
{path:"marriageloyalty",component:MarriageLoyaltyModalComponent},
{path:"marriagecourtesy",component:MarriageCourtesyModalComponent},
{path:"births",component:BirthsModalComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
