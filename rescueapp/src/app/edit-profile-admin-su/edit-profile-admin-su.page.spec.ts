import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProfileAdminSuPage } from './edit-profile-admin-su.page';

describe('EditProfileAdminSuPage', () => {
  let component: EditProfileAdminSuPage;
  let fixture: ComponentFixture<EditProfileAdminSuPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditProfileAdminSuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
