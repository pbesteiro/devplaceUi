import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import { AuthenticationService } from "../../services/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    private authService: AuthenticationService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    Swal.fire({
      title: 'Cerrar sesión',
      text: "¿Desea cerrar su sesión?",
      icon: 'warning',
      backdrop: 'rgba(103, 58, 183, 0.3)',
      heightAuto: false,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.logout()
      }
    })
  }

}
