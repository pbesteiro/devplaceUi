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

  loginForm: any;
  hide = true;
  loading = false;
  returnUrl: string = '';

  constructor(
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router
  ) { if (this.authService.userValue) {
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
          //TODO (Refactor para V2): para la V1 sólo pueden autenticarse los roles ADMIN y MANAGER
          if (this.authService.role.every((i: any) => ['ADMIN', 'MANAGER'].includes(i))) {
            this.router.navigate([this.returnUrl]);
          } else {
            this.authService.logout();
            this.loading = false;
            Swal.fire({
              icon: 'error',
              title: 'El usuario o la contraseña son inválidos'
            })
          }
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
