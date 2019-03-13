import { Class } from "../shared/class.model";

export class ClassesService {
  private classes: Class[] = [];

  public prospectiveClasses: Class[] = [];

  getClasses() {
    // Return copy of the class list, not the actual list
    return this.classes.slice();
  }

  addToCart(index: number) {
    // Class in question
    let currClass = this.classes[index];
    // Toggle instance variable of class obj being in cart
    currClass.inCart = true;
    // Assign instance variable position obj will be in cart
    // This is done for efficiency when removing
    currClass.posInCart = this.prospectiveClasses.length;
    // Add a copy of class that was added to another list of classes
    this.prospectiveClasses.push(this.classes.slice(index, index + 1)[0]);
  }

  removeFromCart(index: number) {
    // Toggle the class being in a cart
    this.classes[index].inCart = false;
    // Remove the class from the cart
    this.prospectiveClasses.splice(
      this.classes[index].posInCart,
      this.classes[index].posInCart + 1
    );
  }

  clearClasses() {
    this.classes = [];
  }

  addClass(c: Class) {
    this.classes.push(c);
  }

  addClassesFromResponse(response) {
    // Iterate through classes returned and add as objects
    for (var c in response) {
      this.addClass(
        new Class(
          response[c]["class_name"],
          response[c]["crn"],
          response[c]["professor"],
          response[c]["start_time"],
          response[c]["end_time"],
          response[c]["location"],
          response[c]["department"]
        )
      );
    }
  }
}
