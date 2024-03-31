import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryReportUsPage } from './history-report-us.page';

describe('HistoryReportUsPage', () => {
  let component: HistoryReportUsPage;
  let fixture: ComponentFixture<HistoryReportUsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(HistoryReportUsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
