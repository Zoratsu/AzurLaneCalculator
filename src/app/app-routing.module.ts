import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EquipmentHomeComponent } from '@app/components/equipment/equipment-home/equipment-home.component';
import { ShipHomeComponent } from '@app/components/ship/ship-home/ship-home.component';

const routes: Routes = [
  { path: '', children: [] },
  { path: 'ship', component: ShipHomeComponent },
  { path: 'equipment', component: EquipmentHomeComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
