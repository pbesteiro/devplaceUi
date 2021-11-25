import { EventInput } from '@fullcalendar/angular';

let eventGuid = 0;

export const INITIAL_EVENTS: EventInput[] = [
  {
    title: 'my recurring event',
    daysOfWeek: [ '2', '4' ],
    startTime: '16:00:00', // will also accept '20120201T103000'
    endTime: '17:00:00', // will also accept '20120201',
    startRecur: '2021-11-20',
    endRecur: '2021-12-25',
  }
  /*
  {
    id: createEventId(),
    title: 'All-day event',
    allDay: false,
    start: '2021-11-25',
    end: '2021-12-25',
    startTime: '10:00',
    endTime: '13:00',
    daysOfWeek: [ '4' ], // these recurrent events move separately
    color: 'red'
  },
  */
];

export function createEventId() {
  return String(eventGuid++);
}
