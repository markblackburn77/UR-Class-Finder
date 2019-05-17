import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleGenComponent } from './schedule-gen.component';

describe('ScheduleGenComponent', () => {
  let component: ScheduleGenComponent;
  let fixture: ComponentFixture<ScheduleGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
