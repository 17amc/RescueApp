import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule} from '@angular/forms'; 

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CodeModalComponent } from './code-modal/code-modal.component';
import { ChangePasswordModalComponent } from './change-password-modal/change-password-modal.component';
import { CodeModalVerifyEmailComponent } from './code-modal-verify-email/code-modal-verify-email.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { UpdateDateUserComponent } from './update-date-user/update-date-user.component';
import { UpdateDataPersonalModalComponent } from './update-data-personal-modal/update-data-personal-modal.component';
import { UpdateDataContactModalComponent } from './update-data-contact-modal/update-data-contact-modal.component';
import { UpdateDataSenaModalComponent } from './update-data-sena-modal/update-data-sena-modal.component';
import { UpdateDataLoginModalComponent } from './update-data-login-modal/update-data-login-modal.component';
import { LoadingServidorModalComponent } from './loading-servidor-modal/loading-servidor-modal.component';
import { SuccesModalComponent } from './succes-modal/succes-modal.component';
import { ImageProfileModalComponent } from './image-profile-modal/image-profile-modal.component';
import { ReportUserModalComponent } from './report-user-modal/report-user-modal.component';
import { ViewReportUserAdModalComponent } from './view-report-user-ad-modal/view-report-user-ad-modal.component';
import { UserService } from './user.service';
import { AdminService } from './admin.service';
import { EditProfileAdminSuModalComponent } from './edit-profile-admin-su-modal/edit-profile-admin-su-modal.component';
import { CodeModalVerifyEmailNuevoUsComponent } from './code-modal-verify-email-nuevo-us/code-modal-verify-email-nuevo-us.component';
import { SuccesReporteUsComponent } from './succes-reporte-us/succes-reporte-us.component';


@NgModule({
  declarations: [
    AppComponent,
    CodeModalComponent, 
    ChangePasswordModalComponent, 
    CodeModalVerifyEmailComponent,
    UpdateDateUserComponent,
    UpdateDataPersonalModalComponent,
    UpdateDataContactModalComponent,
    UpdateDataSenaModalComponent,
    UpdateDataLoginModalComponent,
    LoadingServidorModalComponent,
    SuccesModalComponent,
    ImageProfileModalComponent,
    ReportUserModalComponent,
    ViewReportUserAdModalComponent,
    EditProfileAdminSuModalComponent,
    CodeModalVerifyEmailNuevoUsComponent,
    SuccesReporteUsComponent
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicStorageModule.forRoot(),
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    UserService, AdminService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
