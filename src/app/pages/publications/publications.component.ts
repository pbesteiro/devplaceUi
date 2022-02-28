import {Component, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {MatDialog} from "@angular/material/dialog";
import {PublicationsService} from "../../services/publications.service";
import {errorCommunicationWithRetry} from "../../helpers/error.communication";
import {PublicationCreateEditComponent} from "./publication-create-edit/publication-create-edit.component";

const ELEMENT_DATA: any[] = [];

@Component({
  selector: 'app-publication',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'dateStart', 'technology', 'active', 'actionEdit'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  loading = true

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private dialog: MatDialog,
    private publicationsService: PublicationsService,
  ) {
  }

  ngOnInit() {
    this.publicationsService.getAll()
      .subscribe(
        (response: any) => {
          this.dataSource.data = response
          this.loading = false
        },
        (error: any) => {
          this.loading = false
          errorCommunicationWithRetry(error)
        }
      )
  }

  createPublication() {
    this.dialog.open(PublicationCreateEditComponent, {
      maxHeight: window.innerHeight + 'px',
      data: {
        publication: {
          name: ''
        },
      },
    })
  }

  editPublication(publicationId: string, publication: any) {
    console.log(publication)
    this.dialog.open(PublicationCreateEditComponent, {
      maxHeight: window.innerHeight + 'px',
      data:{
        isEdit: true,
        publicationId,
        publication,
      }
    })
  }


}
