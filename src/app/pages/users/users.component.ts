import { Component, OnInit } from '@angular/core';
import { UserService } from "../../services/user.services";
import { first } from "rxjs";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.userService.getAll()
      .pipe(
        first()
      ).subscribe( response => console.log(response))
  }

}
