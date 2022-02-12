import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentCreateEditComponent } from './student-create-edit.component';

describe('StudentCreateEditComponent', () => {
  let component: StudentCreateEditComponent;
  let fixture: ComponentFixture<StudentCreateEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentCreateEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
