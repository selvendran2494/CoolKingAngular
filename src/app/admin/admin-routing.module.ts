import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddcenterComponent } from './addcenter/addcenter.component';
import { CenterprofileComponent } from './centerprofile/centerprofile.component';


const routes: Routes = [
  { path: 'addServiceCenter', component: AddcenterComponent },
  { path: 'centerprofile', component: CenterprofileComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
