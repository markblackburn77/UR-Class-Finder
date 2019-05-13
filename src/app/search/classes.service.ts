import { Class } from "../shared/class.model";
import { MeetingTime } from "../shared/meeting-time.model";

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

  /**
   * Add a class to the cart
   *
   * @param index of the class object within the classes list
   */
  addToCart(index: number) {
    // Select the class
    let currClass = this.classes[index];
    // Change variable in class to true
    currClass.inCart = true;
    // Keep track of position in cart
    currClass.posInCart = this.prospectiveClasses.length;
    // Add copy of class to cart
    this.prospectiveClasses.push(this.classes.slice(index, index + 1)[0]);
  }

  /**
   * Remove a class from the cart
   *
   * @param index of the class object within the classes list
   */
  removeFromCart(index: number) {
    // Toggle the class being in a cart
    this.classes[index].inCart = false;
    // Remove the class from the cart
    this.prospectiveClasses.splice(this.classes[index].posInCart);
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
        [
          new MeetingTime(
            response[i]["start_time"],
            response[i]["end_time"],
            response[i]["week_code"]
          )
        ],
        response[i]["building"],
        response[i]["department"]
      );

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
