import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { ClassesService } from './shared/classes.service';
import { DropdownDirective } from './shared/dropdown.directive';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './shared/http.service';
import { PlannerComponent } from './planner/planner.component';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { AppRoutingModule } from './app-routing.module';
import { TableComponent } from './table/table.component';
import { ScheduleGenComponent } from './planner/schedule-gen/schedule-gen.component';
import { ScheduleComponent } from './planner/schedule-gen/schedule/schedule.component';

import { NgbPopoverModule, NgbPopoverConfig } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    DropdownDirective,
    PlannerComponent,
    TableComponent,
    ScheduleGenComponent,
    ScheduleComponent
  ],
  imports: [
    BrowserModule,
    MultiselectDropdownModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbPopoverModule
  ],
  providers: [ClassesService, HttpService, NgbPopoverModule, NgbPopoverConfig],
  bootstrap: [AppComponent]
})
export class AppModule {}
