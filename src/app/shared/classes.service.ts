import { Class } from "./class.model";
import { MeetingTime } from "./meeting-time.model";

export class ClassesService {
  /** All loaded classes */
  private classes: Class[] = [];

  /** Classes in the "cart" */
  public prospectiveClasses: Class[] = [];

  /**
   * Returns a copy of the class list (but not the actual list)
   */
  getClasses() {
    return this.classes.slice();
  }

  getProspectiveClasses() {
    return this.prospectiveClasses.slice();
  }

  /**
   * Add a class to the cart
   *
   * @param index of the class object within the classes list
   */
  addToCart(c: Class) {
    // Change variable in class to true
    c.inCart = true;
    // Add copy of class to cart
    this.prospectiveClasses.push(c);
  }

  /**
   * Remove a class from the cart
   *
   * @param index of the class object within the classes list
   */
  removeFromCart(c: Class) {
    // Toggle the class being in a cart
    c.inCart = false;
    // Remove the class from the cart
    for (var i = 0; i < this.prospectiveClasses.length; i++) {
      if (c.crn == this.prospectiveClasses[i].crn) {
        this.prospectiveClasses.splice(i, 1);
      }
    }
  }

  /**
   * Clear all of the loaded classes
   */
  clearClasses() {
    this.classes = [];
  }

  /**
   * Set the list of classes to a new list
   *
   * @param c new list of class objects
   */
  setClasses(c: Class[]) {
    this.classes = c;
  }

  /**
   * Parse JSON response from API into class objects
   *
   * @param response JSON response from API
   */
  addClassesFromResponse(response): void {
    // Iterate through classes returned and add as objects
    for (let i = 0; i < response.length; i++) {
      // Create new class object
      let newClass: Class = new Class(
        response[i]["class_name"],
        response[i]["crn"],
        response[i]["professor"],
        [],
        response[i]["building"],
        response[i]["department"]
      );

      if (
        response[i]["start_time"] &&
        response[i]["end_time"] &&
        response[i]["week_code"]
      ) {
        newClass.meetingTimes.push(
          new MeetingTime(
            response[i]["start_time"],
            response[i]["end_time"],
            response[i]["week_code"]
          )
        );
      }

      this.addClass(newClass);
    }
  }

  /**
   * Add a class to the list of classes. Also checks if a duplicate
   * exists or if the class is currently in the cart ("prospective classes")
   *
   * @param c new class object
   */
  private addClass(c: Class) {
    // Check for duplicates already in classes list
    let duplicates: Class[] = this.classes.filter(x => x.crn == c.crn);
    if (duplicates.length > 0) {
      duplicates[0].meetingTimes = duplicates[0].meetingTimes.concat(
        c.meetingTimes
      );
    } else {
      // Check if class is in cart
      if (this.classInCart(c)) {
        c.inCart = true;
      }
      this.classes.push(c);
    }
  }

  /**
   * Check if a given class is in the cart. Returns boolean value
   *
   * @param c Class object
   */
  private classInCart(c: Class): boolean {
    for (var i = 0; i < this.prospectiveClasses.length; i++) {
      if (c.crn == this.prospectiveClasses[i].crn) {
        return true;
      }
    }
    return false;
  }
}
