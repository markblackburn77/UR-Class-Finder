import {
  Component,
  OnInit,
  OnDestroy,
  ViewEncapsulation,
  ViewChild
} from "@angular/core";
import { ClassesService } from "./classes.service";
import { Class } from "../shared/class.model";
import {
  IMultiSelectOption,
  IMultiSelectTexts,
  IMultiSelectSettings
} from "angular-2-dropdown-multiselect";
import { HttpService } from "./http.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  classes: Class[];

  /* Settings for the multi select dropdown menu */
  // Default selection
  optionsModel: number[] = [];

  // Settings configuration
  mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: "fontawesome",
    buttonClasses: "btn btn-outline-dark",
    dynamicTitleMaxItems: 0,
    displayAllSelectedText: false,
    showCheckAll: true,
    showUncheckAll: true,
    maxHeight: "200px"
  };

  // Text configuration
  myTexts: IMultiSelectTexts = {
    checkAll: "Select all",
    uncheckAll: "Unselect all",
    checked: "selected",
    checkedPlural: "selected",
    searchPlaceholder: "Search",
    searchEmptyResult: "Nothing found...",
    searchNoRenderText: "Type in search box to see results...",
    defaultTitle: "Department",
    allSelected: "All selected"
  };

  // Labels / Parents
  myOptions: IMultiSelectOption[] = [
    { id: 1, name: "CMSC" },
    { id: 2, name: "Biology" },
    { id: 3, name: "Chemistry" },
    { id: 4, name: "Art" },
    { id: 5, name: "Mathematics" },
    { id: 6, name: "LAIS" }
  ];

  // Setup template driven form
  @ViewChild("f") searchForm: NgForm;
  // Initial form values
  className: "";
  crn: "";
  professor: "";
  department: "";
  submitted = false;

  constructor(
    private classesService: ClassesService,
    private httpService: HttpService
  ) {}

  ngOnInit() {
    this.classes = this.classesService.getClasses();
  }

  getClassesData(formData) {
    this.httpService.sendData(formData).subscribe(
      response => {
        for (var c in response) {
          this.classesService.clearClasses();
          this.classesService.addClass(
            new Class(
              response[c]["class_name"],
              response[c]["crn"],
              response[c]["professor"],
              response[c]["start_time"],
              response[c]["end_time"],
              response[c]["location"],
              response[c]["department"]
            )
          );
        }
      },
      error => console.log(error),
      () => (this.classes = this.classesService.getClasses())
    );
  }

  addToCart(i: number) {
    this.classesService.addToCart(i);
  }

  removeFromCart(i: number) {
    this.classesService.removeFromCart(i);
  }

  onChange() {
    console.log(this.optionsModel);
  }

  onSubmit() {
    // Assign variables from form
    this.submitted = true;
    this.className = this.searchForm.value.className;
    this.crn = this.searchForm.value.crn;
    this.professor = this.searchForm.value.professor;
    this.department = this.searchForm.value.department;

    // Format the data a little
    let formatted_data = {
      class_name: this.className,
      crn: this.crn,
      professor: this.professor,
      department: this.department
    };

    // Send request to server
    this.getClassesData(formatted_data);
  }
}
