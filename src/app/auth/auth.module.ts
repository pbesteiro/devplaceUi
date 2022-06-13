import { NgModule } from "@angular/core";
import { LoginComponent } from './login/login.component';
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatCardActions, MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {NgxWhastappButtonModule} from "ngx-whatsapp-button";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatCardModule,
        MatIconModule,
        MatInputModule,
        MatButtonModule,
        NgxWhastappButtonModule,
    ],
  declarations: [
    LoginComponent
  ],
  exports: [
    LoginComponent
  ]
})

export class AuthModule { }
