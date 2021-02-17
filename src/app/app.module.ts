import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShipCalculationComponent } from '@app/components/ship-calculation/ship-calculation.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GunCalculationComponent } from './components/gun-calculation/gun-calculation.component';
import { GunSelectComponent } from './components/gun-select/gun-select.component';
import { GunComponent } from './components/gun/gun.component';
import { HomeComponent } from './components/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { ShipComponent } from './components/ship/ship.component';
import { effects, reducers } from './store';
import { ShipSelectComponent } from './components/ship-select/ship-select.component';

@NgModule({
  declarations: [
    AppComponent,
    GunComponent,
    GunCalculationComponent,
    GunSelectComponent,
    ShipComponent,
    ShipCalculationComponent,
    HomeComponent,
    NavBarComponent,
    ShipSelectComponent,
  ],
  imports: [
    BrowserModule,
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
    MatDividerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
