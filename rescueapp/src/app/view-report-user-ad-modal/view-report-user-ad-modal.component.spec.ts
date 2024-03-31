import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ViewReportUserAdModalComponent } from './view-report-user-ad-modal.component';

describe('ViewReportUserAdModalComponent', () => {
  let component: ViewReportUserAdModalComponent;
  let fixture: ComponentFixture<ViewReportUserAdModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewReportUserAdModalComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ViewReportUserAdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
