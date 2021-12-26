import {Component, Input, OnInit} from "@angular/core";

@Component({
  selector: 'app-commission-tab-assistants',
  templateUrl: './commission-tab-assistants.component.html',
  styleUrls: ['./commission-tab-assistants.component.css']
})
export class CommissionTabAssistantsComponent implements OnInit {

  @Input() commissionId: string = '';

  constructor() {
  }

  ngOnInit() {
  }
}
