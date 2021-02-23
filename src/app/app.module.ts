import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from '@app/components/generic/nav-bar/nav-bar.component';
import { ShipCalculationComponent } from '@app/components/ship/ship-calculation/ship-calculation.component';
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

@NgModule({
  declarations: [
    AppComponent,
    GunItemComponent,
    GunCalculationComponent,
    GunSelectComponent,
    ShipItemComponent,
    ShipCalculationComponent,
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
    MatDividerModule,
    MatToolbarModule,
    MatMenuModule,
    NgxMatSelectSearchModule,
    StoreRouterConnectingModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
