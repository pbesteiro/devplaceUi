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
    this.role = this.authService.getRole()
  }

  // @ts-ignore
  get isAdmin() {
    return this.role.includes('ADMIN')
  }

  // @ts-ignore
  get isManager() {
    return this.role.includes('MANAGER')
  }

  // @ts-ignore
  get isMentor() {
    return this.role.includes('MENTOR')
  }

  // @ts-ignore
  get isStudent() {
    return this.role.includes('STUDENT')
  }
}
