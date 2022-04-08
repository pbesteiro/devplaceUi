import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {AuthenticationService} from "../../../services/auth.service";
import {UserService} from "../../../services/user.services";

const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-student-list-classes',
  templateUrl: './student-list-classes.component.html',
  styleUrls: ['./student-list-classes.component.css']
})
export class StudentListClassesComponent implements OnInit {

  user: any
  displayedColumns: string[] = ['date', 'hour', 'course', 'subject', 'documents','meet'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  loading = true
  classes: any[] = []

  constructor(
    private authService: AuthenticationService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.user = this.authService.userValue
    this.userService.getUserByEmail(this.user.email)
      .subscribe( (user: any) => {
        this.classes = user.classes;
        localStorage.setItem('classes', JSON.stringify(this.classes))
        this.dataSource.data = this.classes
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
