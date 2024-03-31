import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewAdministrativosSuPage } from './view-administrativos-su.page';

describe('ViewAdministrativosSuPage', () => {
  let component: ViewAdministrativosSuPage;
  let fixture: ComponentFixture<ViewAdministrativosSuPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewAdministrativosSuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
