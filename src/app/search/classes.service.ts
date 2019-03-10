import { Class } from "../shared/class.model";

export class ClassesService {
  private classes: Class[] = [
    new Class(
      "Computer Science",
      1231,
      "Prof. Smith",
      "9:00am",
      "10:15am",
      "JPSN 103",
      "CMSC"
    ),
    new Class(
      "Calculus",
      1421,
      "Prof. Rogers",
      "11:00am",
      "1:30pm",
      "GOTY 004",
      "MATH"
    ),
    new Class(
      "Discrete Mathematics",
      8523,
      "Prof. Szajada",
      "4:30pm",
      "5:45pm",
      "JPSN 103",
      "CMSC"
    ),
    new Class(
      "Spanish in the Media",
      1231,
      "Prof. Kissling",
      "5:00pm",
      "5:50pm",
      "INTC 221",
      "LAIS"
    ),
    new Class(
      "Intro to Economics",
      7351,
      "Prof. Vanderwergen",
      "3:00pm",
      "5:15pm",
      "BUS 106",
      "ACCT"
    )
  ];
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
}
