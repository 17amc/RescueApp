import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroUsPage } from './registro-us.page';

describe('RegistroUsPage', () => {
  let component: RegistroUsPage;
  let fixture: ComponentFixture<RegistroUsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(RegistroUsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
