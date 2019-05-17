import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { SearchComponent } from "./search.component";
import { ClassesService } from "../shared/classes.service";
import { HttpService } from "./http.service";
import { FormsModule } from "@angular/forms";
import { MultiselectDropdownModule } from "angular-2-dropdown-multiselect";
import { TableComponent } from "../table/table.component";
import { Http } from "@angular/http";

describe("SearchComponent", () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent, TableComponent],
      imports: [FormsModule, MultiselectDropdownModule],
      providers: [
        { provide: ClassesService, useClass: ClassesService },
        { provide: HttpService, useClass: HttpService },
        { provide: Http }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
