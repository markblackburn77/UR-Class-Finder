import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { SearchComponent } from "./search/search.component";
import { ClassesService } from "./search/classes.service";
import { DropdownDirective } from "./shared/dropdown.directive";
import { HttpModule, JsonpModule } from "@angular/http";
import { HttpService } from "./search/http.service";

@NgModule({
  declarations: [AppComponent, SearchComponent, DropdownDirective],
  imports: [
    BrowserModule,
    MultiselectDropdownModule,
    FormsModule,
    HttpModule,
    JsonpModule
  ],
  providers: [ClassesService, HttpService],
  bootstrap: [AppComponent]
})
export class AppModule {}
