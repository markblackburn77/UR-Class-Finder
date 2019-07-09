import { MeetingTime } from './meeting-time.model';

describe('MeetingTime Model', () => {
  it('Test getStartAsNum', () => {
    let m = new MeetingTime('9:15 AM', '4:30 PM', 'TR');
    expect(m.startAsNum()).toBe(915);
  });

  it('Test getEndAsNum', () => {
    let m = new MeetingTime('4:15 PM', '5:30 PM', 'TR');
    expect(m.endAsNum()).toBe(1730);
  });
});
