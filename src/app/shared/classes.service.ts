import { Class } from './class.model';
import { MeetingTime } from './meeting-time.model';

export class ClassesService {
  /** All classes loaded from the last search */
  private loadedClassesFromSearch: Class[] = [];

  /** Classes added to the cart */
  public currentCart: Class[] = [];

  /** All sections of classes in the cart */
  private allSectionsOfCurrentCart: Class[] = [];

  // Accessor Methods

  /**
   * Returns a copy of the class list (but not the actual list)
   */
  getClassesLoadedFromSearch(): Class[] {
    return this.loadedClassesFromSearch.slice();
  }

  /**
   * Returns a copy of the classes cart (but not the actual list)
   */
  getCurrentCart(): Class[] {
    return this.currentCart.slice();
  }

  /**
   * Returns a copy of all the sections of classes in the current cart (but not the actual list)
   */
  getAllSectionsOfCurrentCart(): Class[] {
    return this.allSectionsOfCurrentCart.slice();
  }

  /**
   * Check if a given class is in the cart. Returns boolean value
   *
   * @param c Class object
   */
  private classInCart(c: Class): boolean {
    for (let i = 0; i < this.currentCart.length; i++) {
      if (c.crn === this.currentCart[i].crn) {
        return true;
      }
    }
    return false;
  }

  // Mutator methods

  /**
   * Set the list of classes loaded from the last search to a new list
   *
   * @param c new list of class objects
   */
  setClassesLoadedFromSearch(c: Class[]) {
    this.loadedClassesFromSearch = c;
  }

  /**
   * Clear all of the classes loaded from the last search
   */
  clearClassesLoadedFromSearch() {
    this.loadedClassesFromSearch = [];
  }

  /**
   * Add a class to the list of classes loaded from the search.
   *
   * @param c new class object
   */
  public addToLoadedClassesFromSearch(c: Class) {
    // Check if class is in cart
    if (this.classInCart(c)) {
      c.inCart = true;
    }
    this.loadedClassesFromSearch.push(c);
  }

  /**
   * Add a class to the cart
   *
   * @param index of the class object within the classes list
   */
  addToCart(c: Class): void {
    c.inCart = true;
    this.currentCart.push(c);
  }

  /**
   * Remove a class from the cart
   *
   * @param c class object to remove
   */
  removeFromCart(c: Class) {
    c.inCart = false;

    for (var i = 0; i < this.currentCart.length; i++) {
      if (c.crn == this.currentCart[i].crn) {
        this.currentCart.splice(i, 1);
      }
    }
  }

  /**
   * Load classes from the search
   *
   * @param classesDataFromServer JSON data returned from server
   */
  public loadClassesFromSearch(classesDataFromServer): void {
    this.clearClassesLoadedFromSearch();
    this.loadedClassesFromSearch = this.readClassesFromResponse(
      classesDataFromServer
    );
  }

  public loadAllSectionsOfCart(classesDataFromServer): void {
    this.allSectionsOfCurrentCart = this.readClassesFromResponse(
      classesDataFromServer
    );
  }

  /**
   * Takes the JSON response return from the API and parses classes into Class objects
   *
   * @param response JSON response from API
   * @returns array of loaded classes
   */
  private readClassesFromResponse(response): Class[] {
    // Array to store loaded classes
    let loadedClasses: Class[] = [];

    // Iterate through classes returned and add as objects
    for (let i = 0; i < response.length; i++) {
      // Create new class object
      let newClass: Class = new Class(
        response[i]['class_name'],
        response[i]['crn'],
        response[i]['professor'],
        [],
        response[i]['building'],
        response[i]['department']
      );

      // Check if the class has meeting time info before adding
      if (
        response[i]['start_time'] &&
        response[i]['end_time'] &&
        response[i]['week_code']
      ) {
        newClass.meetingTimes.push(
          new MeetingTime(
            response[i]['start_time'],
            response[i]['end_time'],
            response[i]['week_code']
          )
        );
      }

      // Check for duplicates already in classes list
      let duplicates: Class[] = loadedClasses.filter(
        x => x.crn == newClass.crn
      );

      // Add classes meeting times to already existing class
      // Note: This case should happen if a class has two sections
      if (duplicates.length > 0) {
        duplicates[0].meetingTimes = duplicates[0].meetingTimes.concat(
          newClass.meetingTimes
        );
      } else {
        loadedClasses.push(newClass);
      }
    }
    return loadedClasses;
  }
}
