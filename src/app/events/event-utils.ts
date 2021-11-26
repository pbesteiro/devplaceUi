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
];

export function createEvent(title: string, from: any, to: any, days: any, hourFrom: any, hourTo: any) {
  const newEvent = {
    title: title,
    daysOfWeek: days,
    startTime: hourFrom,
    endTime: hourTo,
    startRecur: from,
    endRecur: to,
  }
  INITIAL_EVENTS.push(newEvent)
}

export function createEventId() {
  return String(eventGuid++);
}
