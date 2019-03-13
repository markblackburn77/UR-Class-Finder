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
    for (let i = 0; i < response.length; i++) {
      this.addClass(
        new Class(
          response[i]["class_name"],
          response[i]["crn"],
          response[i]["professor"],
          response[i]["start_time"],
          response[i]["end_time"],
          response[i]["location"],
          response[i]["department"]
        )
      );

      // Check if class is in cart on add (not exactly efficient)
      for (let p = 0; p < this.prospectiveClasses.length; p++) {
        if (this.classes[i].crn == this.prospectiveClasses[p].crn) {
          this.classes[i].inCart = true;
        }
      }
    }
  }
}
