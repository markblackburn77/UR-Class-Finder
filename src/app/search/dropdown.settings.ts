// This is a settings file for the dropdown used in the search component. Moved here to reduce clutter.
import {
  IMultiSelectOption,
  IMultiSelectTexts,
  IMultiSelectSettings
} from 'angular-2-dropdown-multiselect';

export class DropdownSettings {
  // Labels / Parents
  // The only reason I've hardcoded these is because
  // The excel file I'm getting the data from on the backend
  // only includes the "id"s and not the names, so they're gonna have
  // to be hardcoded somewhere anyways, might as well save a request.
  public static myOptions: IMultiSelectOption[] = [
    { id: 'ACCT', name: 'Accounting' },
    { id: 'ADED', name: 'Adult Education' },
    { id: 'AMST', name: 'American Studies' },
    { id: 'ANTH', name: 'Anthropology' },
    { id: 'ARAB', name: 'Arabic' },
    { id: 'ARTH', name: 'Art History' },
    { id: 'BIOL', name: 'Biology' },
    { id: 'BMB', name: 'Biochemistry / Molecular Biology' },
    { id: 'BUAD', name: 'Business Administration' },
    { id: 'CHEM', name: 'Chemistry' },
    { id: 'CHIN', name: 'Chinese' },
    { id: 'CLCV', name: 'Classical Civilization' },
    { id: 'CLSC', name: 'Classics' },
    { id: 'CMSC', name: 'Computer Science' },
    { id: 'CRWR', name: 'Creative Writing' },
    { id: 'CLAC', name: 'Culture/Language Across Curr' },
    { id: 'DANC', name: 'Dance' },
    { id: 'ECON', name: 'Economics' },
    { id: 'EDUC', name: 'Education' },
    { id: 'ENGL', name: 'English' },
    { id: 'ENVR', name: 'Environmental Studies' },
    { id: 'FIN', name: 'Finance' },
    { id: 'FMST', name: 'Film Studies' },
    { id: 'FREN', name: 'French' },
    { id: 'FYS', name: 'First Year Seminar' },
    { id: 'GEOG', name: 'Geography' },
    { id: 'GEOL', name: 'Geology' },
    { id: 'GERM', name: 'German' },
    { id: 'GREK', name: 'Greek' },
    { id: 'GS', name: 'Global Studies' },
    { id: 'HCS', name: 'Healthcare and Society' },
    { id: 'HIST', name: 'History' },
    { id: 'HRM', name: 'Human Resources Management' },
    { id: 'HUM', name: 'Humanities' },
    { id: 'IBUS', name: 'International Business' },
    { id: 'IDST', name: 'Interdisciplinary Studies' },
    { id: 'INFO', name: 'Information Systems' },
    { id: 'ITAL', name: 'Italian' },
    { id: 'JAPN', name: 'Japanese' },
    { id: 'JOUR', name: 'Journalism' },
    { id: 'LAIS', name: 'Latin American / Iberian Studies' },
    { id: 'LATN', name: 'Latin' },
    { id: 'LDST', name: 'Leadership Studies' },
    { id: 'LING', name: 'Linguistics' },
    { id: 'LLC', name: 'Language, Literature & Culture' },
    { id: 'MATH', name: 'Mathematics' },
    { id: 'MGMT', name: 'Management' },
    { id: 'MKT', name: 'Marketing' },
    { id: 'MSAP', name: 'Music - Applied Music' },
    { id: 'MSCL', name: 'Military Science & Leadership' },
    { id: 'MSEN', name: 'Music Ensemble' },
    { id: 'MUS', name: 'Music' },
    { id: 'PHIL', name: 'Philosophy' },
    { id: 'PHYS', name: 'Physics' },
    { id: 'PLSC', name: 'Political Science' },
    { id: 'PPEL', name: 'Philosophy/Politics/Econ and Law' },
    { id: 'PSYC', name: 'Psychology' },
    { id: 'REG', name: 'Sports' },
    { id: 'RELG', name: 'Religious Studies' },
    { id: 'RHCS', name: 'Rhetoric/Communication Studies' },
    { id: 'RUSN', name: 'Russian' },
    { id: 'SDLC', name: 'Self-Directed Language/Culture' },
    { id: 'SOC', name: 'Sociology' },
    { id: 'SWAH', name: 'Swahili' },
    { id: 'THTR', name: 'Theatre' },
    { id: 'VMAP', name: 'Visual and Media Arts Practice' },
    { id: 'WELL', name: 'Wellness' },
    { id: 'WGSS', name: 'Women/Gender/Sexuality Studies' }
  ];

  // Text configuration
  public static myTexts: IMultiSelectTexts = {
    checkAll: 'Select all',
    uncheckAll: 'Unselect all',
    checked: 'selected',
    checkedPlural: 'selected',
    searchPlaceholder: 'Search',
    searchEmptyResult: 'Nothing found...',
    searchNoRenderText: 'Type in search box to see results...',
    defaultTitle: 'Department',
    allSelected: 'All selected'
  };

  // Settings configuration
  public static mySettings: IMultiSelectSettings = {
    enableSearch: true,
    checkedStyle: 'fontawesome',
    buttonClasses: 'btn btn-outline-primary form-control',
    dynamicTitleMaxItems: 0,
    displayAllSelectedText: false,
    showCheckAll: true,
    showUncheckAll: true,
    maxHeight: '200px'
  };
}
