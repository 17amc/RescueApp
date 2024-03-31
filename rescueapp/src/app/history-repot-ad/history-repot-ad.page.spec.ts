import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryRepotAdPage } from './history-repot-ad.page';

describe('HistoryRepotAdPage', () => {
  let component: HistoryRepotAdPage;
  let fixture: ComponentFixture<HistoryRepotAdPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HistoryRepotAdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
