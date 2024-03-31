import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CodeModalVerifyEmailNuevoUsComponent } from './code-modal-verify-email-nuevo-us.component';

describe('CodeModalVerifyEmailNuevoUsComponent', () => {
  let component: CodeModalVerifyEmailNuevoUsComponent;
  let fixture: ComponentFixture<CodeModalVerifyEmailNuevoUsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeModalVerifyEmailNuevoUsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CodeModalVerifyEmailNuevoUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
