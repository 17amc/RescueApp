import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditProfileAdminSuModalComponent } from './edit-profile-admin-su-modal.component';

describe('EditProfileAdminSuModalComponent', () => {
  let component: EditProfileAdminSuModalComponent;
  let fixture: ComponentFixture<EditProfileAdminSuModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileAdminSuModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditProfileAdminSuModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
