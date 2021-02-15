import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GunListComponent } from './components/gun-list/gun-list.component';
import { GunComponent } from './components/gun/gun.component';
import { GunCalculationComponent } from './components/gun-calculation/gun-calculation.component';
import { ShipComponent } from './components/ship/ship.component';
import { ShipCalculationComponent } from '@app/components/ship-calculation/ship-calculation.component';
import { effects, reducers } from './store';

@NgModule({
  declarations: [
    AppComponent,
    GunComponent,
    GunCalculationComponent,
    GunListComponent,
    ShipComponent,
    ShipCalculationComponent,
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
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
