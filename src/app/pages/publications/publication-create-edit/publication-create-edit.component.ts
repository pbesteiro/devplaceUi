import {Component, Inject, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PublicationsComponent} from "../publications.component";
import {PublicationsService} from "../../../services/publications.service";
import {errorCommunicationWithRetry} from "../../../helpers/error.communication";
import Swal from "sweetalert2";
import {TechnologyModel} from "../../../models/technology.model";
import {TechnologyService} from "../../../services/technology.service";
import {first} from "rxjs";
import {CourseService} from "../../../services/course.services";
import {UserService} from "../../../services/user.services";

@Component({
  selector: 'app-publication-create-edit',
  templateUrl: './publication-create-edit.component.html',
  styleUrls: ['./publication-create-edit.component.css']
})
export class PublicationCreateEditComponent implements OnInit {

  technologies: TechnologyModel[] = [];
  statusList: any = [
    { name: 'ACTIVO', value: true },
    { name: 'INACTIVO', value: false },
  ]
  types: string[] = ['CURSO', 'BOOTCAMP']
  mentors: any[] = []
  activeMentors: any[] = []


  public publicationForm: FormGroup = this.fb.group({
    name: new FormControl(this.data.publication.name, [Validators.required, Validators.minLength(4)]),
    type: new FormControl(this.data.publication.type, [Validators.required]),
    technologyId: new FormControl(this.data.publication.technology ? this.data.publication.technology._id : '', [Validators.required]),
    price: new FormControl(this.data.publication.price, [Validators.required]),
    link: new FormControl(this.data.publication.link, [Validators.required, Validators.minLength(4)]),
    active: new FormControl(this.data.publication.active, [Validators.required]),
    detail: new FormControl(this.data.publication.detail, [Validators.required, Validators.minLength(4)]),
    duration: new FormControl(this.data.publication.duration, [Validators.required, Validators.minLength(4)]),
    mentorId: new FormControl(this.data.publication.mentor._id, [Validators.required]),
    days: new FormControl(this.data.publication.days, [Validators.required]),
    hours: new FormControl(this.data.publication.hours, [Validators.required]),
    dateStart: new FormControl(this.fixDatePicker(), [Validators.required]),
    dateEnd: new FormControl(this.data.publication.dateEnd, [Validators.required]),
    image: new FormControl('assets/img/default-img.png'),

  })

  constructor(
    private courseService: CourseService,
    public dialogRef: MatDialogRef<PublicationsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private publicationsService: PublicationsService,
    private technologyService: TechnologyService,
    private userService: UserService,
  ) {
  }

  fixDatePicker() {
    const realDate = new Date( this.data.publication.dateStart );
    realDate.setMinutes( realDate.getMinutes() + realDate.getTimezoneOffset() )
    return realDate
  }

  ngOnInit() {
    this.technologyService.getAll()
      .pipe(
        first()
      ).subscribe(
      (response: any) => {
        this.technologies = response;
      },
      (error: any) => {
        errorCommunicationWithRetry(error)
      })

    this.userService.getAllMentors()
      .subscribe( ( response: any ) => {
        this.activeMentors = response.filter((mentor: any) => {
          if (mentor.active) {
            // TODO: evaluar field technology
            return mentor
          }
        });
      }, (error: any) => {
        errorCommunicationWithRetry(error)
      })
  }

  setFilterMentors(courseId: any) {

    this.courseService.getOneById(courseId)
      .subscribe( (course: any) => {
        this.mentors = this.activeMentors.filter( (mentor: any) => {
          for ( const tech of mentor.technologies ) {
            if ( tech.name === course.technology.name) {
              return mentor;
            }
          }
        })
      }, (error: any) => {
        errorCommunicationWithRetry(error)
      })
  }

  createEditPublication(){
    if ( this.data.isEdit ) {
      this.editPublication()
    } else {
      this.createPublication()
    }
  }

  editPublication() {

    const publication = {
      name: this.publicationForm.value.name,
      type: this.publicationForm.value.type,
      technologyId: this.publicationForm.value.technologyId,
    }

    this.publicationsService.update(this.data.publicationId, publication)
      .subscribe(
        () => {
          this.dialogRef.close();
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Publicacion actualizada',
            backdrop: 'rgba(103, 58, 183, 0.3)',
            heightAuto: false,
            showConfirmButton: false,
            timer: 1500
          })
        },
        ( error: any ) => {
          errorCommunicationWithRetry(error)
        }
      )
  }

  createPublication() {}

  closeDialog() {
    this.dialogRef.close()
  }

  addImage(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (evt) => {
      this.publicationForm.patchValue({
        image: reader.result
      })
    }
  }

}
