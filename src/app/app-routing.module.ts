// Imports for routing
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Imports for components
import { SearchComponent } from './search/search.component';
import { PlannerComponent } from './planner/planner.component';

const appRoutes: Routes = [
  { path: '', component: SearchComponent },
  { path: 'planner', component: PlannerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
