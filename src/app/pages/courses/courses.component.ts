import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {CreateEditComponent} from "./create-edit/create-edit.component";
import {UserModel} from "../../models/user.model";
import {MatTableDataSource} from "@angular/material/table";
import {INITIAL_EVENTS} from "../../events/event-utils";

const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  displayedColumns: string[] = ['title'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.dataSource.data = INITIAL_EVENTS
  }

  openDialog() {
    this.dialog.open(CreateEditComponent);
  }

}
