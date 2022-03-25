import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../../../services/auth.service";
import {MatTableDataSource} from "@angular/material/table";

const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-mentor-list-classes',
  templateUrl: './mentor-list-classes.component.html',
  styleUrls: ['./mentor-list-classes.component.css']
})
export class MentorListClassesComponent implements OnInit {

  user: any
  displayedColumns: string[] = ['class', 'date', 'hour', 'commission', 'course', 'subject', 'documents', 'state'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  loading = true
  classes: any[] = []

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.user = this.authService.userValue
    // @ts-ignore
    this.classes = JSON.parse(localStorage.getItem('classes'))
    this.dataSource.data = this.classes
    console.log(this.classes)
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changeState(classId: string, actualCLass: any) {}

}
