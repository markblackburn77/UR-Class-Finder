import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleGenComponent } from './schedule-gen.component';
import { Class } from 'src/app/shared/class.model';
import { MeetingTime } from 'src/app/shared/meeting-time.model';
import { DummyData } from './dummy-data';
import { ClassesService } from 'src/app/shared/classes.service';
import { HttpService } from 'src/app/shared/http.service';
import { Http } from '@angular/http';

describe('ScheduleGenComponent', () => {
  let component: ScheduleGenComponent;
  let fixture: ComponentFixture<ScheduleGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduleGenComponent],
      providers: [
        { provide: ClassesService, useClass: ClassesService },
        { provide: HttpService, useClass: HttpService },
        { provide: Http }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Test isCompatible', () => {
    let c1: Class = DummyData.classes[3];
    let c2: Class = DummyData.classes[4];

    expect(component.isCompatible(c1, c2)).toBe(false);
  });

  it('Test intersection', () => {
    expect(
      component.intersection(['M', 'W', 'F'], ['M', 'W', 'F']).length
    ).toBe(3);
  });
});
