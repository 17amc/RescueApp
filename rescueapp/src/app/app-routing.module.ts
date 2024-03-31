import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'registro-us',
    loadChildren: () => import('./registro-us/registro-us.module').then( m => m.RegistroUsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home-admin',
    loadChildren: () => import('./home-admin/home-admin.module').then( m => m.HomeAdminPageModule)
  },
  {
    path: 'home-superadmin',
    loadChildren: () => import('./home-superadmin/home-superadmin.module').then( m => m.HomeSuperadminPageModule)
  },
  {
    path: 'change-pass',
    loadChildren: () => import('./change-pass/change-pass.module').then( m => m.ChangePassPageModule)
  },
  {
    path: 'loading',
    loadChildren: () => import('./loading/loading.module').then( m => m.LoadingPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'profile-us',
    loadChildren: () => import('./profile-us/profile-us.module').then( m => m.ProfileUsPageModule)
  },
  {
    path: 'data-user',
    loadChildren: () => import('./data-user/data-user.module').then( m => m.DataUserPageModule)
  },
  {
    path: 'history-repot-ad',
    loadChildren: () => import('./history-repot-ad/history-repot-ad.module').then( m => m.HistoryRepotAdPageModule)
  },
  {
    path: 'view-users',
    loadChildren: () => import('./view-users/view-users.module').then( m => m.ViewUsersPageModule)
  },
  {
    path: 'view-administrativos-su',
    loadChildren: () => import('./view-administrativos-su/view-administrativos-su.module').then( m => m.ViewAdministrativosSuPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile-su/edit-profile-su.module').then( m => m.EditProfileSuPageModule)
  },
  {
    path: 'edit-profile-su/:id',
    loadChildren: () => import('./edit-profile-su/edit-profile-su.module').then( m => m.EditProfileSuPageModule)
  },
  {
    path: 'edit-profile-admin-su',
    loadChildren: () => import('./edit-profile-admin-su/edit-profile-admin-su.module').then( m => m.EditProfileAdminSuPageModule)
  },
  {
    path: 'edit-profile-admin-su/:id',
    loadChildren: () => import('./edit-profile-admin-su/edit-profile-admin-su.module').then( m => m.EditProfileAdminSuPageModule)
  },
  {
    path: 'history-report-us',
    loadChildren: () => import('./history-report-us/history-report-us.module').then( m => m.HistoryReportUsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
