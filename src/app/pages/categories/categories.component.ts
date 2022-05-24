import {Component, OnInit} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";
import {MatTableDataSource} from "@angular/material/table";
import {first} from "rxjs";
import {
  TechnologyCreateEditComponent
} from "../technologies/technology-create-edit/technology-create-edit.component";
import Swal from "sweetalert2";
import {CategoryModel} from "../../models/category.model";
import {CategoryService} from "../../services/category.service";
import {CategoryCreateEditComponent} from "./category-create-edit/category-create-edit.component";

const categories: CategoryModel[] = []

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  category: any = new CategoryModel('', '', false);
  editAction: boolean = false;
  loading = true

  constructor(
    private dialog: MatDialog,
    private categoriesService: CategoryService
  ) { }

  displayedColumns: string[] = ['name', 'actionEdit', 'actionDelete'];
  dataSource = new MatTableDataSource(categories);

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.categoriesService.getAll()
      .pipe(
        first()
      ).subscribe( (response: any) => {
      this.dataSource.data = response.filter( (category: any) => {
        if (category.active) {
          return category;
        }
      })
      this.loading = false;
    })
  }

  openDialog(category?: CategoryModel) {

    if (category) {
      this.category = category;
      this.editAction = true;
    }

    const dialogRef = this.dialog.open(CategoryCreateEditComponent, {
      // disableClose: true,
      data: {
        category: this.category,
        editAction: this.editAction,
      }
    });

    dialogRef.afterClosed()
      .subscribe( result => {
        if ( result ) {
          window.location.reload();
        }
      })
  }

  removeTechnology(id: string) {
    Swal.fire({
      title: '¿Quiere eliminar la categoría?',
      text: ``,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      backdrop: 'rgba(103, 58, 183, 0.3)',
      heightAuto: false,
    }).then((result: any) => {
      if (result.isConfirmed) {
        this.categoriesService.update(id, {active: false})
          .subscribe(() => {
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Categoría eliminada',
              backdrop: 'rgba(103, 58, 183, 0.3)',
              heightAuto: false,
              showConfirmButton: false,
              timer: 1500
            })
            setTimeout(() => {
              window.location.reload();
            }, 1400)
          })
      }
    })
  }

}
