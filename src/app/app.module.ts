import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { SearchComponent } from "./search/search.component";
import { ClassesService } from "./search/classes.service";
import { DropdownDirective } from "./shared/dropdown.directive";

@NgModule({
  declarations: [AppComponent, SearchComponent, DropdownDirective],
  imports: [BrowserModule, MultiselectDropdownModule, FormsModule],
  providers: [ClassesService],
  bootstrap: [AppComponent]
})
export class AppModule {}
