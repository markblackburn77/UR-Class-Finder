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
    { id: "CMSC", name: "CMSC" },
    { id: "BIO", name: "Biology" },
    { id: "CHEM", name: "Chemistry" },
    { id: "ART", name: "Art" },
    { id: "MATH", name: "Mathematics" },
    { id: "LAIS", name: "LAIS" }
  ];

  // Setup template driven form
  @ViewChild("f") searchForm: NgForm;
  // Initial form values
  className: "";
  crn: "";
  professor: "";
  department: "";

  constructor(
    private classesService: ClassesService, // Inject Classes Service
    private httpService: HttpService // Inject HTTP Service
  ) {}

  ngOnInit() {
    // Set classes to classes stored in classes service
    this.classes = this.classesService.getClasses();
  }

  getClassesData(formData) {
    this.httpService.sendData(formData).subscribe(
      // Add classes in classes service if successful
      response => {
        this.classesService.clearClasses();
        this.classesService.addClassesFromResponse(response);
      },
      // Log error if error
      error => console.log(error),
      // If request completed, render classes and clear all from previous search
      () => {
        this.classes = this.classesService.getClasses();
      }
    );
  }

  addToCart(i: number) {
    this.classesService.addToCart(i);
  }

  removeFromCart(i: number) {
    this.classesService.removeFromCart(i);
  }

  onSubmit() {
    // Assign variables from form
    this.className = this.searchForm.value.className;
    this.crn = this.searchForm.value.crn;
    this.professor = this.searchForm.value.professor;

    // Format the data a little
    let formatted_data = {
      class_name: this.className,
      crn: this.crn,
      professor: this.professor,
      department: this.optionsModel
    };

    // Send request to server
    this.getClassesData(formatted_data);
  }

  onChange() {
    console.log(this.optionsModel);
  }
}
