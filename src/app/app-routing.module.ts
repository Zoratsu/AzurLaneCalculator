import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangelogComponent } from '@app/components/changelog/changelog.component';
import { EquipmentHomeComponent } from '@app/components/equipment/equipment-home/equipment-home.component';
import { GuideComponent } from '@app/components/guide/guide.component';
import { ShipHomeComponent } from '@app/components/ship/ship-home/ship-home.component';

const routes: Routes = [
  { path: '', component: GuideComponent },
  { path: 'ship', component: ShipHomeComponent },
  { path: 'equipment', component: EquipmentHomeComponent },
  { path: 'changelog', component: ChangelogComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
