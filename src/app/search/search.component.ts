import { Component, OnInit, ViewEncapsulation, ViewChild } from "@angular/core";
import { ClassesService } from "./classes.service";
import { Class } from "../shared/class.model";
import { HttpService } from "./http.service";
import { NgForm } from "@angular/forms";
import { DropdownSettings } from "./dropdown.settings";
import { MeetingTime } from "../shared/meeting-time.model";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent implements OnInit {
  /** Classes to be displayed in table */
  classes: Class[];

  /** Boolean if server responds correctly */
  serverUnreacheable: boolean = false;

  /** Settings for the multi select dropdown menu */
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

  /**
   * Sends the data from the form to the API and handles response
   *
   * @param formData form data from template driven form
   */
  getClassesData(formData) {
    this.httpService.sendData(formData).subscribe(
      // Add classes in classes service if successful
      response => {
        this.classesService.clearClasses();
        this.classesService.addClassesFromResponse(response);
      },
      // Change variable for popup if error
      error => (this.serverUnreacheable = true),
      // If completed, render classes and clear all from previous search
      () => {
        this.classes = this.classesService.getClasses();
      }
    );
  }

  /**
   * Add a class to the cart
   *
   * @param c class object in classes list
   */
  addToCart(c: Class) {
    this.classesService.addToCart(c);
  }

  /**
   * Remove a class from the cart
   *
   * @param c class object in classes list
   */
  removeFromCart(c: Class) {
    this.classesService.removeFromCart(c);
  }

  /**
   * Runs on form submission, sends correct data from forms to API
   */
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
      department: this.dropdownSelectedValues
    };

    // Send request to server
    this.getClassesData(formatted_data);
  }

  // onChange mostly for testing right now
  onChange() {
    console.log(this.dropdownSelectedValues);
  }

  /**
   * Populate table with test classes to demo app without backend running
   */
  onClickTestData() {
    this.classesService.setClasses([
      new Class(
        "Computer Science",
        1234,
        "Lewis Bartnett",
        [new MeetingTime("9:00am", "10:15am", "MWF")],
        "JPSN 103",
        "CMSC"
      ),
      new Class(
        "Calculus",
        5242,
        "George Rogers",
        [new MeetingTime("3:00pm", "5:00pm", "TR")],
        "JPSN 214",
        "MATH"
      ),
      new Class(
        "Spanish in the Media",
        3255,
        "Leslie Kissling",
        [new MeetingTime("12:00pm", "1:15pm", "MWF")],
        "INTC 214",
        "LAIS"
      ),
      new Class(
        "Intro to Microeconomics",
        6421,
        "Grace Vanderwegen",
        [new MeetingTime("3:00pm", "4:15pm", "MWF")],
        "BUS 300",
        "ECON"
      ),
      new Class(
        "Who do you Trust?",
        1233,
        "Carol Wittig",
        [new MeetingTime("5:00pm", "6:00pm", "TR")],
        "LIBR 155",
        "FYS"
      )
    ]);
    this.classes = this.classesService.getClasses();
  }
}
