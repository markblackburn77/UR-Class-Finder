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
   * Add a class to the list of classes. Also checks if a duplicate
   * exists (such as in the case of a lab) and adds to the existing object
   *
   * TODO: Optimization- move the logic for actually creating a class object to this
   * function, so that you could check for duplicates before creating the object.
   *
   * @param c new class object
   */
  addClass(c: Class) {
    let duplicates: Class[] = this.classes.filter(x => x.crn == c.crn);
    if (duplicates.length > 0) {
      for (var i = 0; i < duplicates.length; i++) {
        duplicates[i].meetingTimes = duplicates[i].meetingTimes.concat(
          c.meetingTimes
        );
      }
    } else {
      this.classes.push(c);
    }
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
  addClassesFromResponse(response) {
    // Iterate through classes returned and add as objects
    for (let i = 0; i < response.length; i++) {
      this.addClass(
        new Class(
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
        )
      );

      // Check if class is in cart on add
      for (let p = 0; p < this.prospectiveClasses.length; p++) {
        // Check based on start time and crn, since classes can have same crn
        if (this.classes[i].crn == this.prospectiveClasses[p].crn) {
          this.classes[i].inCart = true;
        }
      }
    }
  }
}
