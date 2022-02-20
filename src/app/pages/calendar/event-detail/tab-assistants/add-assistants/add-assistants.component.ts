import {Component, Inject, OnInit} from '@angular/core';
import {UserService} from "../../../../../services/user.services";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {Observable, startWith} from "rxjs";
import {map} from "rxjs/operators";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CoursesComponent} from "../../../../courses/courses.component";
import Swal from "sweetalert2";

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
      .subscribe(
        (response: any) => {
        this.students = response
        // exclir this.data.students
        for ( const student of this.students ) {
          for ( const el of this.data.students ) {
            if ( el._id === student._id ) {
              const index = this.students.indexOf( student )
              this.students.splice( index, 1 )
            }
          }
        }

        this.filteredOptions = this.myControl.valueChanges.pipe(
          startWith(''),
          map(value => (typeof value === 'string' ? value : value.name)),
          map(name => (name ? this._filter(name) : this.students.slice())),
        );
      }, (error: any) => {
        Swal.fire({
          title: 'Ha ocurrido un problema',
          text: error.message,
          icon: 'error',
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          backdrop: 'rgba(103, 58, 183, 0.3)',
          confirmButtonText: 'Reintentar'
        })
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
