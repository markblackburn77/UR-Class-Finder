import { Component, OnInit } from "@angular/core";
import { Class } from "../../shared/class.model";

@Component({
  selector: "app-schedule-gen",
  templateUrl: "./schedule-gen.component.html",
  styleUrls: ["./schedule-gen.component.scss"]
})
export class ScheduleGenComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  compatSchedules: Class[][];
  possibleClasses: Class[];

  bronKerbochAdaptation(r: Class[], p: Class[], x: Class[]) {
    if (p.length == 0 || x.length == 0) {
      this.compatSchedules.push(r);
      return;
    }

    for (let v of p) {
      this.bronKerbochAdaptation(
        this.union(r, [v]),
        this.intersection(p, this.neighbors(v)),
        this.intersection(x, this.neighbors(v))
      );

      p = this.difference(p, [v]);
      x = this.union(x, [v]);
    }
  }

  union(a: any[], b: any[]) {
    return a.slice().concat(b);
  }

  intersection(a: any[], b: any[]) {
    return a.slice().filter(value => b.includes(value));
  }

  difference(a: any[], b: any[]) {
    return a.slice().filter(value => b.indexOf(value) < 0);
  }

  neighbors(c: Class): Class[] {
    return new Class[0]();
  }

  isCompatible(c1: Class, c2: Class): boolean {
    start1: return false;
  }

  timesConflict(c1: Class, c2: Class) {}
}
