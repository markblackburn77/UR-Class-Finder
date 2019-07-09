import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { Class } from '../shared/class.model';
import { ClassesService } from '../shared/classes.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements OnInit {
  // Input for classes to be displayed in table
  @Input() classes: Class[];

  // Event emitters
  @Output() addButtonClicked = new EventEmitter();
  @Output() removeButtonClicked = new EventEmitter();

  // Inject classesService
  constructor(private classesService: ClassesService) {}

  ngOnInit() {}

  /**
   * Emit event to allow parent to deal with button presses
   *
   * @param c class object in classes list
   */
  addBtnClicked(c: Class) {
    this.addButtonClicked.emit(c);
  }

  /**
   * Emit event to allow parent to deal with button presses
   *
   * @param c class object in classes list
   */
  removeBtnClicked(c: Class) {
    this.removeButtonClicked.emit(c);
  }
}
