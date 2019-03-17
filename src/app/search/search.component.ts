import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { ClassesService } from "./classes.service";
import { Class } from "../shared/class.model";
import { HttpService } from "./http.service";
import { NgForm } from "@angular/forms";
import { DropdownSettings } from "./dropdown.settings";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  classes: Class[];

  /* Settings for the multi select dropdown menu */
  dropdownSelectedValues: number[] = [];
  dropdownOptions = DropdownSettings.myOptions;
  dropdownTextsSettings = DropdownSettings.myTexts;
  dropdownRegSettings = DropdownSettings.mySettings;

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
    console.log(this.searchForm);
    // Assign variables from form
    this.className = this.searchForm.value.className;
    this.crn = this.searchForm.value.crn;
    this.professor = this.searchForm.value.professor;

    // Format the data a little
    let formatted_data = {
      class_name: this.className,
      crn: this.crn,
      professor: this.professor,
      department: this.dropdownSelectedValues
    };

    // Send request to server
    this.getClassesData(formatted_data);
  }

  // onChange mostly for testing right now
  onChange() {
    console.log(this.dropdownSelectedValues);
  }

  onClickTestData() {}
}
