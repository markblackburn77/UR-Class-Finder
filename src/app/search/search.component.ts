import { Component, OnInit, OnDestroy } from "@angular/core";
import { ClassesService } from "./classes.service";
import { Class } from "../shared/class.model";
import {
  IMultiSelectOption,
  IMultiSelectTexts,
  IMultiSelectSettings
} from "angular-2-dropdown-multiselect";

@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"]
})
export class SearchComponent implements OnInit {
  classes: Class[];

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

  constructor(private classesService: ClassesService) {}

  ngOnInit() {
    this.classes = this.classesService.getClasses();
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
}
