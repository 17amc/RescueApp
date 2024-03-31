import { TestBed } from '@angular/core/testing';

import { HistoryReportUsService } from './history-report-us.service';

describe('HistoryReportUsService', () => {
  let service: HistoryReportUsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoryReportUsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
