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
  checked = false;
  allPublications: any[] = []
  activePublications: any[] = []

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
          this.allPublications = response
          this.activePublications = response.filter( (publication: any) => {
            if (publication.active) {
              return publication
            }
          })
          this.dataSource.data = this.activePublications
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
          name: '',
          mentor: {
            _id: '',
          }
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

  filterActivesPublications() {

    if (this.checked) {
      this.dataSource.data = this.allPublications
    } else {
      this.dataSource.data = this.activePublications
    }


  }


}
