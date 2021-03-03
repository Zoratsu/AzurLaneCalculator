import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from '@app/components/generic/nav-bar/nav-bar.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GunCalculationComponent } from './components/equipment/gun/gun-calculation/gun-calculation.component';
import { GunSelectComponent } from './components/equipment/gun/gun-select/gun-select.component';
import { GunItemComponent } from './components/equipment/gun/gun-item/gun-item.component';
import { HomeComponent } from './components/home/home.component';
import { HullNavBarComponent } from './components/navigation/hull-nav-bar/hull-nav-bar.component';
import { ShipItemComponent } from './components/ship/ship-item/ship-item.component';
import { effects, reducers } from './store';
import { ShipSelectComponent } from './components/ship/ship-select/ship-select.component';
import { ShipHomeComponent } from './components/ship/ship-home/ship-home.component';
import { EquipmentHomeComponent } from './components/equipment/equipment-home/equipment-home.component';
import { EquipmentNavBarComponent } from './components/navigation/equipment-nav-bar/equipment-nav-bar.component';
import { GunHomeComponent } from './components/equipment/gun/gun-home/gun-home.component';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { LoadEquipmentImagePipe } from './pipes/load-equipment-image.pipe';
import { LoadShipImagePipe } from './pipes/load-ship-image.pipe';
import { GuideComponent } from './components/guide/guide.component';
import { ShipNavBarComponent } from './components/navigation/ship-nav-bar/ship-nav-bar.component';
import { ShipSlotGunComponent } from './components/ship/ship-slot/ship-slot-gun/ship-slot-gun.component';
import { ShipSlotHomeComponent } from './components/ship/ship-slot/ship-slot-home/ship-slot-home.component';
import { ShipSlotSelectComponent } from './components/ship/ship-slot/ship-slot-select/ship-slot-select.component';
import { ShipCalculationHomeComponent } from './components/ship/ship-calculation/ship-calculation-home/ship-calculation-home.component';
import { ShipCalculationSlotComponent } from './components/ship/ship-calculation/ship-calculation-slot/ship-calculation-slot.component';
import { TorpedoHomeComponent } from './components/equipment/torpedo/torpedo-home/torpedo-home.component';
import { TorpedoItemComponent } from './components/equipment/torpedo/torpedo-item/torpedo-item.component';
import { TorpedoSelectComponent } from './components/equipment/torpedo/torpedo-select/torpedo-select.component';
import { TorpedoCalculationComponent } from './components/equipment/torpedo/torpedo-calculation/torpedo-calculation.component';
import { ShipSlotTorpedoComponent } from './components/ship/ship-slot/ship-slot-torpedo/ship-slot-torpedo.component';
import { AntiAirHomeComponent } from './components/equipment/antiAir/anti-air-home/anti-air-home.component';
import { AntiAirCalculationComponent } from './components/equipment/antiAir/anti-air-calculation/anti-air-calculation.component';
import { AntiAirItemComponent } from './components/equipment/antiAir/anti-air-item/anti-air-item.component';
import { AntiAirSelectComponent } from './components/equipment/antiAir/anti-air-select/anti-air-select.component';
import { ShipSlotAntiAirComponent } from './components/ship/ship-slot/ship-slot-anti-air/ship-slot-anti-air.component';
import { ShipSlotItemComponent } from './components/ship/ship-slot/ship-slot-item/ship-slot-item.component';
import { ShipCalculationAdvancedHomeComponent } from './components/ship/ship-calculation/ship-calculation-advanced/ship-calculation-advanced-home/ship-calculation-advanced-home.component';
import { ShipCalculationAdvancedAntiAirComponent } from './components/ship/ship-calculation/ship-calculation-advanced/ship-calculation-advanced-anti-air/ship-calculation-advanced-anti-air.component';
import { PlaneHomeComponent } from './components/equipment/plane/plane-home/plane-home.component';
import { PlaneSelectComponent } from './components/equipment/plane/plane-select/plane-select.component';
import { PlaneItemComponent } from './components/equipment/plane/plane-item/plane-item.component';
import { PlaneCalculationComponent } from './components/equipment/plane/plane-calculation/plane-calculation.component';
import { ShipSlotPlaneComponent } from './components/ship/ship-slot/ship-slot-plane/ship-slot-plane.component';
import { ShipCalculationAdvancedPlaneComponent } from './components/ship/ship-calculation/ship-calculation-advanced/ship-calculation-advanced-plane/ship-calculation-advanced-plane.component';

@NgModule({
  declarations: [
    AppComponent,
    GunItemComponent,
    GunCalculationComponent,
    GunSelectComponent,
    ShipItemComponent,
    HomeComponent,
    HullNavBarComponent,
    ShipSelectComponent,
    NavBarComponent,
    ShipHomeComponent,
    EquipmentHomeComponent,
    EquipmentNavBarComponent,
    GunHomeComponent,
    LoadEquipmentImagePipe,
    LoadShipImagePipe,
    GuideComponent,
    ShipNavBarComponent,
    ShipSlotGunComponent,
    ShipSlotHomeComponent,
    ShipSlotSelectComponent,
    ShipCalculationHomeComponent,
    ShipCalculationSlotComponent,
    TorpedoHomeComponent,
    TorpedoItemComponent,
    TorpedoSelectComponent,
    TorpedoCalculationComponent,
    ShipSlotTorpedoComponent,
    AntiAirHomeComponent,
    AntiAirCalculationComponent,
    AntiAirItemComponent,
    AntiAirSelectComponent,
    ShipSlotAntiAirComponent,
    ShipSlotItemComponent,
    ShipCalculationAdvancedHomeComponent,
    ShipCalculationAdvancedAntiAirComponent,
    PlaneHomeComponent,
    PlaneSelectComponent,
    PlaneItemComponent,
    PlaneCalculationComponent,
    ShipSlotPlaneComponent,
    ShipCalculationAdvancedPlaneComponent,
  ],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatTableModule,
    StoreModule.forRoot({ ...reducers }, {}),
    EffectsModule.forRoot([...effects]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    MatSelectModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    NgxMatSelectSearchModule,
    StoreRouterConnectingModule.forRoot(),
    MatSnackBarModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
