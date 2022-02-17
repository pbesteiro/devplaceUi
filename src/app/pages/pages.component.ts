import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/auth.service";
import {JwtHelperService} from "@auth0/angular-jwt";

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {

  role: any = '';

  constructor(
    private authService: AuthenticationService,
    public jwtHelper: JwtHelperService,
  ) { }

  ngOnInit(): void {
    if (this.authService.userValue) {
      this.role = this.authService.userValue.roles.toString()
    }
  }

  // @ts-ignore
  get isAdmin() {
    return this.role.includes('ADMIN')
  }

  // @ts-ignore
  get isManager() {
    return this.role.includes('MANAGER')
  }

}
