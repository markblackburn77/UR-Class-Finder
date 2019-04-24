import {
  IMultiSelectOption,
  IMultiSelectTexts,
  IMultiSelectSettings
} from "angular-2-dropdown-multiselect";

export class DropdownSettings {
  // Labels / Parents
  public static myOptions: IMultiSelectOption[] = [
    { id: "CMSC", name: "CMSC" },
    { id: "BIO", name: "Biology" },
    { id: "CHEM", name: "Chemistry" },
    { id: "ART", name: "Art" },
    { id: "MATH", name: "Mathematics" },
    { id: "LAIS", name: "Latin American / Iberian Studies" },
    { id: "ECON", name: "Economics" },
    { id: "FYS", name: "First Year Seminar" }
  ];

  // Text configuration
  public static myTexts: IMultiSelectTexts = {
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

  // Settings configuration
  public static mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: "fontawesome",
    buttonClasses: "btn btn-outline-primary",
    dynamicTitleMaxItems: 0,
    displayAllSelectedText: false,
    showCheckAll: true,
    showUncheckAll: true,
    maxHeight: "200px"
  };
}
