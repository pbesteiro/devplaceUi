import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../../../../services/user.services";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoursesComponent} from "../../../../courses/courses.component";

@Component({
  selector: 'app-add-assistants',
  templateUrl: './add-assistants.component.html',
  styleUrls: ['./add-assistants.component.css']
})
export class AddAssistantsComponent implements OnInit {

  myControl = new FormControl(null, Validators.required);
  filteredOptions: Observable<any[]> | undefined;

  students: any[] = []
  selectedStudents = this.students;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<CoursesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {


    this.userService.getAllStudents()
      .subscribe( (response) => {
        this.students = response
        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.name)),
          map(name => (name ? this._filter(name) : this.students.slice())),
        );
      })
  }

  displayFn(user: any): string {
    return user && user.name ? user.name : '';
  }

  private _filter(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.students.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  addStudent() {
    this.dialogRef.close({
      studentAdded: this.myControl.value
    })
  }
}
