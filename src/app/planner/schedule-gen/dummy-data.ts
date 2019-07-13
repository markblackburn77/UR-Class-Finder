import { Class } from 'src/app/shared/class.model';
import { MeetingTime } from 'src/app/shared/meeting-time.model';

export class DummyData {
  public static classes: Class[] = [
    new Class(
      'Class 1',
      1,
      '',
      [
        new MeetingTime('9:00 AM', '10:30 AM', 'MW'),
        new MeetingTime('3:00 PM', '4:15 PM', 'F')
      ],
      '',
      '',
      123
    ),
    new Class(
      'Class 2',
      1,
      '',
      [
        new MeetingTime('8:15 AM', '10:00 AM', 'TR'),
        new MeetingTime('10:00 AM', '11:00 AM', 'F')
      ],
      '',
      '',
      123
    ),
    new Class(
      'Class 3',
      1,
      '',
      [new MeetingTime('3:15 PM', '4:30 PM', 'MW')],
      '',
      '',
      123
    ),
    new Class(
      'Class 4',
      1,
      '',
      [new MeetingTime('4:15 PM', '5:30 PM', 'TR')],
      '',
      '',
      123
    ),
    new Class(
      'Class 5',
      1,
      '',
      [
        new MeetingTime('9:15 AM', '4:30 PM', 'TR'),
        new MeetingTime('1:00 PM', '2:00 PM', 'F')
      ],
      '',
      '',
      123
    )
  ];
}
