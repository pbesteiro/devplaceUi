import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../services/auth.service";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";
import Swal from 'sweetalert2'
import { first } from "rxjs";
import { LoginUserModel } from "../../models/login.model";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public phone = "+54 9 11 5962-1707"
  public title = "DevPlaces";

  loginForm: any;
  hide = true;
  loading = false;
  returnUrl: string = '';

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) {
    if (this.authService.userValue) {
    this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.min(4), Validators.email]],
      password: ["", [Validators.required, Validators.min(4)]]
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    this.loading = true;
    const { email, password } = this.loginForm.value;
    const user = new LoginUserModel(email, password);
    this.authService.login(user)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl]);
        },
        error: () => {
          this.loading = false;
          Swal.fire({
            icon: 'error',
            title: 'El usuario o la contraseña son inválidos'
          })
        }
      });
  }

}
