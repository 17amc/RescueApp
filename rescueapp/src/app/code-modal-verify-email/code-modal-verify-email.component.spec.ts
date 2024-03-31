import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CodeModalVerifyEmailComponent } from './code-modal-verify-email.component';

describe('CodeModalVerifyEmailComponent', () => {
  let component: CodeModalVerifyEmailComponent;
  let fixture: ComponentFixture<CodeModalVerifyEmailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeModalVerifyEmailComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CodeModalVerifyEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
