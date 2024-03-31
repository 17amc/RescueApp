import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProfileUsPage } from './profile-us.page';

describe('ProfileUsPage', () => {
  let component: ProfileUsPage;
  let fixture: ComponentFixture<ProfileUsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ProfileUsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
