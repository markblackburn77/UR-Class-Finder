import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ClassesService } from '../shared/classes.service';
import { Class } from '../shared/class.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-planner',
  templateUrl: './planner.component.html',
  styleUrls: ['./planner.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PlannerComponent implements OnInit {
  /** Prospective classes */
  cart: Class[];

  // Inject classesService
  constructor(private classesService: ClassesService, private router: Router) {}

  ngOnInit() {
    // Set the data in this component to master prospective classes list
    this.cart = this.classesService.getCurrentCart();

    // If this route is visited and no classes are in cart, redirect to search
    // if (this.cart.length == 0) {
    //   this.router.navigate(["/"]);
    // }
  }

  /**
   * Removes a class from the cart and updates the data in the component accordingly.
   *
   * @param c Class to remove from cart.
   */
  removeFromCart(c: Class) {
    this.classesService.removeFromCart(c);
    this.cart = this.classesService.getCurrentCart();
  }
}
