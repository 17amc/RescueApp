import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditProfileSuPage } from './edit-profile-su.page';

describe('EditProfileSuPage', () => {
  let component: EditProfileSuPage;
  let fixture: ComponentFixture<EditProfileSuPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EditProfileSuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
