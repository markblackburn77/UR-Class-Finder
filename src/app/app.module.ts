import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { SearchComponent } from "./search/search.component";
import { ClassesService } from "./search/classes.service";
import { ClassesService } from "./shared/classes.service";
import { DropdownDirective } from "./shared/dropdown.directive";
import { HttpModule, JsonpModule } from "@angular/http";
import { HttpService } from "./search/http.service";
import { HeaderComponent } from './header/header.component';
import { PlannerComponent } from "./planner/planner.component";

import { AppRoutingModule } from "./app-routing.module";
import { TableComponent } from "./table/table.component";

@NgModule({
  declarations: [AppComponent, SearchComponent, DropdownDirective, HeaderComponent],
  imports: [
    BrowserModule,
    MultiselectDropdownModule,
    FormsModule,
    HttpModule,
    JsonpModule
    AppRoutingModule
  ],
  providers: [ClassesService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {}
