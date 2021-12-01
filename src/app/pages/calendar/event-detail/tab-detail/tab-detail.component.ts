import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-tab-detail',
  templateUrl: './tab-detail.component.html',
  styleUrls: ['./tab-detail.component.css']
})
export class TabDetailComponent implements OnInit {

  @Input() calendarEvent: any = null;

  constructor() { }

  ngOnInit(): void {
    console.log(this.calendarEvent)
  }

}
